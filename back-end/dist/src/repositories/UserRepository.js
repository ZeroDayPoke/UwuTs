"use strict";
// ./repositories/UserRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
const index_ts_1 = require("../models/index.ts");
class UserRepository {
    async createUser(userData) {
        return index_ts_1.User.create(userData);
    }
    async findById(id) {
        return index_ts_1.User.findOne({
            where: { id },
            include: [{ model: index_ts_1.Role, through: index_ts_1.UserRole, as: "Roles" }],
        });
    }
    async findByEmail(email) {
        return index_ts_1.User.findOne({
            where: { email },
            include: [{ model: index_ts_1.Role, through: index_ts_1.UserRole, as: "Roles" }],
        });
    }
    async findAll() {
        return index_ts_1.User.findAll({
            attributes: ["id", "name", "email"],
            include: [index_ts_1.Role],
        });
    }
    async updateUserById(id, userData) {
        await index_ts_1.User.update(userData, { where: { id } });
    }
    async deleteUserById(id) {
        await index_ts_1.User.destroy({ where: { id } });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map