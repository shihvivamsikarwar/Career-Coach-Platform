const express = require("express");
const router = express.Router();

const {
  matchJob,
  getJobMatchHistory,
  getJobMatchAnalytics,
  getJobMatchById,
} = require("../controllers/jobMatchController");

// MATCH JOB
router.post("/match", matchJob);

// HISTORY
router.get("/history/:userId", getJobMatchHistory);

// ANALYTICS
router.get("/analytics/:userId", getJobMatchAnalytics);

// GET SINGLE MATCH REPORT
router.get("/report/:id", getJobMatchById);

router.get("/:id", getJobMatchById);

module.exports = router;
