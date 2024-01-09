// ./models/Role.ts

import { DataTypes, Model } from "sequelize";
import db from "../config/database";

interface RoleAttributes {
  id?: number;
  name: string;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Roles",
  }
);

export default Role;
