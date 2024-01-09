// models/Role.js

import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Role = db.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Role;
