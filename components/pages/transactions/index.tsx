'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TransactionsTable } from '@/components/pages/transactions/transaction-table';
import { Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui';
import { useGlobal } from '@/lib/hooks/useGlobal';
import { TransactionTypes } from '@/lib/stores/global-store';
import { useRouter, useSearchParams } from 'next/navigation';

const FlexWrap: React.FC<{ gap: number; children?: React.ReactNode }> = ({ gap = 0, children }) => {
    return <div className={`flex flex-wrap gap-${gap}`}>{children}</div>;
};

const transactionTypes = [
    { value: 'all', label: 'All' },
    { value: 'pawn', label: 'Pawn' },
    { value: 'redemption', label: 'Redemption' },
];

export const Transactions = () => {
    const { searchTransaction, setSearchTransaction, transactionFilter, setTransactionFilter } = useGlobal();

    const router = useRouter();

    const handleSearch = () => {
        console.log({
            searchTransaction,
            transactionFilter,
        });
        const params = new URLSearchParams();
        if (searchTransaction) {
            params.append('search', searchTransaction);
        }
        if (transactionFilter) {
            params.append('filter', transactionFilter);
        }
        router.push(`/transactions?${params.toString()}`);
    };

    return (
        <FlexWrap gap={5}>
            <FlexWrap gap={5}>
                <Input
                    value={searchTransaction}
                    onChange={(e) => setSearchTransaction(e.target.value)}
                    placeholder="Search by transaction ID or customer ID"
                    className="w-full h-12"
                />
                <Button size={'lg'} type="submit" className="text-md" onClick={handleSearch}>
                    Search
                </Button>
                <Select value={transactionFilter}>
                    <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {transactionTypes.map((fruit) => (
                                <SelectItem key={fruit.value} value={fruit.value}>
                                    {fruit.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FlexWrap>
            <TransactionsTable />
        </FlexWrap>
    );
};
