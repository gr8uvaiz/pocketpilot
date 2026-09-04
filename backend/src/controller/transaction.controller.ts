import { createTransaction, paginatedTransactions } from "../services/transaction.service";
import asyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { TransactionType } from "../types";

const createTransactionController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const transaction = await createTransaction(req.body, userId);
    res.status(201).json(transaction);
});

const getTransactionsPaginatedController = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }

        const type = req.query.type as TransactionType | undefined;

        const categoryId = req.query.categoryId as string | undefined;

        const from = req.query.from
            ? new Date(req.query.from as string)
            : undefined;

        const to = req.query.to
            ? new Date(req.query.to as string)
            : undefined;

        const transactions = await paginatedTransactions(
            page,
            limit,
            userId,
            type,
            categoryId,
            from,
            to
        );

        res.status(200).json(transactions);
    }
);

export {
    createTransactionController,
    getTransactionsPaginatedController
}