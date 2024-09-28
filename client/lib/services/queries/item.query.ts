import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { type ItemProps } from '@/lib/types';
import { getCookie } from '@/lib/utils/getCookie';

const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useItemQuery = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const response = await axiosInstance.get<ItemProps[]>('/items', {
                headers: {
                    Authorization: `Bearer ${await getCookie('authToken')}`,
                },
            });
            const itemMap: Record<string, ItemProps> = {};
            response.data.forEach((item) => {
                itemMap[item.id] = item;
            });

            return itemMap;
        },
        enabled: isLoggedIn,
    });
};

export const useItemQueryById = ({ isLoggedIn, id }: { isLoggedIn: boolean; id: string }) => {
    return useQuery({
        queryKey: ['items', id],
        queryFn: async () => {
            const response = await axiosInstance.get<ItemProps>(`/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${await getCookie('authToken')}`,
                },
            });
            return response.data;
        },
        enabled: isLoggedIn,
    });
};

export const useItemQueries = ({ isLoggedIn, ids }: { isLoggedIn: boolean; ids: string[] }) => {
    return useQueries({
        queries: ids.map((id) => ({
            queryKey: ['items', id],
            queryFn: async () => {
                const response = await axiosInstance.get<ItemProps>(`/items/${id}`, {
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
                data: results.map((result) => result.data),
                isPending: results.some((result) => result.isPending),
            };
        },
    });
};
