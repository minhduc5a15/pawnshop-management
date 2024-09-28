'use server';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;

export const getUserData = async () => {
    if (!JWT_SECRET) return null;
    const token = cookies().get('authToken')?.value;
    if (!token) return null;
    try {
        const userData = jwt.verify(token, JWT_SECRET);
        if (!userData) return null;
        return userData;
    } catch (error) {
        return null;
    }
};
