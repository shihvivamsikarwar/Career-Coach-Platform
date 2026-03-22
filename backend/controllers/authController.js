const User = require("../models/User");
const { signAuthToken } = require("../utils/jwt");
const {
  hashPassword,
  isHashedPassword,
  verifyPassword,
} = require("../utils/password");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

// Simple in-memory rate limiting for demo (use Redis in production)
const rateLimitStore = new Map();

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const sanitizeInput = (input, maxLength = 100) => {
  return typeof input === 'string' ? input.trim().substring(0, maxLength) : '';
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

const checkRateLimit = (identifier, action = 'general') => {
  const key = `${action}:${identifier}`;
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now - record.resetTime > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false;
  }
  
  record.count++;
  return true;
};

exports.registerUser = async (req, res) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress;
  
  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP, 'register')) {
      return res.status(429).json({ 
        error: "Too many registration attempts. Please try again later." 
      });
    }

    // Input validation and sanitization
    const name = sanitizeInput(req.body?.name, MAX_NAME_LENGTH);
    const email = normalizeEmail(sanitizeInput(req.body?.email, MAX_EMAIL_LENGTH));
    const password = String(req.body?.password || "");

    // Required field validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
        fields: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 
        error: "Please enter a valid email address",
        field: 'email'
      });
    }

    // Password strength validation
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        field: 'password',
        minLength: MIN_PASSWORD_LENGTH
      });
    }

    // Name validation
    if (name.length < 2) {
      return res.status(400).json({
        error: "Name must be at least 2 characters long",
        field: 'name'
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email }).select('_id').lean();
    if (existingUser) {
      return res.status(409).json({ 
        error: "Email is already registered",
        field: 'email'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });

    // Generate token
    const token = signAuthToken(user._id.toString());

    // Log successful registration
    console.log(`User registered successfully: ${email} (${Date.now() - startTime}ms)`);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: sanitizeUser(user),
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
    
  } catch (error) {
    console.error('Registration error:', {
      error: error.message,
      stack: error.stack,
      email: req.body?.email,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    });

    // Handle specific database errors
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: "Email is already registered",
        field: 'email'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: "Validation failed",
        details: errors
      });
    }

    res.status(500).json({ 
      error: "Registration failed. Please try again later." 
    });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = req.user?._id || req.query.userId;

    if (!token) {
      return res.status(401).json({ 
        valid: false,
        error: 'No token provided'
      });
    }

    // Verify token and check user exists
    const { verifyAuthToken } = require("../utils/jwt");
    const decoded = verifyAuthToken(token);
    
    const user = await User.findById(decoded.userId).select('_id email isActive').lean();
    
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        valid: false,
        error: 'User not found or inactive'
      });
    }

    res.status(200).json({ 
      valid: true,
      user: {
        _id: user._id,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Token validation error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        valid: false,
        error: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        valid: false,
        error: 'Token expired'
      });
    }
    
    res.status(500).json({ 
      valid: false,
      error: 'Token validation failed'
    });
  }
};

exports.loginUser = async (req, res) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress;
  
  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP, 'login')) {
      return res.status(429).json({ 
        error: "Too many login attempts. Please try again later." 
      });
    }

    // Input validation and sanitization
    const email = normalizeEmail(sanitizeInput(req.body?.email, MAX_EMAIL_LENGTH));
    const password = String(req.body?.password || "");

    // Required field validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
        fields: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 
        error: "Please enter a valid email address",
        field: 'email'
      });
    }

    console.log("Login attempt:", { email, ip: clientIP });

    // Find user with minimal fields first
    const user = await User.findOne({ email }).select('_id name email password createdAt').lean();
    if (!user) {
      console.log("Login failed: User not found", { email, ip: clientIP });
      return res.status(400).json({ 
        error: "Invalid email or password",
        field: 'general'
      });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      console.log("Login failed: Invalid password", { email, ip: clientIP });
      return res.status(400).json({ 
        error: "Invalid email or password",
        field: 'general'
      });
    }

    // Check if password needs rehashing (for security upgrades)
    if (!isHashedPassword(user.password)) {
      console.log("Updating password hash for user:", email);
      await User.updateOne(
        { _id: user._id }, 
        { password: await hashPassword(password) }
      );
    }

    // Generate token
    const token = signAuthToken(user._id.toString());

    // Log successful login
    console.log(`User logged in successfully: ${email} (${Date.now() - startTime}ms)`);

    res.status(200).json({
      message: "Login successful",
      token,
      user: sanitizeUser(user),
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
    
  } catch (error) {
    console.error('Login error:', {
      error: error.message,
      stack: error.stack,
      email: req.body?.email,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    });

    // Handle specific database errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: "Validation failed",
        details: errors
      });
    }

    res.status(500).json({ 
      error: "Login failed. Please try again later." 
    });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = req.user?._id || req.query.userId;

    if (!token) {
      return res.status(401).json({ 
        valid: false,
        error: 'No token provided'
      });
    }

    // Verify token and check user exists
    const { verifyAuthToken } = require("../utils/jwt");
    const decoded = verifyAuthToken(token);
    
    const user = await User.findById(decoded.userId).select('_id email isActive').lean();
    
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        valid: false,
        error: 'User not found or inactive'
      });
    }

    res.status(200).json({ 
      valid: true,
      user: {
        _id: user._id,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Token validation error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        valid: false,
        error: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        valid: false,
        error: 'Token expired'
      });
    }
    
    res.status(500).json({ 
      valid: false,
      error: 'Token validation failed'
    });
  }
};
