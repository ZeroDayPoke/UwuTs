"use strict";
// ./middleware/errorHandler.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_ts_1 = require("../errors/index.ts");
const logger_ts_1 = __importDefault(require("./logger.ts"));
/**
 * Middleware function to handle errors in the application.
 * @param err - The error object to be handled.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    if (err instanceof index_ts_1.ValidationError) {
        logger_ts_1.default.error(`ValidationError: ${err.message}`);
        res.status(400).json({ error: err.message });
    }
    else if (err instanceof index_ts_1.NotFoundError) {
        logger_ts_1.default.error(`NotFoundError: ${err.message}`);
        res.status(404).json({ error: err.message });
    }
    else if (err instanceof index_ts_1.AuthorizationError) {
        logger_ts_1.default.error(`AuthorizationError: ${err.message}`);
        res.status(403).json({ error: err.message });
    }
    else if (err instanceof index_ts_1.AuthenticationError) {
        logger_ts_1.default.error(`AuthenticationError: ${err.message}`);
        res.status(401).json({ error: err.message });
    }
    else if (err instanceof index_ts_1.ServerError) {
        logger_ts_1.default.error(`ServerError: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
    else {
        logger_ts_1.default.error(`Unknown Error: ${err.message}`);
        res.status(500).json({ error: "Something went wrong!" });
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map