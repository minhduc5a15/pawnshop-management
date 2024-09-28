'use server';

import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);
    if (cookie)  return cookie.value;
    return null;
}