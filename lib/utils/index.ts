import { TransactionProps } from '@/lib/types';
import { v4 } from 'uuid';

export * from './cn';
export * from './data';
export * from './cookie';

export const getTransactionsFromLastNDays = (transactions: TransactionProps[], n: number) => {
    const currentDate = new Date(); // Ngày hiện tại
    const startDate = new Date(currentDate); // Tạo một bản sao của ngày hiện tại
    startDate.setDate(currentDate.getDate() - n); // Thiết lập ngày bắt đầu

    const recentTransactions: TransactionProps[] = [];

    for (const transaction of transactions) {
        if (new Date(transaction.date) > startDate) {
            recentTransactions.push(transaction);
        }
    }

    return recentTransactions;
};

export const getTransactionsOnSpecificDate = (transactions: TransactionProps[], specificDate: Date | string): TransactionProps[] => {
    if (typeof specificDate === 'string') {
        return transactions.filter((transaction) => new Date(transaction.date).toDateString() === specificDate);
    }
    return transactions.filter((transaction) => new Date(transaction.date) === specificDate);
};

