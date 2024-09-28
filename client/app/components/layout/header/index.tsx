'use client';

import { useAuthStore } from '@/lib/providers/auth-store-provider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { Button } from '@radix-ui/themes';
import { useGlobalStore } from '@/lib/providers/global-store-provider';

const Menu = () => {
    const router = useRouter();
    const signout = async () => {
        await axios.post('/api/auth/sign-out');
        router.push('/sign-in');
    };
    return (
        <div className="text-black absolute block max-h-20 right-6 bg-[#fcfcfc] border-[1px] min-w-32 rounded-md shadow-md z-50">
            <div className="w-full h-1/2 block">
                <div className="w-full h-auto flex items-center p-3 hover:bg-gray-100">
                    <Button variant="ghost" onClick={signout} className={'flex w-full h-full items-center'}>
                        <GoSignOut />
                        <span className="text-sm flex-1 h-full flex-center-row">Sign out</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const { user } = useAuthStore((state) => state);
    const { setIsOpenSidebar, currentPage, isOpenSidebar } = useGlobalStore((state) => state);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="w-screen h-16 border-[1px] z-50 shadow-sm bg-[#fcfcfc] flex sticky top-0">
            <div className="w-full h-full flex flex-row-reverse">
                <div className="h-full min-w-10 flex justify-between pr-2 sm:min-w-44">
                    <div className="hidden min-w-20 h-full flex-col text-black md:flex">
                        <span className="flex justify-end items-end w-full h-1/2 font-semibold font-roboto text-md">
                            <span>{user?.username}</span>
                        </span>
                        <div className="flex justify-end items-start w-full h-1/2 opacity-75 tracking-tight text-sm font-semibold">
                            <span>{'admin'}</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full relative inline-block" ref={ref}>
                        <picture className="w-full h-full flex-center-row" onClick={() => setOpen((open) => !open)}>
                            <img src={`https://ui-avatars.com/api/?name=${user?.username}`} alt="user" className="ml-2 w-10 h-10 rounded-full cursor-pointer" />
                        </picture>
                        {open && <Menu />}
                    </div>
                </div>
                <div className="flex-1 flex h-full relative">
                    <div className="min-w-56 p-2 h-full flex">
                        <span
                            className="text-black w-6 justify-center flex text-center h-full cursor-pointer items-center lg:hidden"
                            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                        >
                            <FaBars />
                        </span>
                        <h1 className="text-black text-lg font-roboto font-bold flex-1 flex-center-row lg:text-2xl">
                            <span className="">
                                PawnMaster
                            </span>
                        </h1>
                    </div>
                    <div className="flex-1 h-full flex items-center">
                        <span className="text-md ml-2 font-semibold tracking-normal text-black sm:text-lg">{currentPage[0].toUpperCase() + currentPage.slice(1)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
