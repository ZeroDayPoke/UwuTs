/**
 * Custom error class for authentication errors.
 */
declare class AuthenticationError extends Error {
    statusCode: number;
    /**
     * Creates an instance of AuthenticationError.
     * @param message - The error message.
     */
    constructor(message: string);
}
export default AuthenticationError;
//# sourceMappingURL=AuthenticationError.d.ts.map