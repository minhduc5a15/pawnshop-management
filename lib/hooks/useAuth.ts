import { useAuthStore } from '@/lib/providers/auth-provider';

export const useAuth = () => {
    return useAuthStore((state) => state);
};
