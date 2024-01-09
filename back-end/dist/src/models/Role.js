"use strict";
// ./models/Role.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_ts_1 = __importDefault(require("../config/database.ts"));
class Role extends sequelize_1.Model {
    id;
    name;
}
Role.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_ts_1.default,
    tableName: "Roles",
});
exports.default = Role;
//# sourceMappingURL=Role.js.map