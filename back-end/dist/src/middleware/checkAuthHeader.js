"use strict";
// ./middleware/checkAuthHeader.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncErrorHandler_ts_1 = __importDefault(require("./asyncErrorHandler.ts"));
const logger_ts_1 = __importDefault(require("./logger.ts"));
const index_ts_1 = require("../errors/index.ts");
const checkAuthorizationHeader = (0, asyncErrorHandler_ts_1.default)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    logger_ts_1.default.info(`Authorization header: ${authHeader}`);
    if (!authHeader) {
        logger_ts_1.default.info("Authorization header missing");
        if (req.session)
            await req.session.destroy();
        throw new index_ts_1.AuthenticationError("Authorization header missing");
    }
    next();
});
exports.default = checkAuthorizationHeader;
//# sourceMappingURL=checkAuthHeader.js.map