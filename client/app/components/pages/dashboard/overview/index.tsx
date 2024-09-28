'use client';

import { useAuthStore } from '@/lib/providers/auth-store-provider';
import { useItemQuery } from '@/lib/services/queries';
import React, { useEffect, useMemo } from 'react';
import { FiDollarSign, FiPackage } from 'react-icons/fi';
import { PiCurrencyDollarBold } from 'react-icons/pi';
import { FaUserFriends } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import {Loading, Card, CardHeader, CardTitle, CardContent, Badge} from '@/app/components/ui';
import { useDataStore } from '@/lib/providers/data-store-provider';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: number;
    headerIcon: React.ReactNode;
    bodyIcon: React.ReactNode;
}

const Flex: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    return (
        <div className="w-full h-auto flex flex-wrap rounded-md gap-5 justify-between" {...props}>
            {children}
        </div>
    );
};

// const Card: React.FC<CardProps> = ({ ...props }) => {
//     return (
//         <div className="bg-white h-40 shadow-sm rounded-md flex-1 basis-60 p-6 flex flex-col">
//             <header className="flex justify-between items-center">
//                 <span className="font-poppins tracking-normal">{props.title}</span>
//                 {props.headerIcon}
//             </header>
//             <main className="flex flex-1 items-center mt-4">
//                 <div className="text-2xl flex h-10">
//                     <span className="grid place-content-center mb-1">{props.bodyIcon}</span>
//                     <strong className="grid place-items-center ml-2 tracking-tight">{props.value}</strong>
//                 </div>
//             </main>
//         </div>
//     );
// };

type States = 'activeItems' | 'loans' | 'dueToday' | 'customers';

const Overview = () => {
    const { customers } = useDataStore((state) => state);

    useEffect(() => {
        console.log(customers);
    }, [customers]);

    const state: Record<States, number> = useMemo(() => {
        let result: Record<States, number> = {
            activeItems: 0,
            loans: 0,
            dueToday: 0,
            customers: 0,
        };

        result.customers = Object.keys(customers).length;

        return result;
    }, [customers]);

    if (!customers) return <></>;
    return (
        <>
            <Flex>
                {/*<Card title="Total loans" value={state.loans} headerIcon={<FiDollarSign />} bodyIcon={<PiCurrencyDollarBold />} />*/}
                {/*<Card title="Active items" value={state.activeItems} headerIcon={<FiPackage />} bodyIcon={<></>} />*/}
                {/*<Card title="Due today" value={state.dueToday} headerIcon={<CiCalendar />} bodyIcon={<></>} />*/}
                {/*<Card title="Customers" value={state.customers} headerIcon={<FaUserFriends />} bodyIcon={<></>} />*/}
                <Card className={'flex-1 basis-60 h-40'}>
                    <CardHeader className={"flex flex-row justify-between"}>
                        <CardTitle>Total loans</CardTitle>
                        <FiDollarSign />
                    </CardHeader>
                    <CardContent>
                        <span>
                            <strong>{3123123213}</strong>
                        </span>
                    </CardContent>
                </Card>
                <Card className={'flex-1 basis-60 h-40'}>
                    <CardHeader className={"flex flex-row justify-between"}>
                        <CardTitle>Total loans</CardTitle>
                        <FiDollarSign />
                    </CardHeader>
                    <CardContent>
                        <span>
                            <strong>{3123123213}</strong>
                        </span>
                    </CardContent>
                </Card>
                <Card className={'flex-1 basis-60 h-40'}>
                    <CardHeader className={"flex flex-row justify-between"}>
                        <CardTitle>Total loans</CardTitle>
                        <FiDollarSign />
                    </CardHeader>
                    <CardContent>
                        <span>
                            <strong>{3123123213}</strong>
                        </span>
                    </CardContent>
                </Card>
                <Card className={'flex-1 basis-60 h-40'}>
                    <CardHeader className={"flex flex-row justify-between"}>
                        <CardTitle>Total loans</CardTitle>
                        <FiDollarSign />
                    </CardHeader>
                    <CardContent>
                        <span>
                            <strong>{3123123213}</strong>
                        </span>
                    </CardContent>
                </Card>
                
            </Flex>
            <Flex>
                {/*<Card title="Total loans" value={state.loans} headerIcon={<FiDollarSign />} bodyIcon={<PiCurrencyDollarBold />} />*/}
                {/*<Card title="Active pawns" value={state.activeItems} headerIcon={<FiPackage />} bodyIcon={<></>} />*/}
            </Flex>
        </>
    );
};

export default Overview;
