import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.send("Home page");
});

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    req.session.user = user;
    res.send("User created");
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
    res.send("User logged in");
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

    res.send("User logged out");
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

export default router;
