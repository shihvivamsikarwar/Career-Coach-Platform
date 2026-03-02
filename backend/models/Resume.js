const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: String,
    fileUrl: String,

    // ⭐ ROOT FIELDS (dashboard use)
    score: {
      type: Number,
      default: 0,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    skills: {
      type: [String],
      default: [],
    },

    // ⭐ FULL AI ANALYSIS
    analysis: {
      type: Object,
      default: {},
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);
