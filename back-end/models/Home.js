// ./models/Home.js
import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./User.js";

const Home = db.define("Home", {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
    validate: {
      isInt: true,
    },
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
      model: User,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
});

Home.belongsTo(User, {
  foreignKey: "userId",
  as: "homeowner",
});

export default Home;
