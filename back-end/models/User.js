// ./models/User.js

import { DataTypes } from "sequelize";
import db from "../config/database.js";
import crypto from 'crypto';

const User = db.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
);

User.prototype.generateVerificationToken = function () {
  this.verificationToken = crypto.randomBytes(32).toString('hex');
  this.verificationTokenExpiration = Date.now() + 3600000;
};

export { User };
