const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  grade: {
    type: String,
  },
});

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  levels: [levelSchema],

  totalScore: {
    type: Number,
    default: 0,
  },

  finalGrade: {
    type: String,
  },

  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);
