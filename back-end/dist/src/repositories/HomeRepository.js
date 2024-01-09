"use strict";
// ./repositories/HomeRepository.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Home_ts_1 = __importDefault(require("../models/Home.ts"));
class HomeRepository {
    async findAll() {
        return Home_ts_1.default.findAll();
    }
    async findById(id) {
        return Home_ts_1.default.findByPk(id);
    }
    async create(homeData) {
        return Home_ts_1.default.create(homeData);
    }
    async updateById(id, homeData) {
        await Home_ts_1.default.update(homeData, { where: { id } });
    }
    async deleteById(id) {
        await Home_ts_1.default.destroy({ where: { id } });
    }
}
exports.default = HomeRepository;
//# sourceMappingURL=HomeRepository.js.map