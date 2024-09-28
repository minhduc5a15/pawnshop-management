import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { type CustomerProps } from '@/lib/types';
import { getCookie } from '@/lib/utils/getCookie';

const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useCustomerQuery = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await axiosInstance.get<CustomerProps[]>('/customers', {
                headers: {
                    Authorization: `Bearer ${await getCookie('authToken')}`,
                },
            });
            const customerMap: Record<string, CustomerProps> = {};
            response.data.forEach((customer) => {
                customerMap[customer.id] = customer;
            });
            return customerMap;
        },
        enabled: isLoggedIn,
    });
};

export const useCustomerQueryById = ({ isLoggedIn, id }: { isLoggedIn: boolean; id: string }) => {
    return useQuery({
        queryKey: ['customers', id],
        queryFn: async () => {
            const response = await axiosInstance.get<CustomerProps>(`/customers/${id}`, {
                headers: {
                    Authorization: `Bearer ${await getCookie('authToken')}`,
                },
            });
            return response.data;
        },
        enabled: isLoggedIn,
    });
};

export const useCustomerQueries = ({ isLoggedIn, ids }: { isLoggedIn: boolean; ids: string[] }) => {
    return useQueries({
        queries: ids.map((id) => ({
            queryKey: ['customers', id],
            queryFn: async () => {
                const response = await axiosInstance.get<CustomerProps[]>(`/customers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${await getCookie('authToken')}`,
                    },
                });
                return response.data;
            },
            enabled: isLoggedIn,
        })),
        combine: (results) => {
            return {
                data: results.flatMap((result) => result.data),
                isLoading: results.some((result) => result.isLoading),
            };
        },
    });
};
