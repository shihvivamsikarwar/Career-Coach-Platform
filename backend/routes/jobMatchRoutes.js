const express = require("express");
const router = express.Router();

const {
  matchJob,
  getJobMatchHistory,
  getJobMatchAnalytics,
} = require("../controllers/jobMatchController");

// ===============================
// MATCH JOB WITH RESUME
// ===============================
router.post("/match", matchJob);

// ===============================
// MATCH HISTORY
// ===============================
router.get("/history/:userId", getJobMatchHistory);

// ===============================
// ANALYTICS
// ===============================
router.get("/analytics/:userId", getJobMatchAnalytics);

module.exports = router;
