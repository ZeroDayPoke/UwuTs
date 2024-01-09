// services/TokenService.js
import jwt from "jsonwebtoken";
import crypto from "crypto";
import ENV from "../utils/loadEnv.js";
import logger from "../middleware/logger.js";
import Token from "../models/Token.js";
import { ServerError, ValidationError } from "../errors/index.js";

const JWT_SECRET = ENV.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = ENV.ACCESS_TOKEN_EXPIRY || "1h";
const EMAIL_VERIFICATION_TOKEN_EXPIRY =
  ENV.EMAIL_VERIFICATION_TOKEN_EXPIRY || "24h"; // Set in ENV
const PASSWORD_RESET_TOKEN_EXPIRY = ENV.PASSWORD_RESET_TOKEN_EXPIRY || "1h"; // Set in ENV

export default class TokenService {
  // Helper function to sign a JWT
  static _signJwt(payload, expiresIn) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  // Helper function to verify a JWT
  static _verifyJwt(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          logger.error(`JWT verification error: ${err.message}`);
          return reject(err);
        }
        resolve(decoded);
      });
    });
  }

  // Refresh Token (now private)
  static async _refreshToken(token) {
    try {
      const payload = await this._verifyJwt(token);
      return this.generateAccessToken(payload.id, payload.roles);
    } catch (e) {
      throw new ServerError("Failed to refresh token");
    }
  }

  // Validate Token (for Email Verification and Password Reset) (now private)
  static async _validateToken(token, type) {
    const foundToken = await Token.findOne({
      where: { token, type, expiration: { $gt: new Date() } },
    });
    if (!foundToken) {
      throw new ValidationError("Invalid or expired token");
    }
    return foundToken.userId;
  }

  // Public method to interface with private _validateToken
  static async validateEmailVerificationToken(token) {
    return this._validateToken(token, "email-verification");
  }

  static async validatePasswordResetToken(token) {
    return this._validateToken(token, "password-reset");
  }

  // Generate Access Token and store in database
  static async generateAccessToken(userId, roles = []) {
    const payload = { id: userId, roles };
    const token = this._signJwt(payload, ACCESS_TOKEN_EXPIRY);
    await Token.create({
      userId,
      token,
      type: "access",
      expiration: new Date(Date.now() + ms(ACCESS_TOKEN_EXPIRY)),
    });
    return token;
  }

  // Generate Email Verification Token
  static async generateEmailVerificationToken(userId) {
    const token = crypto.randomBytes(20).toString("hex");
    await Token.create({
      userId,
      token,
      type: "email-verification",
      expiration: new Date(Date.now() + ms(EMAIL_VERIFICATION_TOKEN_EXPIRY)),
    });
    return token;
  }

  // Generate Password Reset Token
  static async generatePasswordResetToken(userId) {
    const token = crypto.randomBytes(20).toString("hex");
    await Token.create({
      userId,
      token,
      type: "password-reset",
      expiration: new Date(Date.now() + ms(PASSWORD_RESET_TOKEN_EXPIRY)),
    });
    return token;
  }
}
