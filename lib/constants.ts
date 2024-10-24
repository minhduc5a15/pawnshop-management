export const DEBOUNCE_TIME: number = 150; // ms;
export const LOGIN_SUCCESS: string = 'Sign in successful!';
export const LOGIN_FAILED: string = 'Username or password is incorrect!';
export const LOGIN_PENDING: string = 'Signing in...';
export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
export const INTEREST_RATE = 0.05; // 5%
export const DAY = 24 * 60 * 60 * 1000; // 1 day = 24 * 60 * 60 * 1000 ms
export const ROWS_PER_PAGE = 20;

// httpStatusCodes.js

export const HTTP_STATUS_CODES = {
    // 3xx: Redirection
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found (Redirect)',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    306: '(Unused)',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',

    // 4xx: Client Error
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot (RFC 2324, an April Fools' joke)",
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',

    // 5xx: Server Error
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    511: 'Network Authentication Required',
};

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
