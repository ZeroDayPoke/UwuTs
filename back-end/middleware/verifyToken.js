// middleware/verifyToken.js

import TokenService from "../services/TokenService.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import logger from "./logger.js";
import { AuthenticationError } from "../errors/index.js";

const verifyToken = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  logger.info(`Received token: ${token}`);

  try {
    const decoded = await TokenService._verifyJwt(token);
    logger.info(`Token verified for user: ${decoded.id}`);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Token verification failed: ${error.message}`);
    await req.session.destroy();
    throw new AuthenticationError("Invalid token");
  }
});

export default verifyToken;
