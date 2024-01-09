// ./models/Home.ts

import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import User from "./User";

interface HomeAttributes {
  id?: number;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  squareFootage: number;
  yearBuilt?: number;
  numberBathrooms: number;
  numberBedrooms: number;
  userId?: number;
}

class Home extends Model<HomeAttributes> implements HomeAttributes {
  public id!: number;
  public street!: string;
  public city!: string;
  public state!: string;
  public zipcode!: string;
  public squareFootage!: number;
  public yearBuilt!: number | null;
  public numberBathrooms!: number;
  public numberBedrooms!: number;
  public userId!: number | null;
}

Home.init(
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[0-9]{5}(-[0-9]{4})?$/,
      },
    },
    squareFootage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    },
    yearBuilt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isInt: true },
    },
    numberBathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 1,
      },
    },
    numberBedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 1,
      },
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize: db,
    tableName: "Homes",
  }
);

Home.belongsTo(User, {
  foreignKey: "userId",
  as: "homeowner",
});

export default Home;
