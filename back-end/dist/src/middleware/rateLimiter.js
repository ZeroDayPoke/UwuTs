"use strict";
// ./middleware/rateLimiter.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/**
 * Rate limiter middleware to limit the number of requests per IP address within a specified time window.
 * @param options - The options object for rate limiter middleware.
 */
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
exports.default = limiter;
//# sourceMappingURL=rateLimiter.js.map