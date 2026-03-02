const mongoose = require("mongoose");
const InterviewResult = require("../models/InterviewResult");
const User = require("../models/User");

exports.getDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Get user
    const user = await User.findById(userObjectId);

    // Interview Results
    const results = await InterviewResult.find({
      userId: userObjectId,
    });

    const totalInterviews = results.length;

    let averageScore = 0;

    if (totalInterviews > 0) {
      const totalScore = results.reduce((sum, item) => sum + item.score, 0);

      averageScore = Math.round(totalScore / totalInterviews);
    }

    // Skill Level Logic
    let skillLevel = "Beginner";

    if (averageScore >= 80) skillLevel = "Advanced";
    else if (averageScore >= 60) skillLevel = "Intermediate";
    else skillLevel = "Beginner";

    res.status(200).json({
      user: {
        name: user?.name || "User",
      },
      stats: {
        totalInterviews,
        averageScore,
        skillLevel,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};
