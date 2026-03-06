const mongoose = require("mongoose");
const InterviewResult = require("../models/InterviewResult");
const callOpenRouter = require("../services/openRouterClient");

// ================= START INTERVIEW =================

exports.startInterview = async (req, res) => {
  try {
    const { domain } = req.body;

    const systemPrompt = `
You are a professional technical interviewer.

Generate 5 interview questions for ${domain}.

Return JSON:

{
 "questions":[
   {"questionText":""}
 ]
}
`;

    const aiData = await callOpenRouter(systemPrompt, "");

    res.json({
      success: true,
      questions: aiData.questions || [],
    });
  } catch (error) {
    console.error("Start Interview Error:", error);

    res.status(500).json({
      message: "Failed to start interview",
    });
  }
};

// ================= SUBMIT INTERVIEW =================

exports.submitInterview = async (req, res) => {
  try {
    const { answers, questions, domain, userId } = req.body;

    const systemPrompt = `
You are a professional interviewer.

Evaluate candidate answers.

Return JSON:

{
 "score": number,
 "grade": "",
 "strengths": [],
 "weakAreas": [],
 "finalFeedback": ""
}
`;

    const userPrompt = `
Domain: ${domain}

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
      finalFeedback: aiResult?.finalFeedback || "",
    };

    await InterviewResult.create({
      userId: new mongoose.Types.ObjectId(userId),
      domain,
      score: safeResult.score,
      grade: safeResult.grade,
      feedback: safeResult,
    });

    res.json({
      success: true,
      result: safeResult,
    });
  } catch (error) {
    console.error("Interview Submit Error:", error);

    res.status(500).json({
      message: "Submission failed",
    });
  }
};

// ================= USER LEVEL SYSTEM =================

exports.getUserLevel = async (userId, domain) => {
  const lastInterview = await InterviewResult.findOne({ userId, domain }).sort({
    createdAt: -1,
  });

  if (!lastInterview) {
    return {
      level: 1,
      difficulty: "easy",
      questionsCount: 5,
      weakAreas: [],
    };
  }

  let nextLevel = lastInterview.level || 1;

  if (lastInterview.score >= 75) {
    nextLevel += 1;
  }

  let difficulty = "easy";
  let questionsCount = 5;

  if (nextLevel >= 3) {
    difficulty = "medium";
    questionsCount = 7;
  }

  if (nextLevel >= 5) {
    difficulty = "hard";
    questionsCount = 10;
  }

  return {
    level: nextLevel,
    difficulty,
    questionsCount,
    weakAreas: lastInterview.weakAreas || [],
  };
};
