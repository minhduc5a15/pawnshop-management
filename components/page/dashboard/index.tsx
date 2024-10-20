'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Banknote } from 'lucide-react';

ChartJS.register(CategoryScale);

const getLast7Days = () => {
    const daysArray = [];
    const today = new Date();

    for (let i = 1; i <= 7; ++i) {
        const pastDay = new Date(today);
        pastDay.setDate(today.getDate() - i);

        const day = pastDay.getDate().toString().padStart(2, '0');
        const month = (pastDay.getMonth() + 1).toString().padStart(2, '0');

        daysArray.push(`${day}/${month}`);
    }

    return daysArray.reverse();
};

const last7days = getLast7Days();

const LoanChart = () => {
    return (
        <Bar
            data={{
                labels: last7days,
                datasets: [
                    {
                        label: 'Ammount (₫)',
                        data: [12000, 15000, 8000, 18000, 20000, 22000, 25000],
                        barThickness: 10,
                        maxBarThickness: 15,
                    },
                ],
            }}
            options={{
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: false,
                    },
                },
            }}
        />
    );
};

const TransactionChart = () => {
    return (
        <Bar
            data={{
                labels: last7days,
                datasets: [
                    {
                        label: 'Transactions',
                        data: [3, 2, 1, 6, 3, 0, 2],
                        backgroundColor: '#565656',
                        barThickness: 10,
                        maxBarThickness: 15,
                    },
                ],
            }}
            options={{
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: false,
                    },
                },
            }}
        />
    );
};

const NewTransactionsChart = () => {
    return (
        <Bar
            data={{
                labels: last7days,
                datasets: [
                    {
                        label: 'Ammount (₫)',
                        data: [12000, 15000, 8000, 18000, 20000, 22000, 25000],
                        barThickness: 10,
                        maxBarThickness: 15,
                    },
                ],
            }}
            options={{
                scales: {
                    x: {
                        display: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: false,
                    },
                },
            }}
        />
    );
}

export const Dashboard = () => {
    return (
        <div className='w-full h-auto flex flex-wrap gap-5'>
            <div className="w-full h-auto flex flex-wrap rounded-md gap-5 justify-between">
                <Card className={'flex-1 basis-60 min-h-40'}>
                    <CardHeader className={'flex flex-row justify-between'}>
                        <CardTitle>
                            Loans
                            <p className="text-xs font-normal">Last 7 days</p>
                        </CardTitle>
                        <CardDescription>
                            <span className="text-black font-semibold">
                                Total :
                                {new Intl.NumberFormat('vi-VI', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(312312)}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoanChart />
                    </CardContent>
                </Card>
                <Card className={'flex-1 basis-60 min-h-40'}>
                    <CardHeader className={'flex flex-row justify-between'}>
                        <CardTitle>
                            Transactions
                            <p className="text-xs font-normal">Last 7 days</p>
                        </CardTitle>
                        <CardDescription>
                            <span className="font-semibold text-black">123</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TransactionChart />
                    </CardContent>
                </Card>
                <Card className={'flex-1 basis-60 min-h-40'}>
                    <CardHeader className={'flex flex-row justify-between'}>
                        <CardTitle>New Transactions</CardTitle>
                        <p className="text-xs font-normal">Last 7 days</p>
                    </CardHeader>
                    <CardContent>
                        <NewTransactionsChart />
                    </CardContent>
                </Card>
            </div>
            <div className="w-full h-auto flex flex-wrap rounded-md gap-5 justify-between">
                <Card className={'flex-1 basis-60 min-h-40'}>
                    <CardHeader className={'flex flex-row justify-between'}>
                        <CardTitle>
                            Loans
                            <p className="text-xs font-normal">Last 7 days</p>
                        </CardTitle>
                        <CardDescription>
                            <span className="text-black font-semibold">
                                Total :
                                {new Intl.NumberFormat('vi-VI', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(312312)}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoanChart />
                    </CardContent>
                </Card>
                <Card className={'flex-1 basis-60 min-h-40'}>
                    <CardHeader className={'flex flex-row justify-between'}>
                        <CardTitle>
                            Transactions
                            <p className="text-xs font-normal">Last 7 days</p>
                        </CardTitle>
                        <CardDescription>
                            <span className="font-semibold text-black">123</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TransactionChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
