// ./middleware/index.js

import errorHandler from "./errorHandler.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import rateLimiter from "./rateLimiter.js";
import checkAuthorizationHeader from "./checkAuthHeader.js";
import ensureAuthenticated from "./authenticate.js";
import validateSession from "./validateSession.js";
import fetchUserDetails from "./fetchUserDetails.js";
import verifyToken from "./verifyToken.js";
import requireRole from "./roleCheck.js";
import requestLogger from "./requestLogger.js";
import logger from "./logger.js";


export {
  errorHandler,
  requireRole,
  rateLimiter,
  requestLogger,
  logger,
  asyncErrorHandler,
  checkAuthorizationHeader,
  ensureAuthenticated,
  validateSession,
  fetchUserDetails,
  verifyToken,
};
