'use client';

import { Transactions } from '@/components/pages/transactions';
import { Suspense } from 'react';

const TransactionsPage = () => {
    return (
        <Suspense>
            <Transactions />
        </Suspense>
    );
};

export default TransactionsPage;
