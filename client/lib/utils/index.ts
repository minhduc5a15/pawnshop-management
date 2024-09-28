export * from './getCookie';
export * from './setCookie';
export * from './constant';
export * from './getUserData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
