import { connectDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const db = await connectDb();
    if (!db) {
        return NextResponse.json({}, { status: 400, statusText: 'Error connecting to database' });
    }
    try {
        const assets = await db.collection('assets').find({}).toArray();

        if (!Array.isArray(assets) || !assets.length) {
            return NextResponse.json({});
        }

        return NextResponse.json(assets);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}
