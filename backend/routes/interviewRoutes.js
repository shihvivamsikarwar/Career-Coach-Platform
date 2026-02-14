const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const InterviewQuestion = require("../models/InterviewQuestion");
const InterviewResult = require("../models/InterviewResult");
const InterviewSession = require("../models/InterviewSession");

// =============================
// GET QUESTIONS BY DOMAIN
// =============================
router.get("/questions/:domain", async (req, res) => {
  try {
    const { domain } = req.params;

    const questions = await InterviewQuestion.find({ domain });

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// =============================
// GET QUESTIONS BY DOMAIN + DIFFICULTY
// =============================
router.get("/questions/:domain/:difficulty", async (req, res) => {
  try {
    const { domain, difficulty } = req.params;

    const questions = await InterviewQuestion.find({
      domain,
      difficulty,
    }).limit(5);

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching difficulty questions:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// =============================
// SUBMIT INTERVIEW
// =============================
router.post("/submit", async (req, res) => {
  try {
    const { answers, domain, difficulty, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const questions = await InterviewQuestion.find({ domain, difficulty });

    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "No questions found" });
    }

    let totalScore = 0;
    let detailedFeedback = [];

    questions.forEach((question, index) => {
      const userAnswer = answers[index]?.toLowerCase() || "";
      const keywords = question.expectedKeywords;

      let matchCount = 0;

      keywords.forEach((keyword) => {
        if (userAnswer.includes(keyword.toLowerCase())) {
          matchCount++;
        }
      });

      const keywordWeight = 60;
      const structureWeight = 20;
      const clarityWeight = 20;

      const keywordScore = (matchCount / keywords.length) * keywordWeight;

      const structureScore =
        userAnswer.length > 120 ? 20 : userAnswer.length > 60 ? 10 : 5;

      const clarityScore =
        userAnswer.split(" ").length > 20
          ? 20
          : userAnswer.split(" ").length > 10
          ? 10
          : 5;

      const questionScore = keywordScore + structureScore + clarityScore;

      totalScore += questionScore;

      const missingKeywords = keywords.filter(
        (keyword) => !userAnswer.includes(keyword.toLowerCase())
      );

      detailedFeedback.push({
        question: question.questionText,
        score: Math.round(questionScore),
        missingConcepts: missingKeywords,
      });
    });

    const finalScore = Math.round(totalScore / questions.length);

    // Grade Logic
    let grade;
    let performanceMessage;

    if (finalScore >= 85) {
      grade = "A";
      performanceMessage = "Excellent performance. You are interview ready!";
    } else if (finalScore >= 70) {
      grade = "B";
      performanceMessage = "Good performance. Minor improvements needed.";
    } else if (finalScore >= 55) {
      grade = "C";
      performanceMessage = "Average performance. Improve conceptual clarity.";
    } else if (finalScore >= 40) {
      grade = "D";
      performanceMessage = "Below average. Practice more.";
    } else {
      grade = "F";
      performanceMessage = "Poor performance. Strong revision required.";
    }

    // Adaptive Difficulty
    let nextDifficulty;
    if (finalScore <= 50) nextDifficulty = "easy";
    else if (finalScore <= 75) nextDifficulty = "medium";
    else nextDifficulty = "hard";

    // =============================
    // 🔥 SAVE RESULT TO DATABASE
    // =============================
    await InterviewResult.create({
      userId: new mongoose.Types.ObjectId(userId),
      domain,
      difficulty,
      score: finalScore,
      grade,
      performanceMessage,
      feedback: detailedFeedback,
    });

    res.status(200).json({
      score: finalScore,
      grade,
      performanceMessage,
      feedback: detailedFeedback,
      domain,
      difficulty,
      nextDifficulty,
    });
  } catch (error) {
    console.error("Evaluation error:", error);
    res.status(500).json({ message: "Evaluation failed" });
  }
});

// =============================
// GET INTERVIEW HISTORY
// =============================
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await InterviewResult.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ date: -1 });

    res.status(200).json({ history });
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

// =============================
// WEAK AREA ANALYSIS
// =============================
router.get("/weak-areas/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await InterviewResult.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const conceptFrequency = {};

    history.forEach((attempt) => {
      attempt.feedback.forEach((item) => {
        item.missingConcepts.forEach((concept) => {
          conceptFrequency[concept] = (conceptFrequency[concept] || 0) + 1;
        });
      });
    });

    const sortedWeakAreas = Object.entries(conceptFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([concept, count]) => ({ concept, count }));

    res.status(200).json({
      weakAreas: sortedWeakAreas.slice(0, 5),
    });
  } catch (error) {
    console.error("Weak area error:", error);
    res.status(500).json({ message: "Failed to analyze weak areas" });
  }
});

// =============================
// ADAPTIVE START
// =============================
router.post("/adaptive-start", async (req, res) => {
  try {
    const { userId, domain } = req.body;

    if (!userId || !domain) {
      return res.status(400).json({ message: "Missing data" });
    }

    const previousResults = await InterviewResult.find({
      userId: new mongoose.Types.ObjectId(userId),
      domain,
    })
      .sort({ date: -1 })
      .limit(3);

    let difficulty = "easy";

    if (previousResults.length > 0) {
      const total = previousResults.reduce((sum, item) => sum + item.score, 0);

      const avgScore = total / previousResults.length;

      if (avgScore >= 85) difficulty = "hard";
      else if (avgScore >= 70) difficulty = "medium";
      else difficulty = "easy";
    }

    const questions = await InterviewQuestion.find({
      domain,
      difficulty,
    }).limit(5);

    res.status(200).json({
      difficulty,
      questions,
    });
  } catch (error) {
    console.error("Adaptive start error:", error);
    res.status(500).json({ message: "Adaptive interview failed" });
  }
});

// =============================
// START INTERVIEW SESSION
// =============================
router.post("/start-session", async (req, res) => {
  try {
    const { userId, domain, startingDifficulty } = req.body;

    if (!userId || !domain || !startingDifficulty) {
      return res.status(400).json({ message: "Missing data" });
    }

    const session = await InterviewSession.create({
      userId,
      domain,
      levels: [],
      status: "ongoing",
    });

    // Fetch 5 random questions
    const questions = await InterviewQuestion.aggregate([
      { $match: { domain, difficulty: startingDifficulty } },
      { $sample: { size: 5 } },
    ]);

    res.status(200).json({
      sessionId: session._id,
      difficulty: startingDifficulty,
      questions,
    });
  } catch (error) {
    console.error("Session start error:", error);
    res.status(500).json({ message: "Failed to start interview" });
  }
});

module.exports = router;
