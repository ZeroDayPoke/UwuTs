/**
 * Represents a NotFoundError, which is thrown when a requested resource is not found.
 */
declare class NotFoundError extends Error {
    statusCode: number;
    /**
     * Creates a new instance of NotFoundError.
     * @param message - The error message.
     */
    constructor(message: string);
}
export default NotFoundError;
//# sourceMappingURL=NotFoundError.d.ts.map