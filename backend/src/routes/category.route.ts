import express from "express";

import { createCategoryController, getCategoriesPaginatedController } from "../controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createCategoryController);
router.get("/", authMiddleware, getCategoriesPaginatedController);

export default router;