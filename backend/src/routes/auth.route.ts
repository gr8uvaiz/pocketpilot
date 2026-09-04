import express from "express";

import {
  getMeController,
  loginController,
  logoutController,
  registerController,
} from "../controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, getMeController);

export default router;
