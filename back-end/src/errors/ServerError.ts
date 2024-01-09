// ./errors/ServerError.ts

/**
 * Represents an error that occurs on the server side.
 */
class ServerError extends Error {
  public statusCode: number;

  /**
   * Creates a new instance of ServerError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
  }
}

export default ServerError;
