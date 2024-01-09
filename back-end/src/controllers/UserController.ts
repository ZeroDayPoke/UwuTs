// ./controllers/UserController.ts

import UserService from "../services/UserService";
import TokenService from "../services/TokenService";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import logger from "../middleware/logger";
import { storeEssentialUserDataInSession } from "../utils/sessionUtils";
import { ServerError, ValidationError, AuthenticationError } from "../errors";
import { Request, Response, NextFunction } from "express";
import { validateUser } from "../validation/userValidation";

interface UserResponse {
  message: string;
  userId: string;
  token: string;
}

const UserController = {
  signUp: asyncErrorHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { error } = validateUser(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      try {
        const user = await UserService.createUser(req.body);
        const accessToken = await TokenService.generateAccessToken(
          user.id,
          user.roles.map((role) => role.name)
        );

        storeEssentialUserDataInSession(req, {
          userId: user.id,
          roles: user.roles.map((role) => role.name),
        });

        res.status(201).json({
          message: "User created",
          userId: user.id,
          token: accessToken,
        });
      } catch (err) {
        logger.error(`Error creating user: ${err.message}`);
        throw new ServerError("Error creating user");
      }
      return;
    }
  ),

  logIn: asyncErrorHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { email, password } = req.body;
      logger.info(`Attempting to log in user with email: ${email}`);

      try {
        const { user, accessToken } = await UserService.authenticate({
          email,
          password,
        });
        storeEssentialUserDataInSession(req, {
          userId: user.id,
          roles: user.roles.map((role) => role.name),
        });

        res.status(200).json({
          message: "Login successful",
          token: accessToken,
          userId: user.id,
        });
      } catch (err) {
        logger.error(`Error logging in user: ${err.message}`);
        throw new AuthenticationError("Invalid email or password");
      }
      return;
    }
  ),

  logOut: asyncErrorHandler(
    async (req: Request, res: Response): Promise<void> => {
      logger.info(`Logging out user from ${req.session}`);
      req.session.destroy((err) => {
        if (err) {
          logger.error(`Error logging out user: ${err.message}`);
          throw new ServerError("Error logging out user");
        } else {
          res.clearCookie("sessionId");
          res.status(200).json({ message: "Logout successful", success: true });
        }
      });
    }
  ),

  verify: asyncErrorHandler(
    async (req: Request, res: Response): Promise<void> => {
      try {
        await UserService.verifyEmailToken(req.query.token as string);
        res.status(200).json({ message: "User verified" });
      } catch (err) {
        logger.error(`Failed to verify email: ${err.message}`);
        throw new ServerError("Failed to verify email");
      }
    }
  ),

  getAllUsers: asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      try {
        const users = await UserService.getAllUsers();
        logger.info(`Found ${users.length} users`);
        res.status(200).json(users);
      } catch (err) {
        throw new ServerError("Failed to get all users");
      }
    }
  ),

  requestResetPassword: asyncErrorHandler(
    async (req: Request, res: Response): Promise<void> => {
      try {
        await UserService.requestPasswordReset(req.body.email);
        res.status(200).json({ message: "Password reset email sent" });
      } catch (err) {
        throw new ServerError("Failed to request password reset");
      }
    }
  ),
};

export default UserController;
