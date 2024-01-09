import { Model, DataTypes } from "sequelize";
import db from "../config/database";
import User from "./User";
import Role from "./Role";
import Token from "./Token";

interface UserRoleAttributes {
  userId: number;
  roleId: number;
}

class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
  public userId!: number;
  public roleId!: number;
}

UserRole.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "UserRole" }
);

const setupAssociations = (): void => {
  User.belongsToMany(Role, { through: "UserRoles" });
  Role.belongsToMany(User, { through: "UserRoles" });

  Token.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Token, { foreignKey: "userId" });
};

export { setupAssociations, UserRole };
