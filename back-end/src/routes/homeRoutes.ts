import express from "express";
import HomeController from "../controllers/HomeController";
import {
  asyncErrorHandler,
  requireRole,
  checkAuthorizationHeader,
  ensureAuthenticated,
  validateSession,
  verifyToken,
} from "../middleware";

const router = express.Router();

router.get("/read", asyncErrorHandler(HomeController.getAllHomes));
router.get("/read/:id", asyncErrorHandler(HomeController.getHomeById));

router.use(checkAuthorizationHeader);
router.use(verifyToken);
router.use(validateSession);
router.use(ensureAuthenticated);
router.post("/create", asyncErrorHandler(HomeController.createHome));
router.put("/update/:id", asyncErrorHandler(HomeController.updateHome));

router.use(requireRole("Admin"));
router.delete("/delete/:id", asyncErrorHandler(HomeController.deleteHome));

export default router;
