import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/database.js";

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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

const Role = db.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const UserRole = db.define("UserRole", {});

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

export { User, Role, UserRole };
