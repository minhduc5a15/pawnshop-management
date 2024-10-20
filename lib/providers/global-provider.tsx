'use client';

import { type ReactNode, createContext, useContext, useRef, useEffect } from 'react';
import { useStore } from 'zustand';

import { type GlobalStore, createGlobalStore } from '@/lib/stores/global-store';

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(undefined);

export interface GlobalStoreProviderProps {
    children: ReactNode;
}

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
    const store = useRef<GlobalStoreApi>(createGlobalStore());

    const { setWindowDimensions } = store.current.getState();

    useEffect(() => {
        const handleResize = () => {
            !!setWindowDimensions && setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [setWindowDimensions]);

    return <GlobalStoreContext.Provider value={store.current}>{children}</GlobalStoreContext.Provider>;
};

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
    const globalStoreContext = useContext(GlobalStoreContext);
    if (!globalStoreContext) {
        throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
    }
    return useStore(globalStoreContext, selector);
};
