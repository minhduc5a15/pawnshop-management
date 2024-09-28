/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/home',
                destination: '/dashboard',
                permanent: true,
            },
            {
                source: '/',
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
