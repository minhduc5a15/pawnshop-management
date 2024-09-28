'use client';

import { CardTitle, CardHeader, Card, Button, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, CardContent, Loading } from '@/app/components/ui';
import { useDataStore } from '@/lib/providers/data-store-provider';
import Link from 'next/link';

const Customers = () => {
    const { customers } = useDataStore((state) => state);

    if (Object.keys(customers).length === 0) {
        return <Loading fullScreen />;
    }
    return (
        <div className={'w-full p-4 mx-auto'}>
            <Card className={'max-w-full max-h-screen relative flex flex-col'}>
                <CardHeader className="flex flex-row h-10 text-sm items-center justify-between xs:text-md">
                    <CardTitle className={'text-md'}>Danh sách khách hàng</CardTitle>
                    <Button>Thêm khách hàng mới</Button>
                </CardHeader>
                <CardContent className={'flex-1 overflow-y-scroll overflow-x-auto mb-10'}>
                    <Table className={'min-w-[800px] whitespace-nowrap'}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên</TableHead>
                                <TableHead>Địa chỉ</TableHead>
                                <TableHead>Số điện thoại</TableHead>
                                <TableHead>email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.values(customers).map((customer) => (
                                <TableRow className=" cursor-pointer hover:bg-gray-300" key={customer.id}>
                                    <TableCell className={'font-medium text-black'}>
                                        <Link href={`/customers/${customer.id}`}>
                                            <pre className={'truncate whitespace-pre w-20'}>{customer.name}</pre>
                                        </Link>
                                    </TableCell>
                                    <TableCell className={'text-black'}>
                                        <Link href={`/customers/${customer.id}`}>
                                            <pre className={'truncate whitespace-pre w-32'}>{customer.address}</pre>
                                        </Link>
                                    </TableCell>
                                    <TableCell className={'text-black'}>{customer.phoneNumber}</TableCell>
                                    <TableCell className={'text-black'}>{customer.email}</TableCell>
                                </TableRow>
                            ))}
                            {Object.values(customers).map((customer) => (
                                <TableRow className=" cursor-pointer hover:bg-gray-300" key={customer.id}>
                                    <TableCell className={'font-medium text-black'}>
                                        <Link href={`/customers/${customer.id}`}>
                                            <pre className={'truncate whitespace-pre w-20'}>{customer.name}</pre>
                                        </Link>
                                    </TableCell>
                                    <TableCell className={'text-black'}>
                                        <Link href={`/customers/${customer.id}`}>
                                            <pre className={'truncate whitespace-pre w-32'}>{customer.address}</pre>
                                        </Link>
                                    </TableCell>
                                    <TableCell className={'text-black'}>{customer.phoneNumber}</TableCell>
                                    <TableCell className={'text-black'}>{customer.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Customers;
