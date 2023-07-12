import express from "express";
import bcrypt from "bcrypt";
import { ErrorHandler } from '../utils/errorHandler.js';
import { checkAuth } from '../middleware/auth.js';
import { User } from "../models/User.js";
import { check, validationResult } from 'express-validator';
import { Op } from 'sequelize';


const router = express.Router();

// Signup route
router.post("/signup",
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('phone').isMobilePhone().withMessage('Phone number is not valid'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password, phone } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password: hashedPassword, phone });
      req.session.user = user;
      res.json({ message: "User created", isLoggedIn: true });
    } catch (err) {
      console.error(err);
      next(new ErrorHandler(500, "Server error"));
    }
  });

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if the user has verified their account
    // if (!user.isVerified) {
    //  return res.status(400).json({ error: "Please verify your account before logging in." });
    // }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Create a new ErrorHandler and pass it to the next middleware
      next(new ErrorHandler(400, "Invalid credentials"));
    }

    req.session.user = user;
    res.json({ message: "User logged in", isLoggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }

    res.json({ message: "User logged out", isLoggedIn: false });
  });
});

// Account route
router.get("/account", checkAuth, (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "No session" });
  }

  const { password, ...userWithoutPassword } = req.session.user;

  res.json(userWithoutPassword);
});

// Verify route
router.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ where: { verificationToken: token, verificationTokenExpiration: { [Op.gt]: Date.now() } } });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiration = null;
    await user.save();

    res.json({ message: "User verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Session status route
router.get("/session-status", (req, res) => {
  const isLoggedIn = req.session && req.session.user ? true : false;
  res.json({ isLoggedIn });
});

export default router;
