import type { Metadata } from 'next';
import React from 'react';
import { AuthStoreProvider } from '@/lib/providers/auth-provider';
import { GlobalStoreProvider } from '@/lib/providers/global-provider';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
    title: 'App',
    description: 'Generated by create next app',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <GlobalStoreProvider>
            <AuthStoreProvider>
                <div className="flex w-screen h-screen bg-gray-100">
                    <Sidebar  />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Header  />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                            <div className="container mx-auto px-4 py-4">{children}</div>
                        </main>
                    </div>
                </div>
            </AuthStoreProvider>
        </GlobalStoreProvider>
    );
}
