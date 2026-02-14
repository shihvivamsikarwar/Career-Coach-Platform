const mongoose = require("mongoose");
require("dotenv").config();

const InterviewQuestion = require("./models/InterviewQuestion");

const MONGO_URI = process.env.MONGO_URI;

const questions = [
  // EASY
  {
    questionText: "What is React?",
    domain: "frontend",
    difficulty: "easy",
    expectedKeywords: [
      "library",
      "javascript",
      "ui",
      "components",
      "virtual dom",
    ],
    conceptTag: "react-basics",
  },
  {
    questionText: "What is JSX?",
    domain: "frontend",
    difficulty: "easy",
    expectedKeywords: ["javascript", "syntax", "html", "react", "babel"],
    conceptTag: "jsx",
  },
  {
    questionText: "What are components in React?",
    domain: "frontend",
    difficulty: "easy",
    expectedKeywords: ["reusable", "ui", "function", "class", "props"],
    conceptTag: "components",
  },
  {
    questionText: "What is state in React?",
    domain: "frontend",
    difficulty: "easy",
    expectedKeywords: ["data", "component", "re-render", "useState", "update"],
    conceptTag: "state",
  },
  {
    questionText: "What is useEffect used for?",
    domain: "frontend",
    difficulty: "easy",
    expectedKeywords: [
      "side effects",
      "api",
      "lifecycle",
      "dependency",
      "render",
    ],
    conceptTag: "hooks-basics",
  },

  // MEDIUM
  {
    questionText: "Explain lifecycle methods in React.",
    domain: "frontend",
    difficulty: "medium",
    expectedKeywords: [
      "mounting",
      "updating",
      "unmounting",
      "componentDidMount",
      "render",
    ],
    conceptTag: "lifecycle",
  },
  {
    questionText: "What is Context API?",
    domain: "frontend",
    difficulty: "medium",
    expectedKeywords: ["global state", "provider", "consumer", "prop drilling"],
    conceptTag: "context-api",
  },
  {
    questionText: "Explain React Router.",
    domain: "frontend",
    difficulty: "medium",
    expectedKeywords: [
      "routing",
      "navigation",
      "browserrouter",
      "route",
      "link",
    ],
    conceptTag: "routing",
  },
  {
    questionText: "Explain controlled and uncontrolled components.",
    domain: "frontend",
    difficulty: "medium",
    expectedKeywords: ["form", "state", "input", "value", "ref"],
    conceptTag: "forms",
  },
  {
    questionText: "What is memoization in React?",
    domain: "frontend",
    difficulty: "medium",
    expectedKeywords: ["performance", "React.memo", "useMemo", "re-render"],
    conceptTag: "optimization",
  },

  // HARD
  {
    questionText: "Explain React Fiber architecture.",
    domain: "frontend",
    difficulty: "hard",
    expectedKeywords: [
      "reconciliation",
      "asynchronous",
      "priority",
      "rendering",
    ],
    conceptTag: "react-internals",
  },
  {
    questionText: "Explain Server-Side Rendering (SSR).",
    domain: "frontend",
    difficulty: "hard",
    expectedKeywords: ["nextjs", "seo", "performance", "server", "html"],
    conceptTag: "ssr",
  },
  {
    questionText: "Explain JavaScript closures.",
    domain: "frontend",
    difficulty: "hard",
    expectedKeywords: ["scope", "function", "lexical", "memory"],
    conceptTag: "javascript-advanced",
  },
  {
    questionText: "How does event loop work in JavaScript?",
    domain: "frontend",
    difficulty: "hard",
    expectedKeywords: ["call stack", "queue", "microtask", "callback"],
    conceptTag: "javascript-advanced",
  },
  {
    questionText: "What is Tree Shaking?",
    domain: "frontend",
    difficulty: "hard",
    expectedKeywords: ["dead code", "bundle", "webpack", "optimization"],
    conceptTag: "build-tools",
  },
];

async function seedQuestions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await InterviewQuestion.deleteMany({ domain: "frontend" });
    console.log("Old frontend questions removed");

    await InterviewQuestion.insertMany(questions);
    console.log("Frontend questions inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  }
}

seedQuestions();
