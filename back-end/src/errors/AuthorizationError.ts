// ./errors/AuthorizationError.ts

/**
 * Represents an error that occurs when a user is not authorized to perform an action.
 */
class AuthorizationError extends Error {
  public statusCode: number;

  /**
   * Creates an instance of AuthorizationError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = 403;
  }
}

export default AuthorizationError;
