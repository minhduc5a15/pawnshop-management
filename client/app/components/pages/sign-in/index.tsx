'use client';

import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Loading } from '../../ui/loading';
import { Input } from '@/app/components/ui';

const SignIn = () => {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const performLogin = async () => {
            setIsPending(true);
            return await axios.post(
                `/api/auth/sign-in`,
                {
                    username,
                    password,
                },
                {
                    withCredentials: true,
                },
            );
        };

        toast
            .promise(
                performLogin(),
                {
                    pending: 'Signing in...', //
                    success: 'Signed in successfully!',
                    error: 'Username or password is incorrect',
                },
                {
                    position: 'top-center',
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        router.push('/home');
                    }, 500);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsPending(false);
            });
    };

    return (
        <section className="w-full h-screen flex justify-center items-center bg-white">
            <main className="w-[360px] h-[440px]">
                <form
                    onSubmit={login}
                    className="w-full h-full flex-col bg-[#ffffff] rounded-md border-[1px] border-[#dddddd] shadow-2xl overflow-hidden shadow-slate-400"
                >
                    <header className="w-full h-1/4 grid place-items-center">
                        <span className="text-xl font-bold text-black">Login</span>
                    </header>
                    <div className="w-full h-auto flex-col">
                        <div className="w-full h-16 grid place-items-center pl-3 pr-3">
                            {/*<input*/}
                            {/*    maxLength={30}*/}
                            {/*    type="text"*/}
                            {/*    name="username"*/}
                            {/*    id="username"*/}
                            {/*    placeholder="username or email"*/}
                            {/*    className="w-full h-12 pl-3 rounded-md outline-[#e3e3e3/30] transition duration-300 border-[#e3e3e3] border-[1px] shadow-sm text-black text-sm focus:placeholder:invisible"*/}
                            {/*    required*/}
                            {/*    autoComplete="off"*/}
                            {/*    value={username}*/}
                            {/*    onChange={onChange}*/}
                            {/*    autoFocus*/}
                            {/*/>*/}
                            <Input
                                maxLength={30}
                                type={'text'}
                                autoFocus
                                autoComplete={'off'}
                                placeholder={'username or email'}
                                name="username"
                                id="username"
                                className={'h-12'}
                                value={username}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="w-full h-16 grid place-items-center pl-3 pr-3">
                            <Input
                                maxLength={30}
                                type={'password'}
                                autoFocus
                                autoComplete={'off'}
                                placeholder={'password'}
                                name="password"
                                id="password"
                                className={'h-12'}
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="w-full h-1/3 pl-5 pr-3">
                            <span className="text-xs cursor-pointer font-semibold text-black">Forgot password?</span>
                        </div>
                    </div>
                    <div className="w-full h-1/4 pl-3 pr-3 flex-center-row">
                        <button
                            type="submit"
                            className="w-full text-sm rounded-md h-12 flex-center-row text-white transition bg-blue-500 font-semibold hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={isPending}
                        >
                            {isPending ? <Loading size={30} className="" /> : 'Login'}
                        </button>
                    </div>
                </form>
            </main>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                theme="dark"
                transition={Bounce}
                className={'text-sm'}
            />
        </section>
    );
};

export default SignIn;
