const mongoose = require("mongoose");
require("dotenv").config();

const InterviewQuestion = require("./models/InterviewQuestion");

const MONGO_URI = process.env.MONGO_URI;

const questions = [
  // ================= EASY =================
  {
    questionText: "What is Node.js?",
    domain: "backend",
    difficulty: "easy",
    expectedKeywords: ["javascript", "runtime", "server", "v8", "non-blocking"],
    conceptTag: "node-basics",
  },
  {
    questionText: "What is Express.js?",
    domain: "backend",
    difficulty: "easy",
    expectedKeywords: ["framework", "node", "routing", "middleware", "server"],
    conceptTag: "express-basics",
  },
  {
    questionText: "What is REST API?",
    domain: "backend",
    difficulty: "easy",
    expectedKeywords: ["http", "get", "post", "put", "delete"],
    conceptTag: "rest-api",
  },
  {
    questionText: "What is middleware in Express?",
    domain: "backend",
    difficulty: "easy",
    expectedKeywords: ["function", "request", "response", "next", "processing"],
    conceptTag: "middleware",
  },
  {
    questionText: "What is MongoDB?",
    domain: "backend",
    difficulty: "easy",
    expectedKeywords: ["database", "nosql", "document", "collection", "json"],
    conceptTag: "mongodb-basics",
  },

  // ================= MEDIUM =================
  {
    questionText: "Explain JWT authentication.",
    domain: "backend",
    difficulty: "medium",
    expectedKeywords: [
      "token",
      "authentication",
      "header",
      "payload",
      "signature",
    ],
    conceptTag: "jwt-auth",
  },
  {
    questionText: "What is event loop in Node.js?",
    domain: "backend",
    difficulty: "medium",
    expectedKeywords: ["call stack", "queue", "non-blocking", "async"],
    conceptTag: "event-loop",
  },
  {
    questionText: "Explain MVC architecture.",
    domain: "backend",
    difficulty: "medium",
    expectedKeywords: [
      "model",
      "view",
      "controller",
      "separation",
      "structure",
    ],
    conceptTag: "mvc",
  },
  {
    questionText: "What is database indexing?",
    domain: "backend",
    difficulty: "medium",
    expectedKeywords: ["performance", "query", "search", "optimize"],
    conceptTag: "database-optimization",
  },
  {
    questionText: "Difference between SQL and NoSQL?",
    domain: "backend",
    difficulty: "medium",
    expectedKeywords: ["relational", "schema", "document", "scalability"],
    conceptTag: "database-types",
  },

  // ================= HARD =================
  {
    questionText: "Explain microservices architecture.",
    domain: "backend",
    difficulty: "hard",
    expectedKeywords: [
      "services",
      "independent",
      "scalability",
      "api",
      "deployment",
    ],
    conceptTag: "microservices",
  },
  {
    questionText: "What is rate limiting?",
    domain: "backend",
    difficulty: "hard",
    expectedKeywords: ["security", "limit", "requests", "ddos"],
    conceptTag: "security",
  },
  {
    questionText: "Explain load balancing.",
    domain: "backend",
    difficulty: "hard",
    expectedKeywords: ["traffic", "server", "distribution", "scalability"],
    conceptTag: "scalability",
  },
  {
    questionText: "How does caching improve performance?",
    domain: "backend",
    difficulty: "hard",
    expectedKeywords: ["redis", "memory", "performance", "database"],
    conceptTag: "caching",
  },
  {
    questionText: "Explain CI/CD pipeline.",
    domain: "backend",
    difficulty: "hard",
    expectedKeywords: ["automation", "deployment", "testing", "integration"],
    conceptTag: "devops",
  },
];

async function seedQuestions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await InterviewQuestion.deleteMany({ domain: "backend" });
    console.log("Old backend questions removed");

    await InterviewQuestion.insertMany(questions);
    console.log("Backend questions inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  }
}

seedQuestions();
