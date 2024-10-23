export const DEBOUNCE_TIME: number = 150; // ms;
export const LOGIN_SUCCESS: string = 'Sign in successful!';
export const LOGIN_FAILED: string = 'Username or password is incorrect!';
export const LOGIN_PENDING: string = 'Signing in...';
export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
export const INTEREST_RATE = 0.05; // 5%
export const DAY = 24 * 60 * 60 * 1000; // 1 day = 24 * 60 * 60 * 1000 ms
export const ROWS_PER_PAGE = 20;

export enum Weekday {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7,
}

export enum Month {
    January = 1,
    February = 2,
    March = 3,
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9,
    October = 10,
    November = 11,
    December = 12,
}
