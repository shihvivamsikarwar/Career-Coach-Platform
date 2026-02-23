const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = req.file.path;

    // Fake analysis (we improve later)
    const skills = ["React", "Node", "MongoDB"];
    const score = 75;
    const suggestions = ["Add more projects", "Improve experience section"];

    const resume = new Resume({
      userId,
      fileUrl,
      skills,
      score,
      suggestions,
    });

    await resume.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};
