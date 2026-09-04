import asyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { getDashboard } from "../services";

const getDashboardController = asyncHandler(
    (req: Request, res: Response) => {

        const userId = req.userId;
        const dashboard = getDashboard(userId);
        res.status(200).json(dashboard)
    }
)

export {
    getDashboardController
}