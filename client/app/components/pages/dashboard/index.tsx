'use client';

import { useDataStore } from '@/lib/providers/data-store-provider';
import Overview from './overview';
import { useEffect } from 'react';
import { Loading } from '@/app/components/ui';

const Dashboard = () => {
    const { customers } = useDataStore((state) => state);

    if (!customers) {
        return <Loading fullScreen />;
    }
    return (
        <div className="w-full min-h-screen gap-5 flex flex-col overflow-y-auto p-4">
            <Overview />
        </div>
    );
};

export default Dashboard;
