const express = require("express");
const router = express.Router();

const { getAIRecommendations } = require("../controllers/aiController");

router.get("/ai-recommendations/:userId", getAIRecommendations);

module.exports = router;
