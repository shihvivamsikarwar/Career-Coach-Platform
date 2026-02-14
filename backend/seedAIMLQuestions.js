const mongoose = require("mongoose");
require("dotenv").config();

const InterviewQuestion = require("./models/InterviewQuestion");

const MONGO_URI = process.env.MONGO_URI;

const questions = [
  // ================= EASY =================
  {
    questionText: "What is Artificial Intelligence?",
    domain: "ai-ml",
    difficulty: "easy",
    expectedKeywords: ["machines", "intelligence", "human", "decision making"],
    conceptTag: "ai-basics",
  },
  {
    questionText: "What is Machine Learning?",
    domain: "ai-ml",
    difficulty: "easy",
    expectedKeywords: ["data", "algorithm", "training", "prediction"],
    conceptTag: "ml-basics",
  },
  {
    questionText: "What are types of Machine Learning?",
    domain: "ai-ml",
    difficulty: "easy",
    expectedKeywords: ["supervised", "unsupervised", "reinforcement"],
    conceptTag: "ml-types",
  },
  {
    questionText: "What is supervised learning?",
    domain: "ai-ml",
    difficulty: "easy",
    expectedKeywords: ["labeled data", "classification", "regression"],
    conceptTag: "supervised",
  },
  {
    questionText: "What is overfitting?",
    domain: "ai-ml",
    difficulty: "easy",
    expectedKeywords: ["training data", "generalization", "model"],
    conceptTag: "model-evaluation",
  },

  // ================= MEDIUM =================
  {
    questionText: "Explain bias-variance tradeoff.",
    domain: "ai-ml",
    difficulty: "medium",
    expectedKeywords: ["bias", "variance", "overfitting", "underfitting"],
    conceptTag: "model-evaluation",
  },
  {
    questionText: "What is gradient descent?",
    domain: "ai-ml",
    difficulty: "medium",
    expectedKeywords: ["optimization", "loss function", "learning rate"],
    conceptTag: "optimization",
  },
  {
    questionText: "Explain confusion matrix.",
    domain: "ai-ml",
    difficulty: "medium",
    expectedKeywords: [
      "true positive",
      "false positive",
      "accuracy",
      "precision",
    ],
    conceptTag: "evaluation-metrics",
  },
  {
    questionText: "What is cross-validation?",
    domain: "ai-ml",
    difficulty: "medium",
    expectedKeywords: ["model validation", "k-fold", "training", "testing"],
    conceptTag: "model-validation",
  },
  {
    questionText: "Explain difference between classification and regression.",
    domain: "ai-ml",
    difficulty: "medium",
    expectedKeywords: ["output", "categorical", "continuous"],
    conceptTag: "ml-types",
  },

  // ================= HARD =================
  {
    questionText: "Explain neural networks.",
    domain: "ai-ml",
    difficulty: "hard",
    expectedKeywords: ["neurons", "layers", "weights", "activation function"],
    conceptTag: "deep-learning",
  },
  {
    questionText: "What is backpropagation?",
    domain: "ai-ml",
    difficulty: "hard",
    expectedKeywords: ["error", "gradient", "weights", "update"],
    conceptTag: "deep-learning",
  },
  {
    questionText: "Explain reinforcement learning.",
    domain: "ai-ml",
    difficulty: "hard",
    expectedKeywords: ["agent", "reward", "environment", "policy"],
    conceptTag: "reinforcement-learning",
  },
  {
    questionText: "What is Natural Language Processing?",
    domain: "ai-ml",
    difficulty: "hard",
    expectedKeywords: ["text", "language", "tokenization", "model"],
    conceptTag: "nlp",
  },
  {
    questionText: "Explain difference between CNN and RNN.",
    domain: "ai-ml",
    difficulty: "hard",
    expectedKeywords: ["convolution", "sequence", "image", "time series"],
    conceptTag: "deep-learning",
  },
];

async function seedQuestions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await InterviewQuestion.deleteMany({ domain: "ai-ml" });
    console.log("Old AI/ML questions removed");

    await InterviewQuestion.insertMany(questions);
    console.log("AI/ML questions inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding AI/ML questions:", error);
    process.exit(1);
  }
}

seedQuestions();
