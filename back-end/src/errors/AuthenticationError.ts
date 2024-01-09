// ./errors/AuthenticationError.ts

/**
 * Custom error class for authentication errors.
 */
class AuthenticationError extends Error {
  public statusCode: number;

  /**
   * Creates an instance of AuthenticationError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

export default AuthenticationError;
