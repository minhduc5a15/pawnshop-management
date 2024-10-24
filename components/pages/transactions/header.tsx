import { Button, FlexWrap, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { TransactionTypes } from '@/lib/stores/global-store';
import React, { useEffect } from 'react';
import { useGlobal } from '@/lib/hooks/useGlobal';
import { useRouter } from 'next/navigation';

const transactionTypes = [
    { value: 'all', label: 'All' },
    { value: 'pawn', label: 'Pawn' },
    { value: 'redemption', label: 'Redemption' },
];

export const Header = () => {
    const { searchTransactionValue, setSearchTransactionValue, transactionFilter, setTransactionFilter } = useGlobal();

    const router = useRouter();

    useEffect(() => {
        console.log(searchTransactionValue);
    }, [searchTransactionValue]);

    return (
        <FlexWrap gap={5} className={'w-full justify-end'}>
            <Input
                value={searchTransactionValue}
                onChange={(e) => setSearchTransactionValue(e.target.value)}
                placeholder="Search by customer name"
                className="w-96 h-12"
            />
            <Select
                value={transactionFilter}
                onValueChange={(value) => {
                    setTransactionFilter(value as unknown as TransactionTypes);
                    console.log({
                        searchTransactionValue,
                        transactionFilter,
                    });
                    const params = new URLSearchParams();
                    if (searchTransactionValue) {
                        params.append('search', searchTransactionValue);
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
            <Button
                size={'lg'}
                type="submit"
                onClick={() => {
                    setTransactionFilter('all');
                    setSearchTransactionValue('');
                }}
                className="w-full md:w-auto"
            >
                Clear
            </Button>
        </FlexWrap>
    );
};
