'use client'

import React, { ElementType } from 'react';
import { Search, Wallet, Bell, Zap, Radar, LayoutGrid } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NavItem = ({ label, active = false, icon: Icon }: { label: string; active?: boolean, icon?: ElementType }) => (
    <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors",
        active ? "text-white bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"
    )}>
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
    </div>
);

export const TopNavigation = () => {
    return (
        <nav className="flex items-center justify-between h-16 px-6 border-b border-gray-800 bg-black sticky top-0 z-50">
            {/* Left: Logo & Menu */}
            <div className="flex items-center gap-8">
                {/* Logo Placeholder */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-black fill-current"><path d="M12 2L2 22h20L12 2zm0 4l6 14H6l6-14z" /></svg>
                    </div>
                    {/* Menu items only visible on desktop */}
                    <div className="hidden lg:flex items-center gap-1">
                        <NavItem label="Discover" active={true} icon={LayoutGrid} />
                        <NavItem label="Pulse" icon={Zap} />
                        <NavItem label="Trackers" icon={Radar} />
                        <NavItem label="Perpetuals" />
                        <NavItem label="Yield" />
                        <NavItem label="Vision" />
                        <NavItem label="Portfolio" />
                        <NavItem label="Rewards" />
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <div className="relative hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white" />
                    <input
                        type="text"
                        placeholder="Search pairs, tokens..."
                        className="bg-[#111] border border-gray-800 rounded-full h-9 pl-9 pr-4 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-gray-600 w-64 transition-all"
                    />
                </div>

                <Button variant="outline" size="sm" className="h-9 gap-2 border-gray-800 bg-[#111] text-gray-300 hover:bg-[#222] hover:text-white hidden sm:flex">
                    <Image src="/vercel.svg" alt="SOL" width={16} height={16} className="invert" />
                    SOL
                </Button>

                <Button size="sm" className="h-9 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold rounded-lg px-5 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    Deposit
                </Button>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white"><Bell className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white"><Wallet className="w-5 h-5" /></Button>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <UserAvatar />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const UserAvatar = () => (
    <div className="w-full h-full bg-gray-800 rounded-full overflow-hidden relative">
        {/* Placeholder avatar */}
        <Image src="https://github.com/shadcn.png" alt="User" fill className="object-cover" />
    </div>
)
