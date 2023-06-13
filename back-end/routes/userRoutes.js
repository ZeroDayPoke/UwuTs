import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import session from "express-session";
import Sequelize from "sequelize";
import ConnectSessionSequelize from "connect-session-sequelize";

const SessionStore = ConnectSessionSequelize(session.Store);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  }
);

const sessionStore = new SessionStore({ db: sequelize });

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
  console.log(req.body);

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

  const { password, ...userWithoutPassword } = req.session.user;

  res.json(userWithoutPassword);
});

export default router;
