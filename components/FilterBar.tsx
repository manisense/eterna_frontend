'use client'

import React from 'react';
import { Filter, PauseOctagon, LayoutTemplate } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export const FilterBar = () => {
    return (
        <div className="flex flex-col gap-4 px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
                {/* Left Tabs */}
                <div className="flex items-center gap-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Trending</h2>
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                        <span className="hover:text-white cursor-pointer transition-colors">Surge</span>
                        <span className="hover:text-white cursor-pointer transition-colors">DEX Screener</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Pump Live</span>
                    </div>
                </div>

                {/* Right Filters */}
                <div className="flex items-center gap-3">
                    {/* Time Range */}
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                        <span className="text-white cursor-pointer">1m</span>
                        <span className="hover:text-white cursor-pointer px-2">5m</span>
                        <span className="hover:text-white cursor-pointer px-2">30m</span>
                        <span className="hover:text-white cursor-pointer px-2">1h</span>
                    </div>

                    <Separator orientation="vertical" className="h-6 bg-gray-800 mx-2" />

                    <Button variant="outline" size="sm" className="h-9 gap-2 border-gray-800 bg-[#111] text-gray-300 hover:bg-[#222] hover:text-white rounded-lg">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-white"><PauseOctagon className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-white"><LayoutTemplate className="w-4 h-4" /></Button>
                    </div>

                    <div className="flex items-center gap-2 bg-[#111] border border-gray-800 rounded-lg px-3 h-9 text-sm text-gray-300">
                        <LayoutTemplate className="w-4 h-4 text-axiom-blue" />
                        <span>1</span>
                        <span className="text-axiom-blue">=</span>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
