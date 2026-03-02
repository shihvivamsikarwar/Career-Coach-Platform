const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobMatchRoutes = require("./routes/jobMatchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const jobRoutes = require("./routes/jobMatchRoutes");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// DATABASE CONNECTION
// ===============================
connectDB();

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobMatchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", aiRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/job", jobRoutes);

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
