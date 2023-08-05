// ./models/User.js

import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/database.js";
import crypto from "crypto";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const User = db.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, SALT_ROUNDS);
        this.setDataValue("password", hash);
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Users",
  }
);

User.associate = (models) => {
  User.belongsToMany(models.Role, { through: models.UserRole });
};

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.prototype.generateVerificationToken = function () {
  this.verificationToken = crypto.randomBytes(32).toString("hex");
  this.verificationTokenExpiration = Date.now() + 3600000;
};

export default User;
