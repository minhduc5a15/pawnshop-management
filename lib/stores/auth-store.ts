import { createStore } from 'zustand/vanilla';
import { useRouter } from 'next/navigation'; // Import useRouter từ next/navigation
import { UserAuthentication } from '@/lib/types';
import axios from 'axios';

export type AuthStates = {
    user: UserAuthentication | null;
};

export type AuthActions = {
    setUser: (user: UserAuthentication | null) => void;
    signOut: () => void;
};

export type AuthStore = AuthStates & AuthActions;

export const defaultInitState = {
    user: null,
};

export const createAuthStore = (initState: AuthStates = defaultInitState) => {
    return createStore<AuthStore>()((set) => {
        const router = useRouter(); // Khởi tạo useRouter ở đây

        return {
            ...initState,
            setUser: (user: UserAuthentication | null) => set({ user }),
            signOut: () => {
                axios
                    .post('/api/auth/sign-out')
                    .then(() => {
                        set({ user: null });
                        router.push('/sign-in');
                        router.refresh();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
        };
    });
};
