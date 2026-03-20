const User = require("../models/User");
const { signAuthToken } = require("../utils/jwt");
const {
  hashPassword,
  isHashedPassword,
  verifyPassword,
} = require("../utils/password");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

exports.registerUser = async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = normalizeEmail(String(req.body?.email || ""));
    const password = String(req.body?.password || "");

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });

    res.status(201).json({
      message: "User registered successfully",
      token: signAuthToken(user._id.toString()),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Register user error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log("Login request received:", {
      email: req.body?.email,
      hasPassword: !!req.body?.password
    });

    const email = normalizeEmail(String(req.body?.email || ""));
    const password = String(req.body?.password || "");

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Looking for user:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User found, verifying password");
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({ message: "Invalid password" });
    }

    if (!isHashedPassword(user.password)) {
      console.log("Updating password hash for user:", email);
      user.password = await hashPassword(password);
      await user.save();
    }

    console.log("Login successful for user:", email);
    res.status(200).json({
      message: "Login successful",
      token: signAuthToken(user._id.toString()),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login user error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
