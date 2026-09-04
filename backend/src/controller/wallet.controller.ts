import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { walletBalance } from "../services";

const getWalletBalanceController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.userId;
    const balance = await walletBalance(userId);
    res.status(200).json(balance);
});

export {
    getWalletBalanceController
}