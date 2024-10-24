'use server';

import { connectDb } from '@/lib/db';
import { Transaction } from '@/lib/models/transaction';
import { NextResponse } from 'next/server';

export const getTransactions = async () => {
    try {
        const db = await connectDb();

        if (!db) {
            return NextResponse.json({}, { status: 400, statusText: 'Error connecting to database' });
        }
        const transactions = await getTransactionsWithDetails();
        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};

export const getTransactionsWithDetails = async () => {
    const db = await connectDb();

    if (!db) {
        return null;
    }

    return Transaction.aggregate([
        {
            $lookup: {
                from: 'customers',
                localField: 'customerId',
                foreignField: 'id',
                as: 'customer',
            },
        },
        {
            $lookup: {
                from: 'assets',
                localField: 'assetId',
                foreignField: 'id',
                as: 'asset',
            },
        },
        {
            $unwind: '$asset',
        },
        {
            $unwind: '$customer',
        },
        {
            $project: {
                _id: 0,
                id: 1,
                type: 1,
                amount: 1,
                date: 1,
                customer: 1,
                asset: 1,
            },
        },
    ]);
};
