const express = require("express");
const upload = require("../middleware/upload");
const { uploadResume } = require("../controllers/resumeController");

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;
