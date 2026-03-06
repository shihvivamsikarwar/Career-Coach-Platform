const mongoose = require("mongoose");
const Resume = require("../models/Resume");
const callOpenRouter = require("../services/openRouterClient");

// ===============================
// UPLOAD RESUME + AI ANALYSIS
// ===============================
exports.uploadResume = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    console.log("📄 File received:", req.file.path);

    let aiAnalysis = {};

    // 🔥 AI ANALYSIS (safe)
    try {
      const result = await analyzeResumeWithAI(req.file.path);
      aiAnalysis = result || {};
    } catch (err) {
      console.log("⚠️ AI failed but upload continues:", err.message);
    }

    // ===============================
    // SAVE TO DB
    // ===============================
    const newResume = new Resume({
      userId: new mongoose.Types.ObjectId(userId),

      fileName: req.file.originalname,
      fileUrl: req.file.path,

      // ROOT FIELDS (important for dashboard)
      score: aiAnalysis?.score ?? 0,
      atsScore: aiAnalysis?.atsScore ?? 0,
      skills: aiAnalysis?.skills ?? [],

      // FULL OBJECT
      analysis: aiAnalysis ?? {},

      status: aiAnalysis ? "completed" : "pending",
    });

    console.log("💾 Saving resume:", newResume);

    await newResume.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeId: newResume._id,
      resume: newResume,
    });
  } catch (error) {
    console.error("❌ Resume Upload Error:", error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};

// ===============================
// GET USER RESUMES
// ===============================
exports.getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const resumes = await Resume.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Fetch Resume Error:", error);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

// ===============================
// GET SINGLE RESUME
// ===============================
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Fetch Resume Error:", error);
    res.status(500).json({ message: "Failed to fetch resume" });
  }
};

// ===============================
// GET LATEST RESUME
// ===============================
exports.getLatestResume = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const resume = await Resume.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json(resume || null);
  } catch (error) {
    console.error("Get latest resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// DELETE RESUME
// ===============================
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findByIdAndDelete(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete Resume Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
