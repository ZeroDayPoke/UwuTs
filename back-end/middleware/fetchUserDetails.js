// middleware/fetchUserDetails.js

import logger from "./logger.js";
import UserService from "../services/UserService.js";
import asyncErrorHandler from "./asyncErrorHandler.js";

const fetchUserDetails = asyncErrorHandler(async (req, res, next) => {
  // const { user } = req;

  // // Fetch user details using the user ID from the token
  // const userDetails = await UserService.getUserById(user.id);

  // // Map roles for easier access
  // const roles = userDetails.Roles.map((role) => role.name);

  // logger.info(`User details fetched and stored in session: ${JSON.stringify(req.session.userAccount)}`);
  // next();
});

export default fetchUserDetails;
