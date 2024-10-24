'use client';

import { useMemo, useState } from 'react';
import { useData } from '@/lib/hooks/useData';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
    Loading,
    Card,
    CardHeader,
    CardTitle,
    Button,
    CardContent,
    Badge,
} from '@/components/ui';
import { ROWS_PER_PAGE } from '@/lib/constants';
import { useGlobal } from '@/lib/hooks/useGlobal';
import { TransactionTable } from '@/lib/types';

export const TransactionsTable = () => {
    const { useTransactionQuery } = useData();
    const { transactionFilter } = useGlobal();

    const { data: transactions, isLoading } = useTransactionQuery();

    const [currentPage, setCurrentPage] = useState<number>(1);

    const data: TransactionTable[] | undefined = useMemo(() => {
        if (isLoading) return [];
        if (transactionFilter === 'all') return transactions;
        return transactions?.filter((transaction) => transaction.type === transactionFilter);
    }, [transactions, transactionFilter, isLoading]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    const totalPages = Math.ceil((data?.length || 0) / ROWS_PER_PAGE);

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const currentTransactions = data?.slice(startIndex, startIndex + ROWS_PER_PAGE) || [];

    return (
        <Card className="container mx-auto px-3 py-3">
            <CardHeader className={'flex flex-row items-center justify-between w-full'}>
                <CardTitle>
                    <p className="text-2xl font-semibold text-gray-800">All Transactions</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Asset</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTransactions.map((transaction, index) => (
                            <TableRow className={`${index & 1 ? 'bg-white' : 'bg-slate-50'} hover:bg-gray-300`} key={transaction.id}>
                                <TableCell>{transaction.customer['id']}</TableCell>
                                <TableCell>{transaction.customer['name']}</TableCell>
                                <TableCell>{transaction.asset['name']}</TableCell>
                                <TableCell>
                                    <Badge variant={transaction.asset.status === 'redeemed' ? 'secondary' : 'default'}>{transaction.asset.status}</Badge>
                                </TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCaption>
                        Total Transactions: <b>{data?.length || 0}</b>
                    </TableCaption>
                </Table>
            </CardContent>
            <div className="flex justify-between mt-4">
                <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </Card>
    );
};
