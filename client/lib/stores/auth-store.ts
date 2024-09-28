import { createStore } from 'zustand/vanilla';

import { UserAuthentication } from '@/lib/types';

export type AuthStates = {
    user: UserAuthentication | null;
};

export type AuthActions = {
    setUser: (user: UserAuthentication | null) => void;
};

export type AuthStore = AuthStates & AuthActions;

export const defaultInitState = {
    user: null,
};

export const createAuthStore = (initState: AuthStates = defaultInitState) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        setUser: (user: UserAuthentication | null) => set({ user }),
    }));
};
