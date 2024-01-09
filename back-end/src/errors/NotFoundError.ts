// ./errors/NotFoundError.ts

/**
 * Represents a NotFoundError, which is thrown when a requested resource is not found.
 */
class NotFoundError extends Error {
  public statusCode: number;

  /**
   * Creates a new instance of NotFoundError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export default NotFoundError;
