'use server';

import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);
    if (cookie) return cookie.value;
    return null;
};

export const setCookie = async (name: string, value: string, maxAge: number) => {
    const cookieStore = cookies();
    cookieStore.set(name, value, {
        maxAge: maxAge ? maxAge : 60 * 60 * 24, // default is 1 day
        sameSite: 'strict',
        path: '/',
    });
};
