// ./models/Token.ts

import { DataTypes, Model } from "sequelize";
import db from "../config/database";

interface TokenAttributes {
  id?: number;
  userId: number;
  token: string;
  type: string;
  expiration: Date;
}

class Token extends Model<TokenAttributes> implements TokenAttributes {
  public id!: number;
  public userId!: number;
  public token!: string;
  public type!: string;
  public expiration!: Date;
}

Token.init(
  {
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
  },
  {
    sequelize: db,
    tableName: "Tokens",
  }
);

export default Token;
