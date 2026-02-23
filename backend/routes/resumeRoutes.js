const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const mongoose = require("mongoose");

// ==========================
// GET USER RESUMES
// ==========================
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      resumes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
});

// ==========================
// DELETE RESUME
// ==========================
router.delete("/:resumeId", async (req, res) => {
  try {
    const { resumeId } = req.params;

    await Resume.findByIdAndDelete(resumeId);

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});
router.get("/analysis/:resumeId", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
      score: resume.score,
      skills: resume.skills || [],
      missingSkills: resume.missingSkills || [],
      suggestions: resume.suggestions || [],
      recommendedRoles: resume.recommendedRoles || [],
      fileName: resume.fileName,
      createdAt: resume.createdAt,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ message: "Analysis failed" });
  }
});
module.exports = router;
