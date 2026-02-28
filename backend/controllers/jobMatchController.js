const Resume = require("../models/Resume");
const JobMatch = require("../models/JobMatch");

const fs = require("fs");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

const { analyzeJobMatch } = require("../services/aiJobMatchService");

// ======================================================
// MATCH JOB WITH LATEST RESUME
// ======================================================
exports.matchJob = async (req, res) => {
  try {
    const { userId, jobDescription } = req.body;

    if (!userId || !jobDescription) {
      return res.status(400).json({
        message: "Missing userId or jobDescription",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    // ===============================
    // GET LATEST RESUME
    // ===============================
    const latestResume = await Resume.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    if (!latestResume) {
      return res.status(404).json({
        message: "No resume found",
      });
    }

    console.log("Using Resume:", latestResume._id);

    // ===============================
    // READ FILE
    // ===============================
    if (!fs.existsSync(latestResume.fileUrl)) {
      return res.status(404).json({
        message: "Resume file not found on server",
      });
    }

    const fileBuffer = fs.readFileSync(latestResume.fileUrl);
    const pdfData = await pdfParse(fileBuffer);

    const resumeText = pdfData.text;

    console.log("Resume text length:", resumeText.length);

    // ===============================
    // AI ANALYSIS
    // ===============================
    const aiResult = await analyzeJobMatch(resumeText, jobDescription);

    // ===============================
    // SAVE HISTORY
    // ===============================
    await JobMatch.create({
      userId: new mongoose.Types.ObjectId(userId),
      resumeId: latestResume._id,
      jobDescription,
      matchScore: aiResult.matchScore,
      selectionProbability: aiResult.selectionProbability,
      strengths: aiResult.strengths,
      missingKeywords: aiResult.missingKeywords,
      improvementTips: aiResult.improvementTips,
      skillGap: aiResult.skillGap || [],
    });

    // ===============================
    // RESPONSE
    // ===============================
    res.status(200).json({
      resumeId: latestResume._id,
      result: aiResult,
    });
  } catch (error) {
    console.error("Job Match Error:", error);

    res.status(500).json({
      message: "Job match failed",
    });
  }
};

// ======================================================
// GET JOB MATCH HISTORY
// ======================================================
exports.getJobMatchHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const history = await JobMatch.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

// ======================================================
// JOB MATCH ANALYTICS
// ======================================================
exports.getJobMatchAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const matches = await JobMatch.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!matches.length) {
      return res.json({
        totalMatches: 0,
        avgScore: 0,
        matches: [],
      });
    }

    const avgScore =
      matches.reduce((sum, m) => sum + (m.matchScore || 0), 0) / matches.length;

    res.json({
      totalMatches: matches.length,
      avgScore: Math.round(avgScore),
      matches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analytics error" });
  }
};
