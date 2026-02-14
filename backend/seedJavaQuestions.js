const mongoose = require("mongoose");
require("dotenv").config();

const InterviewQuestion = require("./models/InterviewQuestion");

const MONGO_URI = process.env.MONGO_URI;

const questions = [
  // ================= EASY =================
  {
    questionText: "What is Java?",
    domain: "java",
    difficulty: "easy",
    expectedKeywords: [
      "object oriented",
      "platform independent",
      "jvm",
      "language",
    ],
    conceptTag: "java-basics",
  },
  {
    questionText: "Explain OOPS concepts in Java.",
    domain: "java",
    difficulty: "easy",
    expectedKeywords: [
      "encapsulation",
      "inheritance",
      "polymorphism",
      "abstraction",
    ],
    conceptTag: "oops",
  },
  {
    questionText: "What is JVM?",
    domain: "java",
    difficulty: "easy",
    expectedKeywords: ["virtual machine", "bytecode", "runtime", "execute"],
    conceptTag: "jvm",
  },
  {
    questionText: "Difference between JDK, JRE, and JVM?",
    domain: "java",
    difficulty: "easy",
    expectedKeywords: ["jdk", "jre", "jvm", "compiler"],
    conceptTag: "java-architecture",
  },
  {
    questionText: "What is method overloading and overriding?",
    domain: "java",
    difficulty: "easy",
    expectedKeywords: [
      "polymorphism",
      "same method",
      "different parameters",
      "runtime",
    ],
    conceptTag: "polymorphism",
  },

  // ================= MEDIUM =================
  {
    questionText: "Explain Exception Handling in Java.",
    domain: "java",
    difficulty: "medium",
    expectedKeywords: [
      "try",
      "catch",
      "finally",
      "throw",
      "checked",
      "unchecked",
    ],
    conceptTag: "exception-handling",
  },
  {
    questionText:
      "What is the difference between abstract class and interface?",
    domain: "java",
    difficulty: "medium",
    expectedKeywords: [
      "interface",
      "abstract",
      "implementation",
      "multiple inheritance",
    ],
    conceptTag: "abstraction",
  },
  {
    questionText: "Explain Collection Framework in Java.",
    domain: "java",
    difficulty: "medium",
    expectedKeywords: ["list", "set", "map", "arraylist", "hashmap"],
    conceptTag: "collections",
  },
  {
    questionText: "What is multithreading in Java?",
    domain: "java",
    difficulty: "medium",
    expectedKeywords: ["thread", "concurrency", "parallel", "synchronization"],
    conceptTag: "multithreading",
  },
  {
    questionText: "Explain the concept of garbage collection.",
    domain: "java",
    difficulty: "medium",
    expectedKeywords: ["memory", "heap", "jvm", "automatic"],
    conceptTag: "memory-management",
  },

  // ================= HARD =================
  {
    questionText: "Explain synchronization and its types.",
    domain: "java",
    difficulty: "hard",
    expectedKeywords: ["synchronized", "lock", "thread safety", "concurrency"],
    conceptTag: "synchronization",
  },
  {
    questionText:
      "What is the difference between HashMap and ConcurrentHashMap?",
    domain: "java",
    difficulty: "hard",
    expectedKeywords: [
      "thread safe",
      "synchronization",
      "performance",
      "concurrent",
    ],
    conceptTag: "collections-advanced",
  },
  {
    questionText: "Explain design patterns used in Java.",
    domain: "java",
    difficulty: "hard",
    expectedKeywords: ["singleton", "factory", "observer", "mvc"],
    conceptTag: "design-patterns",
  },
  {
    questionText: "What is Spring Framework?",
    domain: "java",
    difficulty: "hard",
    expectedKeywords: ["dependency injection", "ioc", "mvc", "framework"],
    conceptTag: "spring",
  },
  {
    questionText: "Explain how JDBC works.",
    domain: "java",
    difficulty: "hard",
    expectedKeywords: ["database", "connection", "driver", "query"],
    conceptTag: "jdbc",
  },
];

async function seedQuestions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await InterviewQuestion.deleteMany({ domain: "java" });
    console.log("Old Java questions removed");

    await InterviewQuestion.insertMany(questions);
    console.log("Java questions inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding Java questions:", error);
    process.exit(1);
  }
}

seedQuestions();
