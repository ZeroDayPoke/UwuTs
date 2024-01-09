import express from "express";
import HomeController from "../controllers/HomeController";

const router = express.Router();

router.get("/read", HomeController.getAllHomes);
router.get("/read/:id", HomeController.getHomeById);
router.post("/create", HomeController.createHome);
router.put("/update/:id", HomeController.updateHome);
router.delete("/delete/:id", HomeController.deleteHome);

export default router;
