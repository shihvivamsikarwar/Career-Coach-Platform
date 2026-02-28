const mongoose = require("mongoose");

const JobMatchSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    resumeId: mongoose.Schema.Types.ObjectId,

    jobDescription: String,

    matchScore: Number,
    selectionProbability: String,

    strengths: [String],
    missingKeywords: [String],
    improvementTips: [String],

    skillGap: [
      {
        skill: String,
        required: Number,
        yourLevel: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobMatch", JobMatchSchema);
