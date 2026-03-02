const mongoose = require("mongoose");
const InterviewResult = require("../models/InterviewResult");
const Resume = require("../models/Resume");

const { generateCareerRecommendations } = require("../services/aiService");

exports.getAIRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const interviews = await InterviewResult.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const resume = await Resume.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    const dataForAI = {
      interviewScores: interviews.map((i) => i.score),
      domains: interviews.map((i) => i.domain),
      resumeAnalysis: resume?.analysis || {},
    };

    const aiResult = await generateCareerRecommendations(dataForAI);

    res.json(aiResult);
  } catch (error) {
    console.error("AI recommendation error:", error);
    res.status(500).json({ message: "AI recommendation failed" });
  }
};
