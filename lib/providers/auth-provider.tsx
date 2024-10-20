'use client';

import { type ReactNode, createContext, useContext, useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { getUserData } from '@/lib/utils';

import { type AuthStore, createAuthStore } from '@/lib/stores/auth-store';
import { UserAuthentication as User } from '@/lib/types';

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined);

export interface AuthStoreProviderProps {
    children: ReactNode;
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
    const store = useRef<AuthStoreApi>(createAuthStore());

    const { setUser } = store.current.getState();
    useEffect(() => {
        const data = getUserData();
        if (data) data.then((user) => setUser(user as User | null));
    }, [setUser]);

    return <AuthStoreContext.Provider value={store.current}>{children}</AuthStoreContext.Provider>;
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
    const authStoreContext = useContext(AuthStoreContext);
    if (!authStoreContext) {
        throw new Error('useAuthStore must be used within a CounterProvider');
    }
    return useStore(authStoreContext, selector);
};
