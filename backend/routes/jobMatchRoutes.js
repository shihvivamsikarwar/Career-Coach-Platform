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
router.get("/report/:id", async (req, res) => {
  try {
    const match = await JobMatch.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch report" });
  }
});

router.get("/:id", getJobMatchById);

module.exports = router;
