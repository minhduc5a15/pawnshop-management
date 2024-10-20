import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        cookies().delete('authToken');
        return NextResponse.json('Sign out successfully');
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
