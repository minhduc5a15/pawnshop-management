'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Input, Label, Loading } from '@/components/ui';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESS } from '@/lib/constants';

export default function AuthForms() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) return;
        try {
            setIsPending(true);

            const response = await toast.promise(
                axios.post('/api/auth/sign-in', { username, password }, { withCredentials: true }),
                {
                    pending: LOGIN_PENDING,
                    success: LOGIN_SUCCESS,
                    error: LOGIN_FAILED,
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
            );

            if (response.status === 200) {
                return router.push('/dashboard');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => setIsPending(false), 200);
        }
    };

    return (
        <div className="h-screen relative w-full p-4 bg-slate-200">
            <header className="mb-10 text-center min-h-[12vh] shadow-lg grid place-content-center">
                <p className="text-3xl">
                    {'Welcome to'} <span className="font-bold"> PawnMaster</span>
                </p>
            </header>
            <Card className="w-full max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none shadow-2xl transition">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{'Login'}</CardTitle>
                    <CardDescription className="text-gray-400">{'Enter your credentials to login'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div className="">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Enter your username"
                                required
                                className="h-12 border-2"
                                value={username}
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="loginPassword">Password</Label>
                            <Input
                                id="loginPassword"
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="h-12 border-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleLogin} type="submit" disabled={isPending} className="hidden" />
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full bg-blue-700 hover:bg-blue-900" onClick={handleLogin} disabled={isPending}>
                        {!isPending ? 'Login' : <Loading />}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
