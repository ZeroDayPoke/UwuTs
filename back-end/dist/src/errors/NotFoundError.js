"use strict";
// ./errors/NotFoundError.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a NotFoundError, which is thrown when a requested resource is not found.
 */
class NotFoundError extends Error {
    statusCode;
    /**
     * Creates a new instance of NotFoundError.
     * @param message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map