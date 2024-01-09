"use strict";
// ./models/Token.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_ts_1 = __importDefault(require("../config/database.ts"));
class Token extends sequelize_1.Model {
    id;
    userId;
    token;
    type;
    expiration;
}
Token.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: database_ts_1.default,
    tableName: "Tokens",
});
exports.default = Token;
//# sourceMappingURL=Token.js.map