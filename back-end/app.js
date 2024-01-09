// app.js

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
// import methodOverride from "method-override";
import session from "express-session";
import ConnectSessionSequelize from "connect-session-sequelize";
import { db } from "./models/index.js";
import { errorHandler, requestLogger } from "./middleware/index.js";
import ENV from "./utils/loadEnv.js";
import { UserRoutes, HomeRoutes } from "./routes/index.js";


const app = express();

// Session configuration
const SessionStore = ConnectSessionSequelize(session.Store);
const sessionStore = new SessionStore({ db: db });
app.use(session({
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1800000,
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
  },
}));

// CORS configuration
const allowedOrigins = ["localhost:5173"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(allowedOrigin => origin.includes(allowedOrigin))) {
      callback(null, true);
    } else {
      callback(new Error("The CORS policy for this site does not allow access from the specified Origin."));
    }
  },
  credentials: true,
}));

// Helmet for security headers
app.use(helmet());

// Compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter configuration
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));

// Method override for supporting PUT/DELETE in clients where it's not available
// app.use(methodOverride());

// Request logger
app.use(requestLogger);

// Routes
app.use("/users", UserRoutes);
app.use("/homes", HomeRoutes);

// Static file serving
// app.use("/public", express.static("./public"));


// Image upload endpoint
// app.post("/upload", upload, (req, res) => {
//   if (req.file) {
//     res.json({ imageUrl: `/public/images/${req.file.filename}` });
//   } else {
//     res.status(400).json({ error: "Image upload failed" });
//   }
// });

// Error handler
app.use(errorHandler);

export default app;
