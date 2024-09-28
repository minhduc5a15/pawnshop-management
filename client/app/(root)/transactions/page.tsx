'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { TransactionProps } from '@/lib/types';
import { useAuthStore } from '@/lib/providers/auth-store-provider';
import { useCustomerQueries, useCustomerQuery, useItemQueries, useItemQuery, useTransactionQuery } from '@/lib/services/queries';
import { Loading } from '@/app/components/ui';

interface TransactionTableProps {
    transactions: TransactionProps[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const getTransactionTypeBadge = (type: TransactionProps['type']) => {
        switch (type) {
            case 'pawn':
                return <Badge variant="default">Cầm cố</Badge>;
            case 'interest_payment':
                return <Badge variant="secondary">Trả lãi</Badge>;
            case 'redemption':
                return <Badge variant="outline">Chuộc tài sản</Badge>;
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Tài sản</TableHead>
                    <TableHead>Loại giao dịch</TableHead>
                    <TableHead className="text-right">Số tiền</TableHead>
                    <TableHead className="text-right">Ngày giao dịch</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                            <pre className="w-24 truncate font-poppins">{transaction.id}</pre>
                        </TableCell>
                        <TableCell>{transaction.customerId}</TableCell>
                        <TableCell>{transaction.pawnedItemId}</TableCell>
                        <TableCell>{getTransactionTypeBadge(transaction.type)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell className="text-right">{formatDate(new Date(transaction.date))}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default function Page() {


    return <TransactionTable transactions={[]} />;
}
