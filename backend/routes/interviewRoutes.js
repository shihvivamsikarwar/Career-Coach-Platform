const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const callOpenRouter = require("../services/openRouterClient");
const InterviewResult = require("../models/InterviewResult");
const {
  buildRecommendations,
  buildWeakAreas,
} = require("../utils/interviewInsights");

// ================= START INTERVIEW =================

router.post("/start", async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        message: "Domain is required",
      });
    }

    const systemPrompt = `
You are a professional technical interviewer.

Generate the FIRST interview question.

Domain: ${domain}

Return JSON:

{
 "questionText":""
}
`;

    const aiData = await callOpenRouter(systemPrompt, "");

    res.json({
      questionText:
        aiData?.questionText || "Explain core concepts of this domain.",
    });
  } catch (error) {
    console.error("Start Interview Error:", error);

    res.status(500).json({
      message: "Failed to start interview",
    });
  }
});

// ================= NEXT QUESTION =================

router.post("/next-question", async (req, res) => {
  try {
    const { domain, previousQuestion, previousAnswer } = req.body;

    if (!domain || !previousQuestion || !previousAnswer) {
      return res.status(400).json({
        message: "Domain, previous question, and previous answer are required",
      });
    }

    const systemPrompt = `
You are a senior technical interviewer.

Generate the NEXT interview question based on the candidate's previous answer.

Domain: ${domain}

If the answer is strong → increase difficulty
If weak → ask concept question

Return JSON:

{
 "questionText": ""
}
`;

    const userPrompt = `
Previous Question:
${previousQuestion}

Candidate Answer:
${previousAnswer}
`;

    const aiData = await callOpenRouter(systemPrompt, userPrompt);

    res.json({
      questionText:
        aiData?.questionText || "Explain this concept in more detail.",
    });
  } catch (error) {
    console.error("Next Question Error:", error);

    res.status(500).json({
      message: "Failed to generate next question",
    });
  }
});

// ================= SUBMIT INTERVIEW =================

router.post("/submit", async (req, res) => {
  try {
    const {
      userId,
      domain,
      difficulty = "easy",
      questions = [],
      answers = [],
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId || "")) {
      return res.status(400).json({
        message: "Valid userId is required",
      });
    }

    if (!domain) {
      return res.status(400).json({
        message: "Domain is required",
      });
    }

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      return res.status(400).json({
        message: "Questions or answers missing",
      });
    }

    if (!questions.length || !answers.length || questions.length !== answers.length) {
      return res.status(400).json({
        message: "Questions and answers must be non-empty and aligned",
      });
    }

    const systemPrompt = `
You are a professional interviewer.

Evaluate the answers.

Return JSON:

{
 "score": number,
 "grade": "",
 "strengths": [],
 "weakAreas": [],
 "improvements": [],
 "finalFeedback": ""
}
`;

    const userPrompt = `
Questions:
${questions.join("\n")}

Answers:
${answers.join("\n")}
`;

    const aiResult = await callOpenRouter(systemPrompt, userPrompt);

    const safeResult = {
      score: aiResult?.score || 0,
      grade: aiResult?.grade || "N/A",
      strengths: aiResult?.strengths || [],
      weakAreas: aiResult?.weakAreas || [],
      improvements: aiResult?.improvements || [],
      finalFeedback: aiResult?.finalFeedback || "",
    };

    await InterviewResult.create({
      userId: new mongoose.Types.ObjectId(userId),
      domain,
      difficulty: ["easy", "medium", "hard"].includes(difficulty)
        ? difficulty
        : "easy",
      score: safeResult.score,
      grade: safeResult.grade,
      strengths: safeResult.strengths,
      weakAreas: safeResult.weakAreas,
      improvements: safeResult.improvements,
      questions,
      answers,
      feedback: safeResult,
    });

    res.json(safeResult);
  } catch (error) {
    console.error("Submit Error:", error);

    res.status(500).json({
      message: "Interview evaluation failed",
    });
  }
});

// ================= HISTORY =================

router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const history = await InterviewResult.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
});

router.get("/weak-areas/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const results = await InterviewResult.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).select("weakAreas");

    res.json({
      success: true,
      weakAreas: buildWeakAreas(results),
    });
  } catch (error) {
    console.error("Weak areas error:", error);

    res.status(500).json({
      message: "Failed to fetch weak areas",
    });
  }
});

router.get("/recommendations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const results = await InterviewResult.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).select("weakAreas");

    const weakAreas = buildWeakAreas(results);

    res.json({
      success: true,
      recommendations: buildRecommendations(weakAreas),
    });
  } catch (error) {
    console.error("Recommendations error:", error);

    res.status(500).json({
      message: "Failed to fetch recommendations",
    });
  }
});

module.exports = router;
