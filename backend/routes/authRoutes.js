const express = require("express");
const router = express.Router();
const { registerUser, loginUser, validateToken } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate", validateToken);

module.exports = router;
