"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HomeController_ts_1 = __importDefault(require("../controllers/HomeController.ts"));
const router = express_1.default.Router();
router.get("/read", HomeController_ts_1.default.getAllHomes);
router.get("/read/:id", HomeController_ts_1.default.getHomeById);
router.post("/create", HomeController_ts_1.default.createHome);
router.put("/update/:id", HomeController_ts_1.default.updateHome);
router.delete("/delete/:id", HomeController_ts_1.default.deleteHome);
exports.default = router;
//# sourceMappingURL=homeRoutes.js.map