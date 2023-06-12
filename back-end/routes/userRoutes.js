import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import session from "express-session";
import MySQLStoreModule from "connect-mysql-session";
const MySQLStore = MySQLStoreModule(session);

const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    connectionLimit: 1,
    endConnectionOnClose: true,
    charset: 'utf8mb4_bin',
});

const router = express.Router();

router.use(
  session({
    secret: "secret-key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

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
    return res.status(401).send("Not logged in");
  }

  res.send(`Welcome, ${req.session.user.name}`);
});

export default router;
