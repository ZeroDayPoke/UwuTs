// ./utils/errorHandler.js

// Define an Error Handler class
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export { ErrorHandler };
