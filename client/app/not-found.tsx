'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    return (
        <section className="w-full h-full bg-[#f3f4f6] flex flex-col justify-center items-center font-poppins">
            <span className="text-black text-9xl font-bold">404</span>
            <span className="text-[#373737] mt-4 text-6xl font-bold">Not Found</span>
            <button autoFocus className='text-black text-xl mt-3 font-semibold w-64 h-20 bg-white border-black border-2 opacity-50 transition rounded-xl hover:opacity-100' onClick={() => {
                router.back();
            }}>Go back?</button>
        </section>
    );
};

export default Page;
