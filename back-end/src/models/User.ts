import { Model, DataTypes, Optional } from "sequelize";
import bcrypt from "bcrypt";
import Role from "./Role";
import db from "../config/database";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  lastLogin: Date;
  isVerified: boolean;
}

class User extends Model<UserAttributes> {
  public async validatePassword(passToCheck: string): Promise<boolean> {
    const password = this.getDataValue("password");
    return bcrypt.compare(passToCheck, password);
  }

  public get Roles(): Role[] {
    return this.get("Roles");
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    lastLogin: { type: DataTypes.DATE, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "Users",
  }
);

export default User;
