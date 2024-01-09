// models/index.js

import db from "../config/database.js";
import { setupAssociations } from "./associations.js";
setupAssociations();

import User from "./User.js";
import Role from "./Role.js";
import Token from "./Token.js";
import { UserRole } from "./associations.js";

export { db, Role, User, UserRole, Token };
