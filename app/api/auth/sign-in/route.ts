'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDb } from '@/lib/db';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '@/lib/constants';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is missing');
    }
    const { username, password } = await req.json();

    console.log({ username, password });

    if (!username || !password) {
        return NextResponse.json({}, { status: 400, statusText: 'All fields are required' });
    }

    const db = await connectDb();

    if (!db) {
        return NextResponse.json({}, { status: 400, statusText: 'Error connecting to database' });
    }
    const user = await db.collection('users').findOne({ username });
    if (!user) {
        console.log(user)
        return NextResponse.json({}, { status: 404, statusText: 'Admin not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return NextResponse.json({}, { status: 400, statusText: LOGIN_FAILED });
    }
    const { password: _, ...rest } = user;
    const token = jwt.sign({ ...rest }, JWT_SECRET, { expiresIn: '1d' });

    cookies().set('authToken', token);

    return NextResponse.json({}, { status: 200, statusText: LOGIN_SUCCESS });
}
