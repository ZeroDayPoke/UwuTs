"use strict";
// ./middleware/verifyToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenService_ts_1 = __importDefault(require("../services/TokenService.ts"));
const asyncErrorHandler_ts_1 = __importDefault(require("./asyncErrorHandler.ts"));
const logger_ts_1 = __importDefault(require("./logger.ts"));
const index_ts_1 = require("../errors/index.ts");
const verifyToken = (0, asyncErrorHandler_ts_1.default)(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    logger_ts_1.default.info(`Received token: ${token}`);
    try {
        const decoded = await TokenService_ts_1.default._verifyJwt(token);
        logger_ts_1.default.info(`Token verified for user: ${decoded.id}`);
        req.user = decoded;
        next();
    }
    catch (error) {
        logger_ts_1.default.error(`Token verification failed: ${error.message}`);
        if (req.session)
            await req.session.destroy();
        throw new index_ts_1.AuthenticationError("Invalid token");
    }
});
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map