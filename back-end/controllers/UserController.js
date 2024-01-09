// ./controllers/UserController.js

import UserService from "../services/UserService.js";
import TokenService from "../services/TokenService.js";
import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import logger from "../middleware/logger.js";
import {
  validateUser,
  validateUpdateUser,
} from "../validation/userValidation.js";

const UserController = {
  signUp: asyncErrorHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    try {
      const user = await UserService.createUser(req.body);
      const accessToken = await TokenService.generateAccessToken(
        user.id,
        user.roles
      );

      storeEssentialUserDataInSession(req, { id: user.id, roles: user.roles });
      res.status(201).json({
        message: "User created",
        userId: user.id,
        email: user.email,
        token: accessToken,
        success: true,
      });
    } catch (err) {
      throw new ServerError("Error creating user");
    }
  }),

  logIn: asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    logger.info(`Attempting to log in user with email: ${email}`);

    try {
      const { user, accessToken } = await UserService.authenticate({
        email,
        password,
      });
      storeEssentialUserDataInSession(req, { id: user.id, roles: user.roles });

      res.status(200).json({
        token: accessToken,
      });
    } catch (err) {
      throw new ServerError("Error logging in user");
    }
  }),

  logOut: asyncErrorHandler(async (req, res) => {
    logger.info(`Logging out user ${req.session.userId}`);
    req.session.destroy((err) => {
      if (err) {
        logger.error(`Error logging out user: ${err}`);
        return res
          .status(500)
          .json({ message: "Could not log out. Try again." });
      }
      res.clearCookie("sessionId");
      res.status(200).json(true);
    });
  }),

  verify: asyncErrorHandler(async (req, res) => {
    try {
      const user = await UserService.verifyEmailToken(req.query.token);
      res.status(200).json({ message: "User verified" });
    } catch (err) {
      throw new ServerError("Failed to verify email");
    }
  }),

  getAllUsers: asyncErrorHandler(async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      logger.info(`Found ${users.length} users`);
      res.status(200).json(users);
    } catch (err) {
      throw new ServerError("Failed to get all users");
    }
  }),

  requestResetPassword: asyncErrorHandler(async (req, res, next) => {
    try {
      await UserService.requestPasswordReset(req.body.email);
      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      next(error);
    }
  }),

  resetPassword: asyncErrorHandler(async (req, res) => {
    try {
      await UserService.resetPassword(req.params.token, req.body.password);
      res.status(200).json({ message: "Password reset" });
    } catch (error) {
      next(error);
    }
  }),

  requestVerificationEmail: asyncErrorHandler(async (req, res, next) => {
    try {
      await UserService.requestEmailVerification(req.body.email);
      res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      next(error);
    }
  }),

  verifyEmail: asyncErrorHandler(async (req, res, next) => {
    try {
      await UserService.verifyEmail(req.params.token);
      res.status(200).json({ message: "Email verified" });
    } catch (error) {
      next(error);
    }
  }),

  checkSession: asyncErrorHandler(async (req, res) => {
    if (!req.session.userId) {
      throw new AuthenticationError("Session invalid or expired");
    }

    try {
      const userAccount = await UserService.getUserById(req.session.userId);
      res.status(200).json({
        valid: true,
        message: "User logged in",
        userAccount: {
          id: userAccount.id,
          email: userAccount.email,
          roles: userAccount.Roles.map((role) => role.name),
        },
        success: true,
      });
    } catch (err) {
      throw new ServerError("Failed to check session");
    }
  }),
};

export default UserController;
