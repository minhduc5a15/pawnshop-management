'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Banknote, Package, Users, PackagePlus, X } from 'lucide-react';
import { useGlobal } from '@/lib/hooks/useGlobal';
import { useRouter } from 'next/navigation';

interface SidebarItem {
    name: string;
    icon?: React.ReactNode;
}

const SidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: <Home className="mr-2 size-5" /> },
    { name: 'Transactions', icon: <Banknote className="mr-2 size-5" /> },
    { name: 'Assets', icon: <Package className="mr-2 size-5" /> },
    { name: 'Customers', icon: <Users className="mr-2 size-5" /> },
];

export function Sidebar() {
    const { isOpenSidebar, closeSidebar, transactionFilter, searchTransactionValue } = useGlobal();

    const [isMobile, setIsMobile] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (!isOpenSidebar && isMobile) {
        return null;
    }

    return (
        <aside
            className={`inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${
                isMobile && (isOpenSidebar ? 'fixed translate-x-0' : '-translate-x-full')
            } transition-transform duration-300 ease-in-out`}
        >
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-primary">PawnMaster</h1>
                {isMobile && (
                    <Button variant="ghost" size="icon" onClick={closeSidebar}>
                        <X className="h-6 w-6" />
                    </Button>
                )}
            </div>
            <nav className="mt-6">
                {SidebarItems.map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => {
                            if (item.name === 'Transactions') {
                                const searchParams = new URLSearchParams();
                                searchParams.append('search', searchTransactionValue);
                                searchParams.append('filter', transactionFilter);
                                router.push(`/transactions?${searchParams.toString()}`);
                            }
                            else router.push(`/${item.name.toLowerCase()}`);
                        }}
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-left hover:bg-accent"
                    >
                        {item.icon}
                        <span className="text-md">{item.name}</span>
                    </Button>
                ))}
            </nav>
        </aside>
    );
}
