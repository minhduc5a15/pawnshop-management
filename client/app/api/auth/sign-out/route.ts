import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    cookies().delete('authToken');

    return NextResponse.json('Sign out successful');
}
