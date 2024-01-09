"use strict";
// ./app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const index_ts_1 = require("./models/index.ts");
const index_ts_2 = require("./middleware/index.ts");
const loadEnv_ts_1 = __importDefault(require("./utils/loadEnv.ts"));
const index_ts_3 = require("./routes/index.ts");
const app = (0, express_1.default)();
// Session configuration
const SessionStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
const sessionStore = new SessionStore({ db: index_ts_1.db });
app.use((0, express_session_1.default)({
    secret: loadEnv_ts_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1800000,
        httpOnly: true,
        secure: loadEnv_ts_1.default.NODE_ENV === "production",
    },
}));
// CORS configuration
const allowedOrigins = ["localhost:5173"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin ||
            allowedOrigins.some((allowedOrigin) => origin.includes(allowedOrigin))) {
            callback(null, true);
        }
        else {
            callback(new Error("The CORS policy for this site does not allow access from the specified Origin."));
        }
    },
    credentials: true,
}));
// Helmet for security headers
app.use((0, helmet_1.default)());
// Compression middleware
app.use((0, compression_1.default)());
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rate limiter configuration
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}));
// Request logger
app.use(index_ts_2.requestLogger);
// Routes
app.use("/users", index_ts_3.UserRoutes);
app.use("/homes", index_ts_3.HomeRoutes);
// Static file serving and other configurations can be similarly updated
// Error handler
app.use(index_ts_2.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map