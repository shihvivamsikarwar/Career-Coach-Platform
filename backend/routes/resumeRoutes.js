const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  uploadResume,
  getUserResumes,
  getResumeById,
  getLatestResume,
} = require("../controllers/resumeController");

router.post("/upload", upload.single("resume"), uploadResume);

router.get("/user/:userId", getUserResumes);

router.get("/latest/:userId", getLatestResume);

router.get("/:id", getResumeById);

module.exports = router;
