"use strict";
// ./errors/AuthenticationError.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom error class for authentication errors.
 */
class AuthenticationError extends Error {
    statusCode;
    /**
     * Creates an instance of AuthenticationError.
     * @param message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
        this.statusCode = 401;
    }
}
exports.default = AuthenticationError;
//# sourceMappingURL=AuthenticationError.js.map