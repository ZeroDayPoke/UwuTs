"use strict";
// ./errors/ServerError.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an error that occurs on the server side.
 */
class ServerError extends Error {
    statusCode;
    /**
     * Creates a new instance of ServerError.
     * @param message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "ServerError";
        this.statusCode = 500;
    }
}
exports.default = ServerError;
//# sourceMappingURL=ServerError.js.map