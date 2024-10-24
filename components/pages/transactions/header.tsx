import { Button, FlexWrap, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { TransactionTypes } from '@/lib/stores/global-store';
import React from 'react';
import { useGlobal } from '@/lib/hooks/useGlobal';
import { useRouter } from 'next/navigation';

const transactionTypes = [
    { value: 'all', label: 'All' },
    { value: 'pawn', label: 'Pawn' },
    { value: 'redemption', label: 'Redemption' },
];


export const Header = () => {
    const { searchTransaction, setSearchTransaction, transactionFilter, setTransactionFilter } = useGlobal();

    const router = useRouter();

    const handleSearch = () => {}

    return (
        <FlexWrap gap={5} className={'w-full justify-end'}>
            <Input value={searchTransaction} onChange={(e) => setSearchTransaction(e.target.value)} placeholder="Search by customer ID" className="w-96 h-12" />
            <Select
                value={transactionFilter}
                onValueChange={(value) => {
                    setTransactionFilter(value as unknown as TransactionTypes);
                    console.log({
                        searchTransaction,
                        transactionFilter,
                    });
                    const params = new URLSearchParams();
                    if (searchTransaction) {
                        params.append('search', searchTransaction);
                    }
                    if (transactionFilter) {
                        params.append('filter', value);
                    }
                    router.push(`/transactions?${params.toString()}`);
                    router.refresh();
                }}
            >
                <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {transactionTypes.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button size={'lg'} type="submit" className="w-full md:w-auto" onClick={handleSearch}>
                Search
            </Button>
        </FlexWrap>
    );
};
