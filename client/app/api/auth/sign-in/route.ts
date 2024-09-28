import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const SERVER_URL = process.env.SERVER_URL;

export async function POST(req: Request) {
    const { username, password } = await req.json();
    const response = await axios.post(`${SERVER_URL}/api/auth/sign-in`, {
        username,
        password,
    });

    if (response.status === 200) {
        cookies().set('authToken', response.data.token, {
            maxAge: 3600, // 1 hour
        });
        return NextResponse.json({
            message: 'login successful',
            ...response.data,
        });
    }
    return NextResponse.json({
        message: 'login failed',
    });
}
