import { Dashboard } from '@/app/components/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard page',
};

const Page = () => {
    return <Dashboard />;
};

export default Page;
