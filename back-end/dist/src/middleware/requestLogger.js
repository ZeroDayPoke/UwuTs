"use strict";
// ./middleware/requestLogger.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_ts_1 = __importDefault(require("./logger.ts"));
const requestLogger = (req, res, next) => {
    const now = new Date().toISOString();
    const meta = {
        time: now,
        ip: req.ip,
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
    };
    logger_ts_1.default.info(`HTTP Request`, meta);
    next();
};
exports.default = requestLogger;
//# sourceMappingURL=requestLogger.js.map