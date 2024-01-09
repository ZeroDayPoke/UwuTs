// ./services/UserService.ts

import bcrypt from "bcrypt";
import { User, Role } from "../models/index";
import TokenService from "./TokenService";
import EmailService from "./EmailService";
import logger from "../middleware/logger";
import UserRepository from "../repositories/UserRepository";
import {
  NotFoundError,
  ServerError,
  ValidationError,
  AuthenticationError,
} from "../errors";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface AuthenticateParams {
  email: string;
  password: string;
}

class UserService {
  async createUser(params: CreateUserParams): Promise<User> {
    logger.info(`Creating user with email: ${params.email}`);
    const hashedPassword = await bcrypt.hash(params.password, 10);
    const user = await UserRepository.createUser({
      ...params,
      password: hashedPassword,
    });

    const verificationToken = TokenService.generateEmailVerificationToken(
      user.id
    );

    logger.info(`User created with email: ${params.email}`);

    return user;
  }

  async getUserById(userId: number): Promise<User | null> {
    logger.info(`Fetching user by ID: ${userId}`);
    return await UserRepository.findById(userId);
  }

  async getAllUsers(): Promise<User[]> {
    logger.info("Fetching all users");
    return await User.findAll({
      attributes: ["id", "name", "email"],
      include: [Role],
    });
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new ValidationError("No user found with that email address.");
    }

    const resetToken = await TokenService.generatePasswordResetToken(user.id);
    await EmailService.sendResetPasswordEmail(user.email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const userId = await TokenService.validatePasswordResetToken(token);
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ValidationError("Invalid or expired reset token.");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }

  async requestEmailVerification(email: string): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("No user found with that email address.");
    }

    const verificationToken = await TokenService.generateEmailVerificationToken(
      user.id
    );
    await EmailService.sendVerificationEmail(user.email, verificationToken);
  }

  async verifyEmail(token: string): Promise<User> {
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
    return user;
  }

  async verifyEmailToken(token: string): Promise<User> {
    logger.info(`Verifying email with token: ${token}`);
    const user = await UserRepository.findByToken(token, "emailVerification");

    if (!user) {
      logger.error(`Invalid or expired token: ${token}`);
      throw new ValidationError("Invalid or expired token");
    }

    user.isVerified = true;
    await UserRepository.updateUserById(user.id, user);

    logger.info(`Email verified for user with ID: ${user.id}`);
    return user;
  }

  async authenticate(
    params: AuthenticateParams
  ): Promise<{ user: User; accessToken: string }> {
    logger.info(`Authenticating user with email: ${params.email}`);
    const user = await this._findUserByEmailWithRoles(params.email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatch = await bcrypt.compare(params.password, user.password);
    if (!isMatch) {
      throw new AuthenticationError("Incorrect password");
    }

    const accessToken = await this._generateUserAccessToken(user);
    logger.info(`Generated access token for user with ID: ${user.id}`);
    return { user, accessToken };
  }

  async _findUserByEmailWithRoles(email: string): Promise<User | null> {
    logger.info(`Fetching user by email: ${email}`);
    return await UserRepository.findByEmail(email);
  }

  async _generateUserAccessToken(user: User): Promise<string> {
    const roles = user.roles.map((role) => role.name);
    return TokenService.generateAccessToken(user.id, roles);
  }
}

export default new UserService();
