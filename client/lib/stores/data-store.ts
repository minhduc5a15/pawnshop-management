'use client';

import { createStore } from 'zustand/vanilla';

import { type CustomerProps, type ItemProps, type TransactionProps } from '@/lib/types';

export type DataStates = {
    /**
     * @description
     * Store customers data as hash map
     * @param customers
     */
    customers: Record<string, CustomerProps>; // key: id, value: customer
    items: Record<string, ItemProps>; // key: id, value: item
    transactions: Record<string, TransactionProps>; // key: id, value: transaction
};

export type DataActions = {
    setCustomers: (customers: Record<string, CustomerProps>) => void;
    setItems: (items: Record<string, ItemProps>) => void;
    setTransactions: (transactions: Record<string, TransactionProps>) => void;
};

export type DataStore = DataStates & DataActions;

export const defaultInitState = {
    customers: {},
    items: {},
    transactions: {},
};

export const createDataStore = (initState: DataStates = defaultInitState) => {
    return createStore<DataStore>((set) => ({
        ...initState,
        setCustomers: (customers) => set({ customers }),
        setItems: (items) => set({ items }),
        setTransactions: (transactions) => set({ transactions }),
    }));
};
