'use client';

import { useSearchParams } from 'next/navigation';

export default function TestPage() {
    const searchParams = useSearchParams();

    console.log(searchParams);

    return <h1>Hello world</h1>;
}
