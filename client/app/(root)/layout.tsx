'use client';

import { AuthStoreProvider } from '@/lib/providers/auth-store-provider';
import { Header, Sidebar } from '../components/layout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import React from 'react';
import { GlobalStoreProvider } from '@/lib/providers/global-store-provider';
import { DataStoreProvider } from '@/lib/providers/data-store-provider';

import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GlobalStoreProvider>
            <AuthStoreProvider>
                <QueryClientProvider client={queryClient}>
                    <DataStoreProvider>
                        <Theme>
                            <section className="w-full h-screen bg-[#f3f4f6] flex flex-col">
                                <Header />
                                <main className="w-full flex-1 flex relative overflow-x-hidden">
                                    <Sidebar />
                                    <div className="max-h-screen flex-1 overflow-y-auto">{children}</div>
                                </main>
                            </section>
                            <ReactQueryDevtools />
                        </Theme>
                    </DataStoreProvider>
                </QueryClientProvider>
            </AuthStoreProvider>
        </GlobalStoreProvider>
    );
}
