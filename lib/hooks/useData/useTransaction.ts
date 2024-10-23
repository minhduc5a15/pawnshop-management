'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { type TransactionProps as Transaction } from '@/lib/types';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

type TransactionTypes = Transaction['type'];

export const useTransactionQuery = (typeFilter?: TransactionTypes) => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<Transaction[]>('/transactions');

            if (!Array.isArray(data)) {
                throw new Error('Invalid data');
            }

            let filteredData = data.sort((a, b) => {
                const aDate = new Date(a.date);
                const bDate = new Date(b.date);

                if (aDate < bDate) {
                    return 1;
                }
                if (aDate > bDate) {
                    return -1;
                }
                return 0;
            });

            if (typeFilter) {
                filteredData = filteredData.filter((transaction) => transaction.type === typeFilter);
            }

            return filteredData;
        },
    });
};
