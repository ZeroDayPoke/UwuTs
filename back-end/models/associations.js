// models/associations.js

import db from "../config/database.js";
import User from "./User.js";
import Role from "./Role.js";
import Token from "./Token.js";

// Many-to-many association table for User and Role
const UserRole = db.define(
  "UserRole",
  {},
  {
    tableName: "UserRoles",
  }
);

const setupAssociations = () => {
  // User and Role associations
  User.belongsToMany(Role, { through: UserRole });
  Role.belongsToMany(User, { through: UserRole });

  Token.belongsTo(User, {
    foreignKey: "userId"
  });
  User.hasMany(Token, { foreignKey: "userId" });

};

export { setupAssociations, UserRole };
