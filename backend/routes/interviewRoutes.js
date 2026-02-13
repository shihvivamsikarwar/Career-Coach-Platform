const express = require("express");
const router = express.Router();
const InterviewQuestion = require("../models/InterviewQuestion");
const InterviewResult = require("../models/InterviewResult");

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
// SUBMIT INTERVIEW
// =============================
router.post("/submit", async (req, res) => {
  try {
    const { answers, domain, difficulty, userId } = req.body;

    if (!answers || !domain) {
      return res.status(400).json({
        message: "Answers or domain missing",
      });
    }

    const questions = await InterviewQuestion.find({ domain });

    if (!questions || questions.length === 0) {
      return res.status(400).json({
        message: "No questions found for this domain",
      });
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

      // 🔹 Keyword Score (70%)
      const keywordScore = (matchCount / keywords.length) * 70;

      // 🔹 Length Score (20%)
      const lengthScore =
        userAnswer.length > 100 ? 20 : userAnswer.length > 50 ? 10 : 0;

      // 🔹 Quality Score (10%)
      const qualityScore = userAnswer.split(" ").length > 15 ? 10 : 0;

      const questionScore = keywordScore + lengthScore + qualityScore;

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

    // 🔹 Final Score Calculation
    const finalScore =
      questions.length > 0 ? Math.round(totalScore / questions.length) : 0;

    // 🔹 Grade System
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

    // 🔹 Save result in DB
    await InterviewResult.create({
      userId: req.body.userId,
      domain,
      score: finalScore,
      difficulty,
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
    });
  } catch (error) {
    console.error("Evaluation error:", error);
    res.status(500).json({ message: "Evaluation failed" });
  }
});
// GET interview history by user
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await InterviewResult.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});
// GET weak areas
router.get("/weak-areas/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await InterviewResult.find({ userId });

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
      weakAreas: sortedWeakAreas.slice(0, 5), // top 5
    });
  } catch (error) {
    console.error("Weak area analysis error:", error);
    res.status(500).json({ message: "Failed to analyze weak areas" });
  }
});

// GET personalized recommendations
router.get("/recommendations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await InterviewResult.find({ userId });

    if (!results.length) {
      return res.status(200).json({ recommendations: [] });
    }

    // Count weak concepts
    const conceptCount = {};

    results.forEach((result) => {
      result.feedback.forEach((item) => {
        item.missingConcepts.forEach((concept) => {
          const key = concept.toLowerCase();
          conceptCount[key] = (conceptCount[key] || 0) + 1;
        });
      });
    });

    // Only consider concepts repeated 2+ times
    const weakConcepts = Object.entries(conceptCount)
      .filter(([_, count]) => count >= 2)
      .map(([concept]) => concept);

    // Detect domain (latest interview domain)
    const domain = results[results.length - 1].domain;

    // Domain-based resources
    const domainResources = {
      frontend: {
        "virtual dom": {
          title: "React Virtual DOM Guide",
          link: "https://react.dev/learn",
        },
        "state management": {
          title: "Redux Documentation",
          link: "https://redux.js.org",
        },
        components: {
          title: "React Components Guide",
          link: "https://react.dev/learn/your-first-component",
        },
      },

      backend: {
        authentication: {
          title: "JWT Authentication Guide",
          link: "https://jwt.io",
        },
        "rest api": {
          title: "Express REST API Docs",
          link: "https://expressjs.com",
        },
        mongodb: {
          title: "MongoDB Official Docs",
          link: "https://www.mongodb.com/docs/",
        },
      },
    };

    const recommendations = [];

    weakConcepts.forEach((concept) => {
      if (domainResources[domain] && domainResources[domain][concept]) {
        recommendations.push({
          concept,
          ...domainResources[domain][concept],
        });
      }
    });

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

router.post("/adaptive-start", async (req, res) => {
  try {
    const { userId, domain } = req.body;

    if (!userId || !domain) {
      return res.status(400).json({ message: "Missing data" });
    }

    // Get last 3 interview results of this domain
    const previousResults = await InterviewResult.find({
      userId,
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

    // Fetch questions based on decided difficulty
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

module.exports = router;
