'use server';

import { cookies } from 'next/headers';

export const setCookie = async (name: string, value: string) => {
    const cookieStore = cookies();
    cookieStore.set(name, value);
};
