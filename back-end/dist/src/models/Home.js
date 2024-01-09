"use strict";
// ./models/Home.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_ts_1 = __importDefault(require("../config/database.ts"));
const User_ts_1 = __importDefault(require("./User.ts"));
class Home extends sequelize_1.Model {
    id;
    street;
    city;
    state;
    zipcode;
    squareFootage;
    yearBuilt;
    numberBathrooms;
    numberBedrooms;
    userId;
}
Home.init({
    street: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
    },
    zipcode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^[0-9]{5}(-[0-9]{4})?$/,
        },
    },
    squareFootage: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true,
        },
    },
    yearBuilt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        validate: { isInt: true },
    },
    numberBathrooms: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true,
            min: 1,
        },
    },
    numberBedrooms: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true,
            min: 1,
        },
    },
    userId: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Users", // should reference the table name
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
}, {
    sequelize: database_ts_1.default,
    tableName: "Homes",
});
Home.belongsTo(User_ts_1.default, {
    foreignKey: "userId",
    as: "homeowner",
});
exports.default = Home;
//# sourceMappingURL=Home.js.map