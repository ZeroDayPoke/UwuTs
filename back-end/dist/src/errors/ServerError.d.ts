/**
 * Represents an error that occurs on the server side.
 */
declare class ServerError extends Error {
    statusCode: number;
    /**
     * Creates a new instance of ServerError.
     * @param message - The error message.
     */
    constructor(message: string);
}
export default ServerError;
//# sourceMappingURL=ServerError.d.ts.map