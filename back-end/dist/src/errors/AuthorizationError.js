"use strict";
// ./errors/AuthorizationError.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an error that occurs when a user is not authorized to perform an action.
 */
class AuthorizationError extends Error {
    statusCode;
    /**
     * Creates an instance of AuthorizationError.
     * @param message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "AuthorizationError";
        this.statusCode = 403;
    }
}
exports.default = AuthorizationError;
//# sourceMappingURL=AuthorizationError.js.map