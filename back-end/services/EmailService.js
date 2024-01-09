// ./services/EmailService.js

import nodemailer from "nodemailer";
import ENV from "../utils/loadEnv.js";
import logger from "../middleware/logger.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USERNAME,
    pass: ENV.EMAIL_PASSWORD,
  },
});

export default class EmailService {
  static async sendEmail(mailOptions) {
    try {
      const info = await transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.response}`);
    } catch (error) {
      logger.error(`Error sending email: ${error}`);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  static async sendVerificationEmail(userEmail, token) {
    const mailOptions = {
      from: ENV.EMAIL_USERNAME,
      to: userEmail,
      subject: "Email Verification",
      text: `Please verify your email by clicking the following link: https://zerodaypoke.com/verify_account_email/${token}`,
    };

    await this.sendEmail(mailOptions);
  }

  static async sendResetPasswordEmail(userEmail, token) {
    const mailOptions = {
      from: ENV.EMAIL_USERNAME,
      to: userEmail,
      subject: "Password Reset Request",
      text: `You have requested to reset your password. Please click the following link to reset your password: ${ENV.BASE_URL}/reset-password?token=${token}`,
    };

    await this.sendEmail(mailOptions);
  }
}
