// middleware/validateSession.js

import asyncErrorHandler from "./asyncErrorHandler.js";
import { AuthorizationError } from "../errors/index.js";
import logger from "./logger.js";

const validateSession = asyncErrorHandler(async (req, res, next) => {
  logger.info("Validating user", req.user);
  const user = req.user;

  // Check if session userId exists
  if (!req.session.userId) {
    logger.info("Session userId not found. Storing new session data.");
    storeEssentialUserDataInSession(req, req.user);
  }
  // Check for mismatch between session userId and token userId
  else if (req.session.userId !== user.id) {
    logger.error(`Session and token user mismatch: ${req.session.userId} !== ${user.id}`);
    await req.session.destroy();
    throw new AuthorizationError("Session and token user mismatch");
  }

  logger.info(`Session validated for user: ${user.id}`);
  next();
});

export default validateSession;
