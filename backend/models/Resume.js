const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileUrl: String,
  extractedText: String,
  skills: [String],
  score: Number,
  suggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
