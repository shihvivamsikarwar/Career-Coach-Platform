const mongoose = require("mongoose");

const interviewQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  expectedKeywords: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  conceptTag: {
    type: String,
  },
});

module.exports = mongoose.model("InterviewQuestion", interviewQuestionSchema);
