'use client';

import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { type TransactionProps } from '@/lib/types';
import { getCookie } from '@/lib/utils/getCookie';
import { SERVER_URL } from '@/lib/utils';

const baseUrl = `${SERVER_URL}/api`;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useTransactionQuery = ({ isLoggedIn = false }: { isLoggedIn: boolean }) => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const response = await axiosInstance.get<TransactionProps[]>('/transactions', {
                headers: {
                    Authorization: `Bearer ${await getCookie('authToken')}`,
                },
            });
            const transactionMap: Record<string, TransactionProps> = {};
            response.data.forEach((transaction) => {
                transactionMap[transaction.id] = transaction;
            });

            return transactionMap;
        },
        enabled: isLoggedIn,
    });
};

export const useTransactionQueryById = ({ isLoggedIn, id }: { isLoggedIn: boolean; id: string }) => {
    return useQuery({
        queryKey: ['transactions', id],
        queryFn: async () => {
            const response = await axiosInstance.get<TransactionProps>(
                `/transactions/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${await getCookie('authToken')}`,
                    },
                },
            );
            return response.data;
        },
        enabled: isLoggedIn,
    });
};

export const useTransactionQueries = ({ isLoggedIn, ids }: { isLoggedIn: boolean; ids: string[] }) => {
    return useQueries({
        queries: ids.map((id) => ({
            queryKey: ['transactions', id],
            queryFn: async () => {
                const response = await axiosInstance.get<TransactionProps>(
                    `/transactions/${id}`,

                    {
                        headers: {
                            Authorization: `Bearer ${await getCookie('authToken')}`,
                        },
                    },
                );
                return response.data;
            },
            enabled: isLoggedIn,
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                isPending: results.some((result) => result.isPending),
            };
        },
    });
};
