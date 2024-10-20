'use server';

import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;

export const getUserData = async () => {
    if (!JWT_SECRET) return null;

    const token = cookies().get('authToken')?.value;
    if (!token) {
        const currentHost = headers().get('host');
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const signInUrl = new URL('/sign-in', `${protocol}://${currentHost}`);

        return NextResponse.redirect(signInUrl);
    }

    try {
        const userData = jwt.verify(token, JWT_SECRET);
        if (!userData) return null;
        return userData;
    } catch (error) {
        return null;
    }
};
