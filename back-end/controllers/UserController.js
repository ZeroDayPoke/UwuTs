// ./controllers/UserController.js

import { User } from "../models/index.js";
import TokenService from "../services/TokenService.js";
import UserService from "../services/UserService.js";
import { logger } from "../middleware/RequestLogger.js";

export const signUp = async (req, res) => {
  try {
    logger.info("Creating user...");
    const user = await UserService.createUser(req.body);
    const roles = user.Roles ? user.Roles.map((role) => role.name) : [];
    const accessToken = TokenService.generateAccessToken(user.id, user.email);

    res.json({
      message: "User created",
      token: accessToken,
      roles,
      userId: user.id,
      email: user.email,
    });
  } catch (err) {
    logger.error("Error creating user: " + err.toString());
    res.status(500).send("Server error");
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`Attempting to log in user with email: ${email}`);
    const { user, accessToken } = await UserService.authenticate({
      email,
      password,
    });
    logger.info(`User roles: ${JSON.stringify(user.Roles)}`);
    const roles = user.Roles ? user.Roles.map((role) => role.name) : [];
    const id = user.id;

    res.json({
      message: "User logged in",
      token: accessToken,
      roles,
      id,
      email: user.email,
    });
  } catch (err) {
    logger.error("Error logging in user: " + err.toString());
    res.status(500).json({ message: "Server error", error: err.toString() });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await UserService.verifyEmailToken(req.query.token);

    res.json({ message: "User verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.toString() });
  }
};

export const requestResetPassword = async (req, res, next) => {
  try {
    console.log(req.body.email);
    await UserService.requestPasswordReset(req.body.email);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    console.log(req.params.token, req.body.password);
    await UserService.resetPassword(req.params.token, req.body.password);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const requestVerificationEmail = async (req, res, next) => {
  try {
    await UserService.requestEmailVerification(req.body.email);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    await UserService.verifyEmail(req.params.token);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
