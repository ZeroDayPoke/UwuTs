// models/User.js

import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/database.js";
import ENV from "../utils/loadEnv.js";

const SALT_ROUNDS = ENV.SALT_ROUNDS;

const User = db.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    lastLogin: { type: DataTypes.DATE, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Users",
  }
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
