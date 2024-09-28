import React from 'react';
import Link from 'next/link';
import { FiHome, FiPackage } from 'react-icons/fi';
import { GoPeople } from 'react-icons/go';
import { AiOutlineTransaction } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';
import { FaAngleLeft } from 'react-icons/fa';
import { FullScreenOverlay } from '@/app/components/ui/loading';
import { useGlobalStore } from '@/lib/providers/global-store-provider';

const Item = ({ icon: Icon, title }: { icon: React.ReactElement; title: string }) => {
    const { setIsOpenSidebar, setCurrentPage } = useGlobalStore((state) => state);
    return (
        <li
            className="text-black block pl-4 w-full h-10 transition hover:bg-slate-200 cursor-pointer"
            onClick={() => {
                setIsOpenSidebar(false);
                setCurrentPage(title.toLowerCase());
            }}
        >
            <div className="w-full h-10 p-1 flex text-md">
                <Link href={`/${title.toLowerCase()}`} className="w-full h-full flex">
                    <span className="text-md h-full w-auto flex items-center lg:text-lg">{Icon}</span>
                    <span className="text-sm flex-grow flex ml-3 items-center tracking-normal font-semibold lg:text-md">{title}</span>
                </Link>
            </div>
        </li>
    );
};

const List: React.FC = () => {
    return (
        <ul className={'w-full min-h-40 border-b-[1px] pb-4 mt-4 inline-block'}>
            <Item icon={<FiHome />} title={'Dashboard'} />
            <Item icon={<AiOutlineTransaction />} title={'Transactions'} />
            <Item icon={<GoPeople />} title={'Customers'} />
            <Item icon={<FiPackage />} title={'Inventory'} />
            <Item icon={<MdHistory />} title={'History'} />
        </ul>
    );
};

const Sidebar: React.FC = () => {
    const { setIsOpenSidebar, isOpenSidebar, windowDimensions } = useGlobalStore((state) => state);

    if (windowDimensions?.width < 1024) {
        if (isOpenSidebar) {
            return (
                <FullScreenOverlay onClick={() => setIsOpenSidebar(false)}>
                    <div className="sticky top-16 w-48 h-screen bg-white block shadow-gray-400 shadow-md">
                        <div className="w-full h-full relative" onClick={(e) => e.stopPropagation()}>
                            <List />
                            <span className={'absolute top-1/2 -right-5 size-5 flex-center-row'}>
                                <FaAngleLeft className="text-white cursor-pointer text-lg" onClick={() => setIsOpenSidebar(false)} />
                            </span>
                        </div>
                    </div>
                </FullScreenOverlay>
            );
        }
        return <></>;
    }

    return (
        <div className="sticky w-56 h-screen bg-white block shadow-gray-400 shadow-md">
            <div className="w-full h-full">
                <List />
            </div>
        </div>
    );
};

export default Sidebar;
