
import { TransactionType } from "../../generated/prisma/enums";

type Transaction = {
    id: string;
    userId: string;
    amount: number;
    type: TransactionType;
    description?: string;
    createdAt: Date;
}

export { TransactionType, Transaction };