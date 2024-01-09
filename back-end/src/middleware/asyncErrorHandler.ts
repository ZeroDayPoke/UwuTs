// ./middleware/asyncErrorHandler.ts

import { Request, Response, NextFunction } from "express";
import logger from "./logger";

/**
 * Wraps an async route handler function with error handling middleware.
 * @param fn - The async route handler function to wrap.
 * @returns The wrapped async route handler function with error handling middleware.
 */
const asyncErrorHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): any => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      logger.error("An error occurred: " + err.toString());
      next(err);
    });
  };

export default asyncErrorHandler;
