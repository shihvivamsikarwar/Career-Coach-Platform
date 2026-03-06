const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
      index: true,
    },

    topic: {
      type: String,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    expectedKeywords: {
      type: [String],
      default: [],
    },

    explanation: {
      type: String,
    },

    aiGenerated: {
      type: Boolean,
      default: true,
    },

    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);
