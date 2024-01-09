"use strict";
// ./middleware/authenticate.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_ts_1 = __importDefault(require("./logger.ts"));
const asyncErrorHandler_ts_1 = __importDefault(require("./asyncErrorHandler.ts"));
const index_ts_1 = require("../errors/index.ts");
/**
 * Middleware function to ensure that the user is authenticated.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @throws AuthenticationError If the user is not authenticated.
 */
const ensureAuthenticated = (0, asyncErrorHandler_ts_1.default)(async (req, res, next) => {
    if (req.session &&
        req.session.userId &&
        req.user &&
        req.user.id == req.session.userId) {
        logger_ts_1.default.info(`Authenticated successfully: ${req.session.userId}`);
        return next();
    }
    const errorMsg = `Failed to authenticate: session userId: ${req.session?.userId}, token userId: ${req.user?.id}`;
    logger_ts_1.default.error(errorMsg);
    throw new index_ts_1.AuthenticationError("Not authenticated");
});
exports.default = ensureAuthenticated;
//# sourceMappingURL=authenticate.js.map