// ./models/User.ts

import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import Role from "./Role";
import db from "../config/database";
import ENV from "../utils/loadEnv";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  lastLogin?: Date;
  phone: string;
  isVerified: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public lastLogin!: Date;
  public phone!: string;
  public isVerified!: boolean;

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public get roles(): Role[] {
    return this.get("Roles") as Role[];
  }
}

User.init(
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
    sequelize: db,
    tableName: "Users",
  }
);

User.beforeCreate(async (user: User) => {
  user.password = await bcrypt.hash(user.password, ENV.SALT_ROUNDS);
});

export default User;
