const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobMatchRoutes = require("./routes/jobMatchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://career-coach-platform.vercel.app",
      "https://*.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobMatchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", aiRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode =
    err.statusCode || err.status || (err.name === "MulterError" ? 400 : 500);
  const message =
    statusCode >= 500 ? "Internal Server Error" : err.message || "Request failed";

  res.status(statusCode).json({ message });
});

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
