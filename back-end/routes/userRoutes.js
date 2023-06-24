import express from "express";
import bcrypt from "bcrypt";
import { User, Role, UserRole } from "../models/User.js";

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const user = await User.create({ name, email, password, phone });
    req.session.user = user;
    res.json({ message: "User created", isLoggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    req.session.user = user;
    res.json({ message: "User logged in", isLoggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    res.json({ message: "User logged out", isLoggedIn: false });
  });
});

// Account route
router.get("/account", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("No Session");
  }

  const { password, ...userWithoutPassword } = req.session.user;

  res.json(userWithoutPassword);
});

// Session status route
router.get("/session-status", (req, res) => {
  const isLoggedIn = req.session && req.session.user ? true : false;
  res.json({ isLoggedIn });
});

export default router;
