import prisma from '../config/prisma';

const getDashboard = async (userId: string) => {
  const [summary, recentTransactions, expenseByCategory, monthlySummary] =
    await Promise.all([
      prisma.transaction.groupBy({
        by: ["type"],
        where: {
          userId,
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.transaction.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
        include: {
          category: true,
        },
      }),

      prisma.transaction.groupBy({
        by: ["categoryId"],
        where: {
          userId,
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.$queryRaw<
        {
          month: Date;
          income: number;
          expense: number;
        }[]
      >`
        SELECT
          DATE_TRUNC('month', "createdAt") AS month,
          COALESCE(
            SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END),
            0
          ) AS income,
          COALESCE(
            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END),
            0
          ) AS expense
        FROM "Transaction"
        WHERE "userId" = ${userId}
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY month DESC
        LIMIT 6
      `,
    ]);

  const totalIncome =
    summary.find((item) => item.type === "INCOME")?._sum.amount ?? 0;

  const totalExpense =
    summary.find((item) => item.type === "EXPENSE")?._sum.amount ?? 0;

  const balance = totalIncome - totalExpense;

  const categoryIds = expenseByCategory
    .map((item) => item.categoryId)
    .filter((id): id is string => id !== null);

  const categories = await prisma.category.findMany({
    where: {
      id: {
        in: categoryIds,
      },
      userId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name])
  );

  const expensesByCategory = expenseByCategory.map((item) => ({
    categoryId: item.categoryId,
    categoryName: item.categoryId
      ? categoryMap.get(item.categoryId) ?? "Unknown"
      : "Uncategorized",
    amount: item._sum.amount ?? 0,
  }));

  return {
    balance,
    totalIncome,
    totalExpense,
    recentTransactions,
    expensesByCategory,
    monthlySummary,
  };
};

export { getDashboard };