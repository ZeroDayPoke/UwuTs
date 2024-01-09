"use strict";
// ./middleware/roleCheck.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_ts_1 = __importDefault(require("../services/UserService.ts"));
const TokenService_ts_1 = __importDefault(require("../services/TokenService.ts"));
const logger_ts_1 = __importDefault(require("./logger.ts"));
const asyncErrorHandler_ts_1 = __importDefault(require("./asyncErrorHandler.ts"));
const index_ts_1 = require("../errors/index.ts");
const requireRole = (requiredRole) => {
    return (0, asyncErrorHandler_ts_1.default)(async (req, res, next) => {
        logger_ts_1.default.info(`Role Required: ${requiredRole}`);
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new index_ts_1.AuthorizationError("Token not provided");
        }
        const decodedToken = TokenService_ts_1.default.validateAccessToken(token);
        if (!decodedToken) {
            throw new index_ts_1.AuthorizationError("Invalid token");
        }
        const userId = decodedToken.id;
        logger_ts_1.default.info(`User ID: ${userId}`);
        const user = await UserService_ts_1.default.getUserById(userId);
        if (!user) {
            throw new index_ts_1.AuthorizationError("User not found");
        }
        const hasRequiredRole = user.Roles.some((role) => role.name === requiredRole);
        if (!hasRequiredRole) {
            throw new index_ts_1.AuthorizationError(`Forbidden: you don't have the required ${requiredRole} role`);
        }
        logger_ts_1.default.info(`User with ID: ${userId} has the required ${requiredRole} role`);
        next();
    });
};
exports.default = requireRole;
//# sourceMappingURL=roleCheck.js.map