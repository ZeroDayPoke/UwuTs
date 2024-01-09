// ./middleware/roleCheck.js
import UserService from "../services/UserService.js";
import TokenService from "../services/TokenService.js";
import logger from "./logger.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import { AuthorizationError } from "../errors/index.js";

const requireRole = (requiredRole) => {
  return asyncErrorHandler(async (req, res, next) => {
    logger.info(`Role Required: ${requiredRole}`);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = TokenService.validateAccessToken(token);

    if (!decodedToken) {
      throw new AuthorizationError("Invalid token");
    }

    const userId = decodedToken.id;
    logger.info(`User ID: ${userId}`);
    const user = await UserService.getUserById(userId);

    if (!user) {
      throw new AuthorizationError("User not found");
    }

    const hasRequiredRole = user.Roles.some(
      (role) => role.name === requiredRole
    );

    if (!hasRequiredRole) {
      throw new AuthorizationError(
        `Forbidden: you don't have the required ${requiredRole} role`
      );
    }

    logger.info(
      `User with ID: ${userId} has the required ${requiredRole} role`
    );
    next();
  });
};

export default requireRole;
