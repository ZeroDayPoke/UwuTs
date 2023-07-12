// ./models/Role.js

import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./User.js";

const Role = db.define("Role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

const UserRole = db.define("UserRole", {});

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

export { Role, UserRole };
