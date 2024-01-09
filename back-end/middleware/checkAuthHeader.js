// middleware/checkAuthHeader.js

import asyncErrorHandler from "./asyncErrorHandler.js";
import logger from "./logger.js";
import { AuthenticationError } from "../errors/index.js";

const checkAuthorizationHeader = asyncErrorHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  logger.info(`Authorization header: ${authHeader}`);

  if (!authHeader) {
    logger.info("Authorization header missing");
    if (req.session) await req.session.destroy();
    throw new AuthenticationError("Authorization header missing");
  }
  next();
});

export default checkAuthorizationHeader;
