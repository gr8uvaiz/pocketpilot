import prisma from '../config/prisma';


const walletBalance = async (userId: string) => {
    const transactions = await prisma.transaction.groupBy({
        by: ["type"],
        where: {
            userId,
        },
        _sum: {
            amount: true,
        },
    });

    const totalIncome =
        transactions.find((transaction) => transaction.type === "INCOME")
            ?._sum.amount ?? 0;

    const totalExpense =
        transactions.find((transaction) => transaction.type === "EXPENSE")
            ?._sum.amount ?? 0;

    const balance = totalIncome - totalExpense;

    return {
        balance,
        totalIncome,
        totalExpense,
    };
};

export { walletBalance };