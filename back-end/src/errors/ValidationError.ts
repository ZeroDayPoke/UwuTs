// ./errors/ValidationError.ts

/**
 * Represents a validation error.
 */
class ValidationError extends Error {
  public statusCode: number;

  /**
   * Creates a new instance of ValidationError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

export default ValidationError;
