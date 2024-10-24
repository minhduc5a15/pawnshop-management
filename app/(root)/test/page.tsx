'use client';

import { getTransactionsFromLastNDays } from '@/lib/utils';
import { useData } from '@/lib/hooks/useData';
import { Loading } from '@/components/ui';
import { TransactionProps } from '@/lib/types';
import { useMemo } from 'react';

export default function TestPage() {
    const { useTransactionQuery } = useData();

    const { data, isPending } = useTransactionQuery();

    const transaction: TransactionProps[] = useMemo(() => {
        if (!data) return [];
        return getTransactionsFromLastNDays(data, 7);
    }, [data])

    if (isPending) {
        return <Loading />;
    }

    return <ul>{transaction?.map((transaction) => <li key={transaction.id}>{new Date(transaction.date).toLocaleDateString()}</li>)}</ul>;
}
