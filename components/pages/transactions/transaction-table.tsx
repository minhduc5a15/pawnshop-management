'use client';

import { useState } from 'react';
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

export const TransactionsTable = () => {
    const { useTransactionQuery } = useData();
    const { data, isLoading } = useTransactionQuery();

    const [currentPage, setCurrentPage] = useState(1);

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
        <Card className="container mx-auto px-4 py-4">
            <CardHeader className={'flex flex-row items-center justify-between w-full'}>
                <CardTitle>
                    <p className="text-2xl font-semibold text-gray-800">All Transactions</p>
                </CardTitle>
                <Button>Add new transaction</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Customer ID</TableHead>
                            <TableHead>Pawned Item ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{transaction.customerId}</TableCell>
                                <TableCell>{transaction.pawnedItemId}</TableCell>
                                <TableCell>
                                    <Badge>{transaction.type}</Badge>
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
