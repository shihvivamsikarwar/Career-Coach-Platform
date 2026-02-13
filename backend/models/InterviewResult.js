const mongoose = require("mongoose");

const interviewResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  performanceMessage: {
    type: String,
    required: true,
  },
  feedback: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InterviewResult", interviewResultSchema);
