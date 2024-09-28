'use client';

import Loading from '@/app/components/ui/loading';
import { useAuthStore } from '@/lib/providers/auth-store-provider';
import { useTransactionQuery } from '@/lib/services/transaction-query';
import { v4 } from 'uuid';
import { useMemo } from 'react';
import { useItemQuery } from '../../../../../lib/services/queries';

const Transactions = () => {
    const user = useAuthStore((state) => state);
    // const { data: transactions, isPending } = useTransactionQuery({ isLoggedIn: !!user });
    const { data: pawnedItems, isPending } = useItemQuery({ isLoggedIn: !!user });

    const getLoans = useMemo(() => {
        if (!pawnedItems) return 0;

        let loans = 0;
        pawnedItems.forEach((pawnedItem) => {
            if (pawnedItem.status === 'active') loans += pawnedItem.value;
        });

        return loans;
    }, [pawnedItems]);

    if (isPending) return <Loading fullScreen />;

    return (
        <div className="w-full h-screen rounded-md border-2">
            <h1 className="text-black">Loans: {getLoans}</h1>
            <ul className="block w-80 min-h-60 bg-slate-400">
                {/* <li className="block">
                    {transactions?.map((transaction) => (
                        <div key={v4()}>{transaction.id}</div>
                    ))}
                </li> */}
            </ul>
        </div>
    );
};

export default Transactions;
