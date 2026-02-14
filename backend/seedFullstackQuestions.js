const mongoose = require("mongoose");
require("dotenv").config();

const InterviewQuestion = require("./models/InterviewQuestion");

const MONGO_URI = process.env.MONGO_URI;

const questions = [
  // ================= EASY =================
  {
    questionText: "What is a Full Stack Developer?",
    domain: "fullstack",
    difficulty: "easy",
    expectedKeywords: ["frontend", "backend", "database", "api"],
    conceptTag: "fullstack-basics",
  },
  {
    questionText: "How does frontend communicate with backend?",
    domain: "fullstack",
    difficulty: "easy",
    expectedKeywords: ["api", "http", "request", "response", "axios"],
    conceptTag: "client-server",
  },
  {
    questionText: "What is RESTful API?",
    domain: "fullstack",
    difficulty: "easy",
    expectedKeywords: ["http", "crud", "get", "post", "put", "delete"],
    conceptTag: "rest-api",
  },
  {
    questionText: "What is CORS?",
    domain: "fullstack",
    difficulty: "easy",
    expectedKeywords: ["cross origin", "browser", "security", "headers"],
    conceptTag: "security",
  },
  {
    questionText: "Explain CRUD operations.",
    domain: "fullstack",
    difficulty: "easy",
    expectedKeywords: ["create", "read", "update", "delete", "database"],
    conceptTag: "crud",
  },

  // ================= MEDIUM =================
  {
    questionText: "Explain authentication flow in a MERN application.",
    domain: "fullstack",
    difficulty: "medium",
    expectedKeywords: ["jwt", "login", "token", "authorization", "middleware"],
    conceptTag: "auth-flow",
  },
  {
    questionText: "How does state management work in full stack apps?",
    domain: "fullstack",
    difficulty: "medium",
    expectedKeywords: ["frontend", "backend", "api", "global state"],
    conceptTag: "state-management",
  },
  {
    questionText: "Explain how file upload works in MERN stack.",
    domain: "fullstack",
    difficulty: "medium",
    expectedKeywords: ["multer", "formdata", "backend", "storage"],
    conceptTag: "file-upload",
  },
  {
    questionText: "How do you deploy a MERN stack application?",
    domain: "fullstack",
    difficulty: "medium",
    expectedKeywords: ["frontend", "backend", "hosting", "server", "database"],
    conceptTag: "deployment",
  },
  {
    questionText: "How do you handle errors in full stack applications?",
    domain: "fullstack",
    difficulty: "medium",
    expectedKeywords: ["try catch", "middleware", "response", "status code"],
    conceptTag: "error-handling",
  },

  // ================= HARD =================
  {
    questionText: "Explain scalable architecture for a full stack application.",
    domain: "fullstack",
    difficulty: "hard",
    expectedKeywords: [
      "microservices",
      "load balancing",
      "database",
      "scalability",
    ],
    conceptTag: "architecture",
  },
  {
    questionText: "How would you design a real-time chat application?",
    domain: "fullstack",
    difficulty: "hard",
    expectedKeywords: ["socket", "websocket", "server", "real-time"],
    conceptTag: "real-time",
  },
  {
    questionText: "Explain role-based access control in full stack apps.",
    domain: "fullstack",
    difficulty: "hard",
    expectedKeywords: ["authorization", "jwt", "roles", "middleware"],
    conceptTag: "rbac",
  },
  {
    questionText: "How would you secure a full stack application?",
    domain: "fullstack",
    difficulty: "hard",
    expectedKeywords: ["authentication", "encryption", "cors", "rate limiting"],
    conceptTag: "security",
  },
  {
    questionText: "Explain database optimization techniques.",
    domain: "fullstack",
    difficulty: "hard",
    expectedKeywords: ["indexing", "query", "performance", "caching"],
    conceptTag: "database-optimization",
  },
];

async function seedQuestions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await InterviewQuestion.deleteMany({ domain: "fullstack" });
    console.log("Old fullstack questions removed");

    await InterviewQuestion.insertMany(questions);
    console.log("Fullstack questions inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  }
}

seedQuestions();
