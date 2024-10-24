/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
            {
                source: '/home',
                destination: '/dashboard',
                permanent: true,
            },
            {
                source: '/login',
                destination: '/sign-in',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
