"use strict";
// ./routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_ts_1 = __importDefault(require("../controllers/UserController.ts")); // Assuming UserController is converted to TypeScript
const middleware_1 = require("../middleware"); // Assuming middleware is converted to TypeScript
const router = express_1.default.Router();
// Public Routes
router.post("/signup", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.signUp));
router.post("/login", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.logIn));
// Middleware for subsequent routes
router.use(middleware_1.checkAuthorizationHeader);
router.use(middleware_1.verifyToken);
router.use(middleware_1.validateSession);
router.use(middleware_1.ensureAuthenticated);
// router.use(fetchUserDetails);
// User Routes
router.get("/verify", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.verify));
router.post("/request-reset-password", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.requestResetPassword));
router.post("/reset-password/:token", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.resetPassword));
router.post("/request-verification-email", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.requestVerificationEmail));
router.post("/verify-email/:token", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.verifyEmail));
router.post("/logout", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.logOut));
router.post("/checkSession", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.checkSession));
router.post("/validateToken", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.validateToken));
router.get("/account", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.getAccount));
// Admin Routes
// router.use(requireRole('Admin'));
router.get("/all", (0, middleware_1.asyncErrorHandler)(UserController_ts_1.default.getAllUsers));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map