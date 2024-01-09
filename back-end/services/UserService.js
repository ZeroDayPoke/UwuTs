// ./services/UserService.js

import bcrypt from "bcrypt";
import {
  User,
  Role,
  UserRole,
} from "../models/index.js";
import { Op } from "sequelize";
import TokenService from "./TokenService.js";
import EmailService from "./EmailService.js";
import logger from "../middleware/logger.js";
import {
  NotFoundError,
  ServerError,
  ValidationError,
  AuthenticationError,
} from "../errors/index.js";

class UserService {
  async _findUserByEmailWithRoles(email) {
    return await User.findOne({
      where: { email },
      include: [{ model: Role, through: UserRole, as: "Roles" }],
    });
  }

  async _generateUserAccessToken(user) {
    const roles = user.Roles.map((role) => role.name);
    return await TokenService.generateAccessToken(user.id, roles);
  }

  async getUserById(id) {
    logger.info(`Fetching user by ID: ${id}`);
    return await User.findOne({
      where: { id },
      include: [{ model: Role, through: UserRole, as: "Roles" }],
    });
  }

  async createUser({ name, email, password, phone }) {
    logger.info(`Creating user with email: ${email}`);
    const user = await User.create({ name, email, password, phone });

    const verificationToken = TokenService.generateVerificationToken(user);
    user.verificationToken = verificationToken;
    user.verificationTokenExpiration = Date.now() + 3600000;

    await user.save();
    logger.info(`User created with email: ${email}`);

    return user;
  }

  async verifyEmailToken(token) {
    logger.info(`Verifying email with token: ${token}`);
    const user = await User.findOne({
      where: {
        verificationToken: token,
        verificationTokenExpiration: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      logger.error(`Invalid or expired token: ${token}`);
      throw new Error("Invalid or expired token");
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiration = null;
    await user.save();

    logger.info(`Email verified for user with ID: ${user.id}`);
    return user;
  }

  async getAllUsers() {
    logger.info(`Fetching all users`);
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
      include: [Role],
    });
    return users;
  }

  async requestPasswordReset(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("No user found with that email address.");
    }

    const resetToken = TokenService.generatePasswordResetToken(user);
    await EmailService.sendResetPasswordEmail(user.email, resetToken);
  }

  async resetPassword(token, newPassword) {
    const userId = TokenService.verifyResetToken(token).id;
    console.log(userId, newPassword);
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ValidationError("Invalid or expired reset token.");
    }

    user.password = newPassword;
    await user.save();
    console.log("New password saved for user ID:", userId);
  }

  async requestEmailVerification(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundError("No user found with that email address.");
    }

    const verificationToken = TokenService.generateEmailVerificationToken(user);
    await EmailService.sendVerificationEmail(user, verificationToken);
  }

  async authenticate({ email, password }) {
    logger.info(`Authenticating user with email: ${email}`);
    const user = await this._findUserByEmailWithRoles(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AuthenticationError("Incorrect password");
    }

    const accessToken = await TokenService.generateAccessToken(
      user.id,
      user.Roles.map((role) => role.name)
    );
    logger.info(`Generated access token for user with ID: ${user.id}`);
    return { user, accessToken };
  }

  async verifyEmail(token) {
    const userId = await TokenService.validateEmailVerificationToken(token);
    if (!userId) {
      throw new ValidationError("Invalid or expired verification token");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.isVerified = true;
    await user.save();
    logger.info(`Email verified for user with ID: ${user.id}`);
  }
}

export default new UserService();
