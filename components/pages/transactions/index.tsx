'use client';

import React, { Suspense } from 'react';
import { TransactionsTable } from '@/components/pages/transactions/transaction-table';
import { FlexWrap } from '@/components/ui';
import { Header } from '@/components/pages/transactions/header';

export const Transactions = () => {
    return (
        <FlexWrap gap={5}>
            <Header />
            <Suspense>
                <TransactionsTable />
            </Suspense>
        </FlexWrap>
    );
};
