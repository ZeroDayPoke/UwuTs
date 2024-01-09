"use strict";
// ./errors/ValidationError.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a validation error.
 */
class ValidationError extends Error {
    statusCode;
    /**
     * Creates a new instance of ValidationError.
     * @param message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}
exports.default = ValidationError;
//# sourceMappingURL=ValidationError.js.map