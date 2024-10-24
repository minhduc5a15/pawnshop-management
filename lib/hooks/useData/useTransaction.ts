'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { type TransactionProps as Transaction, TransactionTable } from '@/lib/types';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useTransactionQuery = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<TransactionTable[]>('/transactions');

            if (!Array.isArray(data)) {
                throw new Error('Invalid data');
            }

            return data.sort((a, b) => {
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
        },
    });
};
