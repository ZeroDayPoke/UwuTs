// routes/userRoutes.js

import express from "express";
import userController from "../controllers/UserController.js";
import {
  asyncErrorHandler,
  requireRole,
  checkAuthorizationHeader,
  ensureAuthenticated,
  validateSession,
  fetchUserDetails,
  verifyToken,
} from "../middleware/index.js";

const router = express.Router();

// Public Routes
router.post("/signup", asyncErrorHandler(userController.signUp));
router.post("/login", asyncErrorHandler(userController.logIn));

// Middleware for subsequent routes
router.use(checkAuthorizationHeader);
router.use(verifyToken);
router.use(validateSession);
router.use(ensureAuthenticated);
// router.use(fetchUserDetails);

// User Routes
router.get("/verify", asyncErrorHandler(userController.verify));
router.post(
  "/request-reset-password",
  asyncErrorHandler(userController.requestResetPassword)
);
router.post(
  "/reset-password/:token",
  asyncErrorHandler(userController.resetPassword)
);
router.post(
  "/request-verification-email",
  asyncErrorHandler(userController.requestVerificationEmail)
);
router.post(
  "/verify-email/:token",
  asyncErrorHandler(userController.verifyEmail)
);
router.post("/logout", asyncErrorHandler(userController.logOut));
router.post("/checkSession", asyncErrorHandler(userController.checkSession));
router.post("/validateToken", asyncErrorHandler(userController.validateToken));
router.get("/account", asyncErrorHandler(userController.getAccount));

// Admin Routes
// router.use(requireRole("Admin"));
router.get("/all", asyncErrorHandler(userController.getAllUsers));

export default router;
