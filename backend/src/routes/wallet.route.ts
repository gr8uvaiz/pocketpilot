import express from "express";
import { getWalletBalanceController } from "../controller";

const router = express.Router();


router.get("/balance", getWalletBalanceController);

export default router;