"use strict";
// ./middleware/validateSession.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncErrorHandler_ts_1 = __importDefault(require("./asyncErrorHandler.ts"));
const index_ts_1 = require("../errors/index.ts");
const logger_ts_1 = __importDefault(require("./logger.ts"));
const validateSession = (0, asyncErrorHandler_ts_1.default)(async (req, res, next) => {
    logger_ts_1.default.info("Validating user", req.user);
    const user = req.user;
    // Check if session userId exists
    if (!req.session.userId) {
        logger_ts_1.default.info("Session userId not found. Storing new session data.");
        // Assuming storeEssentialUserDataInSession is a function defined elsewhere
        storeEssentialUserDataInSession(req, req.user);
    }
    // Check for mismatch between session userId and token userId
    else if (req.session.userId !== user?.id) {
        logger_ts_1.default.error(`Session and token user mismatch: ${req.session.userId} !== ${user?.id}`);
        await req.session.destroy();
        throw new index_ts_1.AuthorizationError("Session and token user mismatch");
    }
    logger_ts_1.default.info(`Session validated for user: ${user?.id}`);
    next();
});
exports.default = validateSession;
//# sourceMappingURL=validateSession.js.map