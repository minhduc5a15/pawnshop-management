import { connectDb } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { Transaction } from '@/lib/models/transaction';

export async function GET() {
    try {
        const db = await connectDb();

        if (!db) {
            return NextResponse.json({}, { status: 400, statusText: 'Error connecting to database' });
        }
        const transactions = await db.collection('transactions').find({}).toArray();
        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const db = await connectDb();
        if (!db) {
            return NextResponse.json({}, { status: 400, statusText: 'Error connecting to database' });
        }
        const { id, customerId, pawnedItemId, type, amount, date } = await req.json();
        const existingTransaction = await db.collection('transactions').findOne({ id });

        if (existingTransaction) {
            return NextResponse.json({ error: 'Transaction already exists' }, { status: 409 });
        }

        const newTransaction = new Transaction({
            id,
            customerId,
            pawnedItemId,
            type,
            amount,
            date,
        });

        await newTransaction.save();
        return NextResponse.json({ message: 'Transaction created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const db = await connectDb();
        if (!db) {
            return NextResponse.json({}, { status: 400, statusText: 'Error connecting to database' });
        }
        const { id } = await req.json();
        const transaction = await db.collection('transactions').findOne({ id });
        if (!transaction) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }
        await db.collection('transactions').deleteOne({ id });
        return NextResponse.json({ message: 'Transaction deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
