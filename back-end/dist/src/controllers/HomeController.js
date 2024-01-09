"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HomeService_ts_1 = __importDefault(require("../services/HomeService.ts"));
class HomeController {
    async getAllHomes(req, res) {
        try {
            const homes = await HomeService_ts_1.default.findAll();
            res.json(homes);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    }
    async getHomeById(req, res) {
        try {
            const home = await HomeService_ts_1.default.findById(req.params.id);
            if (!home) {
                return res.status(404).json({ error: "Home not found" });
            }
            res.json(home);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    }
    async createHome(req, res) {
        try {
            const newHome = await HomeService_ts_1.default.create(req.body);
            res.json({ valid: true, home: newHome });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error saving the home data" });
        }
    }
    async updateHome(req, res) {
        try {
            const updatedHome = await HomeService_ts_1.default.update(req.params.id, req.body);
            if (!updatedHome[0]) {
                return res.status(404).json({ error: "Home not found" });
            }
            res.json({ valid: true, home: updatedHome });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating the home" });
        }
    }
    async deleteHome(req, res) {
        try {
            const deletedHome = await HomeService_ts_1.default.delete(req.params.id);
            if (!deletedHome) {
                return res.status(404).json({ error: "Home not found" });
            }
            res.json({ valid: true, message: "Home deleted" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error deleting the home" });
        }
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map