// models/Token.js
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Token = db.define("Token", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiration: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Token;
