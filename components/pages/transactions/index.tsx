'use client';

import React from 'react';
import { TransactionsTable } from '@/components/pages/transactions/transaction-table';
import { Button, Input, Select, SelectOption } from '@/components/ui';
import { useGlobal } from '@/lib/hooks/useGlobal';
import { TransactionTypes } from '@/lib/stores/global-store';
import { useRouter, useSearchParams } from 'next/navigation';

const FlexWrap: React.FC<{ gap: number; children?: React.ReactNode }> = ({ gap = 0, children }) => {
    return <div className={`flex flex-wrap gap-${gap}`}>{children}</div>;
};

export const Transactions = () => {
    const { searchTransaction, setSearchTransaction, transactionFilter, setTransactionFilter } = useGlobal();

    const router = useRouter();
    const searchParams = useSearchParams();
    const filter = searchParams.get('filter');

    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key); // Remove the parameter if the value is empty
        }

        router.push(`/transactions?${params.toString()}`);
    };

    const handleSearch = () => {
        console.log({
            searchTransaction,
            transactionFilter,
        });

    };

    return (
        <FlexWrap gap={5}>
            <form
                className={'flex flex-wrap gap-5'}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <Input
                    value={searchTransaction}
                    onChange={(e) => setSearchTransaction(e.target.value)}
                    placeholder="Search by transaction ID or customer ID"
                    className="w-full h-12"
                />
                <Button size={'lg'} type="submit" className="text-md">
                    Search
                </Button>
                <Select onChange={(value) => setTransactionFilter(value as TransactionTypes)}>
                    <SelectOption value="all">All Types</SelectOption>
                    <SelectOption value="pawn">Pawn</SelectOption>
                    <SelectOption value="redemption">Redemption</SelectOption>
                </Select>
            </form>
            <TransactionsTable />
        </FlexWrap>
    );
};
