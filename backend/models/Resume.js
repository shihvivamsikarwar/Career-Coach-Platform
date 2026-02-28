const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },

    fileName: String,
    fileUrl: String,

    score: Number,
    atsScore: Number,
    skills: [String],

    analysis: Object,

    status: String,
  },
  { timestamps: true }
);
