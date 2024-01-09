"use strict";
// ./controllers/UserController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_ts_1 = __importDefault(require("../services/UserService.ts")); // Assuming UserService is converted to TypeScript
const TokenService_ts_1 = __importDefault(require("../services/TokenService.ts")); // Assuming TokenService is converted to TypeScript
const asyncErrorHandler_ts_1 = __importDefault(require("../middleware/asyncErrorHandler.ts"));
const logger_ts_1 = __importDefault(require("../middleware/logger.ts"));
const index_ts_1 = require("../errors/index.ts");
const UserController = {
    signUp: (0, asyncErrorHandler_ts_1.default)(async (req, res) => {
        const { error } = validateUser(req.body);
        if (error) {
            throw new index_ts_1.ValidationError(error.details[0].message);
        }
        try {
            const user = await UserService_ts_1.default.createUser(req.body);
            const accessToken = await TokenService_ts_1.default.generateAccessToken(user.id, user.roles);
            // Assuming storeEssentialUserDataInSession is a typed function
            storeEssentialUserDataInSession(req, { id: user.id, roles: user.roles });
            res.status(201).json({
                message: "User created",
                userId: user.id,
                email: user.email,
                token: accessToken,
                success: true,
            });
        }
        catch (err) {
            throw new index_ts_1.ServerError("Error creating user");
        }
    }),
    logIn: (0, asyncErrorHandler_ts_1.default)(async (req, res) => {
        const { email, password } = req.body;
        logger_ts_1.default.info(`Attempting to log in user with email: ${email}`);
        try {
            const { user, accessToken } = await UserService_ts_1.default.authenticate({
                email,
                password,
            });
            storeEssentialUserDataInSession(req, { id: user.id, roles: user.roles });
            res.status(200).json({
                token: accessToken,
            });
        }
        catch (err) {
            throw new index_ts_1.ServerError("Error logging in user");
        }
    }),
    logOut: (0, asyncErrorHandler_ts_1.default)(async (req, res) => {
        logger_ts_1.default.info(`Logging out user ${req.session.userId}`);
        req.session.destroy((err) => {
            if (err) {
                logger_ts_1.default.error(`Error logging out user: ${err}`);
                return res
                    .status(500)
                    .json({ message: "Could not log out. Try again." });
            }
            res.clearCookie("sessionId");
            res.status(200).json({ success: true });
        });
    }),
    verify: (0, asyncErrorHandler_ts_1.default)(async (req, res) => {
        try {
            const user = await UserService_ts_1.default.verifyEmailToken(req.query.token);
            res.status(200).json({ message: "User verified" });
        }
        catch (err) {
            throw new index_ts_1.ServerError("Failed to verify email");
        }
    }),
    getAllUsers: (0, asyncErrorHandler_ts_1.default)(async (req, res) => {
        try {
            const users = await UserService_ts_1.default.getAllUsers();
            logger_ts_1.default.info(`Found ${users.length} users`);
            res.status(200).json(users);
        }
        catch (err) {
            throw new index_ts_1.ServerError("Failed to get all users");
        }
    }),
    requestResetPassword: (0, asyncErrorHandler_ts_1.default)(async (req, res) => {
        try {
            await UserService_ts_1.default.requestPasswordReset(req.body.email);
            res.status(200).json({ message: "Password reset email sent" });
        }
        catch (err) {
            throw new index_ts_1.ServerError("Failed to request password reset");
        }
    }),
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map