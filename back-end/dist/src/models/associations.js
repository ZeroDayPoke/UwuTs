"use strict";
// ./models/associations.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.setupAssociations = void 0;
const sequelize_1 = require("sequelize");
const database_ts_1 = __importDefault(require("../config/database.ts"));
const User_ts_1 = __importDefault(require("./User.ts"));
const Role_ts_1 = __importDefault(require("./Role.ts"));
const Token_ts_1 = __importDefault(require("./Token.ts"));
class UserRole extends sequelize_1.Sequelize.Model {
}
exports.UserRole = UserRole;
// Initialize UserRole
UserRole.init({}, { sequelize: database_ts_1.default, tableName: "UserRoles" });
const setupAssociations = () => {
    // User and Role associations
    User_ts_1.default.belongsToMany(Role_ts_1.default, { through: UserRole });
    Role_ts_1.default.belongsToMany(User_ts_1.default, { through: UserRole });
    // Token associations
    Token_ts_1.default.belongsTo(User_ts_1.default, { foreignKey: "userId" });
    User_ts_1.default.hasMany(Token_ts_1.default, { foreignKey: "userId" });
};
exports.setupAssociations = setupAssociations;
//# sourceMappingURL=associations.js.map