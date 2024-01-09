/**
 * Represents an error that occurs when a user is not authorized to perform an action.
 */
declare class AuthorizationError extends Error {
    statusCode: number;
    /**
     * Creates an instance of AuthorizationError.
     * @param message - The error message.
     */
    constructor(message: string);
}
export default AuthorizationError;
//# sourceMappingURL=AuthorizationError.d.ts.map