// ./routes/userRoutes.js

import express from "express";
import * as userController from '../controllers/UserController.js';

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/checkSession", userController.checkSession);
router.post("/logout", userController.logOut);
router.get("/verify", userController.verify);
router.get("/all", userController.getAllUsers);
router.post("/request-reset-password", userController.requestResetPassword);
router.post("/reset-password/:token", userController.resetPassword);
router.post("/request-verification-email", userController.requestVerificationEmail);
router.post("/verify-email/:token", userController.verifyEmail);
router.get("/account", userController.getAccountDetails);

export default router;
