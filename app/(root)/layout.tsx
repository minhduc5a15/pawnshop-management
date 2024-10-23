'use client';

import React from 'react';
import { AuthStoreProvider } from '@/lib/providers/auth-provider';
import { GlobalStoreProvider } from '@/lib/providers/global-provider';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: false,
        },
    },
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStoreProvider>
                <AuthStoreProvider>
                    <div className="flex w-screen h-screen bg-gray-100">
                        <Sidebar />
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <Header />
                            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                                <div className="container mx-auto px-4 py-4">{children}</div>
                            </main>
                        </div>
                    </div>
                </AuthStoreProvider>
            </GlobalStoreProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
