const express = require("express");
const router = express.Router();

const { getAIRecommendations } = require("../controllers/aiController");
const { getDashboardData } = require("../controllers/dashboardController");

router.get("/ai-recommendations/:userId", getAIRecommendations);
router.get("/:userId", getDashboardData);

module.exports = router;
