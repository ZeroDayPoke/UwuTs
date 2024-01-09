"use strict";
// ./services/EmailService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const loadEnv_ts_1 = __importDefault(require("../utils/loadEnv.ts"));
const logger_ts_1 = __importDefault(require("../middleware/logger.ts"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: loadEnv_ts_1.default.EMAIL_USERNAME,
        pass: loadEnv_ts_1.default.EMAIL_PASSWORD,
    },
});
class EmailService {
    static async sendEmail(mailOptions) {
        try {
            const info = await transporter.sendMail(mailOptions);
            logger_ts_1.default.info(`Email sent: ${info.response}`);
        }
        catch (error) {
            logger_ts_1.default.error(`Error sending email: ${error}`);
            throw error; // Rethrow the error for the caller to handle
        }
    }
    static async sendVerificationEmail(userEmail, token) {
        const mailOptions = {
            from: loadEnv_ts_1.default.EMAIL_USERNAME,
            to: userEmail,
            subject: "Email Verification",
            text: `Please verify your email by clicking the following link: https://zerodaypoke.com/verify_account_email/${token}`,
        };
        await this.sendEmail(mailOptions);
    }
    static async sendResetPasswordEmail(userEmail, token) {
        const mailOptions = {
            from: loadEnv_ts_1.default.EMAIL_USERNAME,
            to: userEmail,
            subject: "Password Reset Request",
            text: `You have requested to reset your password. Please click the following link to reset your password: ${loadEnv_ts_1.default.BASE_URL}/reset-password?token=${token}`,
        };
        await this.sendEmail(mailOptions);
    }
}
exports.default = EmailService;
//# sourceMappingURL=EmailService.js.map