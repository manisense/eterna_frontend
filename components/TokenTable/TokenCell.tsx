'use client'

import React from 'react';
import { Token } from '@/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Copy, Search, Globe, ShieldCheck, Lock } from 'lucide-react';

interface TokenCellProps {
    token: Token;
}

export const TokenCell: React.FC<TokenCellProps> = ({ token }) => {
    return (
        <div className="flex items-center gap-3">
            {/* Token Image */}
            <div className="w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 overflow-hidden relative border border-gray-700">
                {token.image ? (
                    <Image src={token.image} alt={token.name} fill className="object-cover" />
                ) : (
                    // Placeholder gradient
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                        {token.symbol.substring(0, 2)}
                    </div>
                )}

                {/* Chain Icon Badge (Mocked as SOL) */}
                <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 border border-gray-800">
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full"></div>
                </div>
            </div>

            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm tracking-wide text-gray-100">{token.symbol}</span>
                    <span className="text-xs text-gray-500 font-medium">{token.name}</span>
                    <Copy className="w-3 h-3 text-gray-600 hover:text-gray-400 cursor-pointer" />
                </div>

                <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium">
                    <span className="text-axiom-green">{token.pairAge}</span>
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Globe className="w-3 h-3" />
                        <Lock className="w-3 h-3" />
                        <Search className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
