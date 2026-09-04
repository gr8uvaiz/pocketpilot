import prisma from "../config/prisma";
import { Transaction, TransactionType } from '../types';


const createTransaction = async (transactionData: Transaction, userId?: string) => {
    if (!userId) {
        throw new Error('User ID is required to create a transaction');
    }
    const transaction = await prisma.transaction.create({
        data: {
            ...transactionData,
            userId
        },
    });
    if (!transaction) {
        throw new Error('Transaction creation failed');
    }
    return transaction;
}


const paginatedTransactions = async (
    page: number,
    limit: number,
    userId: string,
    type?: TransactionType,
    categoryId?: string,
    from?: Date,
    to?: Date
) => {
    if (!userId) {
        throw new Error("User ID is required to fetch transactions");
    }

    const offset = (page - 1) * limit;

    const transactions = await prisma.transaction.findMany({
        skip: offset,
        take: limit,
        where: {
            userId,
            ...(type && {
                type,
            }),
            ...(categoryId && {
                categoryId,
            }),
            ...(from || to
                ? {
                    createdAt: {
                        ...(from && {
                            gte: from,
                        }),
                        ...(to && {
                            lte: to,
                        }),
                    },
                }
                : {}),
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return transactions;
};
export {
    createTransaction,
    paginatedTransactions
}