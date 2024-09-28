'use client';

import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { useAuthStore } from '@/lib/providers/auth-store-provider';
import { useItemQuery } from '@/lib/services/queries';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui';

export type ItemProps = {
    id: string;
    name: string;
    description?: string;
    value: number;
    pawnedAmount: number;
    pawnedDate: Date;
    redemptionDate?: Date;
    interestRate: number;
    customerId: string;
    status: 'active' | 'redeemed';
};

interface PawnItemListProps {
    items?: ItemProps[];
}

export function PawnItemListComponent({ items = [] }: PawnItemListProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const calculateInterest = (item: ItemProps) => {
        const now = new Date();
        if (!item.redemptionDate) {
            const monthsDiff = (now.getTime() - new Date(item.pawnedDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
            return item.pawnedAmount * (item.interestRate / 100) * monthsDiff;
        }
        const endDate = new Date(item.redemptionDate) || now;
        const monthsDiff = (endDate.getTime() - new Date(item.pawnedDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
        return item.pawnedAmount * (item.interestRate / 100) * monthsDiff;
    };

    if (!items || items.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Danh sách tài sản cầm cố</h1>
                <p className="text-gray-500">Không có tài sản cầm cố nào.</p>
            </div>
        );
    }

    return (
        <div className={'w-full p-4 mx-auto'}>
            <Card className={'max-w-full max-h-screen relative flex flex-col'}>
                <CardHeader className="flex flex-row h-10 text-sm items-center justify-between xs:text-md">
                    <CardTitle>Danh sách tài sản</CardTitle>
                    <Button>Thêm tài sản mới</Button>
                </CardHeader>
                <CardContent className={'flex-1 overflow-y-scroll overflow-x-auto mb-10'}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên tài sản</TableHead>
                                <TableHead>Giá trị</TableHead>
                                <TableHead>Số tiền cầm cố</TableHead>
                                <TableHead>Ngày cầm cố</TableHead>
                                <TableHead>Ngày chuộc</TableHead>
                                <TableHead>Lãi suất</TableHead>
                                <TableHead>Tiền lãi</TableHead>
                                <TableHead>Trạng thái</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className={'overflow-hidden'}>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <pre className="w-20 truncate font-poppins">{item.name}</pre>
                                        {item.description && <pre className="text-sm text-gray-500 w-18 truncate">{item.description}</pre>}
                                    </TableCell>
                                    <TableCell>{formatCurrency(item.value)}</TableCell>
                                    <TableCell>{formatCurrency(item.pawnedAmount)}</TableCell>
                                    <TableCell>{format(item.pawnedDate, 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{item.redemptionDate ? format(item.redemptionDate, 'dd/MM/yyyy') : 'Chưa chuộc'}</TableCell>
                                    <TableCell>{item.interestRate}%/tháng</TableCell>
                                    <TableCell>
                                        {formatCurrency(calculateInterest(item))}
                                        {!item.redemptionDate && (
                                            <span>
                                                <Badge variant="secondary">Dự kiến</Badge>
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                                            {item.status === 'active' ? 'Đang cầm cố' : 'Đã chuộc'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <pre className="w-24 truncate font-poppins">{item.name}</pre>
                                        {/*{item.description && <div className="text-sm text-gray-500">{item.description}</div>}*/}
                                    </TableCell>
                                    <TableCell>{formatCurrency(item.value)}</TableCell>
                                    <TableCell>{formatCurrency(item.pawnedAmount)}</TableCell>
                                    <TableCell>{format(item.pawnedDate, 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{item.redemptionDate ? format(item.redemptionDate, 'dd/MM/yyyy') : 'Chưa chuộc'}</TableCell>
                                    <TableCell>{item.interestRate}%/tháng</TableCell>
                                    <TableCell>
                                        {formatCurrency(calculateInterest(item))}
                                        {!item.redemptionDate && (
                                            <span>
                                                <Badge variant="secondary">Dự kiến</Badge>
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                                            {item.status === 'active' ? 'Đang cầm cố' : 'Đã chuộc'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default function Inventory() {
    const { user } = useAuthStore((state) => state);
    const { data: items } = useItemQuery({ isLoggedIn: !!user });

    return <PawnItemListComponent items={Object.values(items || {})} />;
}
