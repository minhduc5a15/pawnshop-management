import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL;

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken');

    if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next(); // Bỏ qua các route API
    }

    if (req.nextUrl.pathname === '/sign-in') {
        if (!token) return NextResponse.next();
        try {
            const response = await axios.post(`${req.nextUrl.origin}/api/auth/jwt`, {
                token: token.value,
            });
            if (response.status === 200) return NextResponse.redirect(new URL('/home', req.url));
            return NextResponse.next();
        } catch (error) {
            return NextResponse.next();
        }
    } else {
        if (!token) return NextResponse.redirect(new URL('/sign-in', req.url));
        try {
            const response = await axios.post(`${SERVER_URL}/api/auth/jwt`, {
                token: token.value,
            });
            if (response.status !== 200) return NextResponse.redirect(new URL('/sign-in', req.url));
        } catch (error) {
            return NextResponse.next();
        }
    }
}

// Chỉ định các route cần middleware
export const config = {
    matcher: ['/((?!api|_next|static).*)'], // Bảo vệ tất cả các route ngoại trừ /api và các tài nguyên Next.js
};
