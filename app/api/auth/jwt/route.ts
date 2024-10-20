import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is missing');
    }
    const { token } = await req.json();
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
        return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ token, decoded });
}
