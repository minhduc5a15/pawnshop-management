'use client';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui';
import { useAuth } from '@/lib/hooks/useAuth';
import { useGlobal } from '@/lib/hooks/useGlobal';
import { Bell, Settings, Menu, LogOut, User } from 'lucide-react';

export function Header() {
    const { openSidebar } = useGlobal();

    const { user, signOut } = useAuth();

    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="lg:hidden mr-2 cursor-pointer" onClick={openSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                </div>
                <div className="flex items-center">
                    <Button className="cursor-pointer" variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button className="cursor-pointer" variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage src={''} alt={user?.username} />
                                <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.email}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user?.username}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={signOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
