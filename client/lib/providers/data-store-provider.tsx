'use client';

import { type ReactNode, createContext, useContext, useEffect, useRef, useMemo } from 'react';
import { useStore } from 'zustand';

import { type DataStore, createDataStore } from '@/lib/stores/data-store';
import { useCustomerQuery, useItemQuery, useTransactionQuery } from '@/lib/services/queries';
import { useAuthStore } from '@/lib/providers/auth-store-provider';

export type DataStoreApi = ReturnType<typeof createDataStore>;

export const DataStoreContext = createContext<DataStoreApi | undefined>(undefined);

export interface DataStoreProviderProps {
    children: ReactNode;
}

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {
    const store = useRef<DataStoreApi>(createDataStore());
    const { user } = useAuthStore((state) => state);

    const customerQuery = useCustomerQuery({ isLoggedIn: !!user });
    const itemQuery = useItemQuery({ isLoggedIn: !!user });
    const transactionQuery = useTransactionQuery({ isLoggedIn: !!user });

    const { setCustomers, setItems, setTransactions } = store.current.getState();

    const data = useMemo(() => {
        return {
            customers: customerQuery,
            items: itemQuery,
            transactions: transactionQuery,
        };
    }, [customerQuery, itemQuery, transactionQuery]);

    useEffect(() => {
        if (data.customers.isPending || data.items.isPending || data.transactions.isPending) return;

        setCustomers(data.customers.data || {});
        setItems(data.items.data || {});
        setTransactions(data.transactions.data || {});
    }, [data, setCustomers, setItems, setTransactions]);

    return <DataStoreContext.Provider value={store.current}>{children}</DataStoreContext.Provider>;
};

export const useDataStore = <T,>(selector: (store: DataStore) => T): T => {
    const dataStoreContext = useContext(DataStoreContext);
    if (!dataStoreContext) {
        throw new Error('useDataStore must be used within a DataStoreProvider');
    }
    return useStore(dataStoreContext, selector);
};
