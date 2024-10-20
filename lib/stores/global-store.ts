import { createStore } from 'zustand/vanilla';

export type GlobalStates = {
    currentPage: string;
    isOpenSidebar: boolean;
    windowDimensions: { width: number; height: number };
};

export type GlobalActions = {
    setCurrentPage: (page: string) => void;
    closeSidebar: () => void;
    openSidebar: () => void;
    setWindowDimensions?: (dimensions: { width: number; height: number }) => void;
};

export type GlobalStore = GlobalStates & GlobalActions;

export const getCurrentPage = () => {
    if (typeof window === 'undefined') return '/dashboard';
    const path = window.location.pathname.split('/')[1];
    if (path === 'sign-in') return '/dashboard';
    return path;
};

export const defaultInitState = {
    currentPage: getCurrentPage(),
    isOpenSidebar: false,
    windowDimensions: { width: typeof window !== 'undefined' ? window.innerWidth : 0, height: typeof window !== 'undefined' ? window.innerHeight : 0 },
};

export const createGlobalStore = (initState: GlobalStates = defaultInitState) => {
    return createStore<GlobalStore>((set) => ({
        ...initState,
        setCurrentPage: (page: string) => set({ currentPage: page }),
        closeSidebar: () => set({ isOpenSidebar: false }),
        openSidebar: () => set({ isOpenSidebar: true }),
        setWindowDimensions: (dimensions: { width: number; height: number }) => set({ windowDimensions: dimensions }),
    }));
};
