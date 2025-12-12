'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Token } from '@/types';
import { User, ShieldCheck, Lock } from 'lucide-react';

interface TokenInfoCellProps {
    token: Token;
}

export const TokenInfoCell: React.FC<TokenInfoCellProps> = ({ token }) => {
    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-max">
            {/* Audit Score (Top Left) */}
            <div className="flex items-center gap-1.5 text-xs text-red-400">
                <ShieldCheck className="w-3 h-3" />
                <span className="font-medium">{token.auditScore}%</span>
            </div>

            {/* Liquidity Lock (Top Right) */}
            <div className="flex items-center gap-1.5 text-xs text-green-400">
                <Lock className="w-3 h-3" />
                <span className="font-medium">1.94%</span> {/* Mocked */}
            </div>

            {/* No Mint (Bottom Left) */}
            <div className="flex items-center gap-1.5 text-xs text-axiom-green">
                <div className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">M</div>
                <span className="font-medium">0%</span>
            </div>

            {/* Top 10 Holders (Bottom Right) */}
            <div className="flex items-center gap-1.5 text-xs text-red-400">
                <div className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">T</div>
                <span className="font-medium">26.2%</span>
            </div>
        </div>
    )
}

interface TxnsCellProps {
    buys: number;
    sells: number;
    txns: number;
}

export const TxnsCell: React.FC<TxnsCellProps> = ({ buys, sells, txns }) => {
    return (
        <div className="flex flex-col items-start gap-1">
            <span className="font-medium text-sm text-gray-200">{txns}</span>
            <div className="flex items-center gap-1 text-xs font-medium">
                <span className="text-axiom-green">{buys}</span>
                <span className="text-gray-600">/</span>
                <span className="text-axiom-red">{sells}</span>
            </div>
        </div>
    )
}
