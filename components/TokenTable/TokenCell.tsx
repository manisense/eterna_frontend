'use client'

import React from 'react';
import { Token } from '@/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TokenCellProps {
    token: Token;
}

export const TokenCell: React.FC<TokenCellProps> = ({ token }) => {
    return (
        <div className="flex items-center gap-3">
            {/* Placeholder for token icon if image is missing */}
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400 overflow-hidden relative">
                {token.image ? (
                    <Image src={token.image} alt={token.name} fill className="object-cover" />
                ) : (
                    token.symbol.substring(0, 1)
                )}
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{token.name}</span>
                <span className="text-xs text-muted-foreground">{token.symbol}</span>
            </div>
        </div>
    );
};

interface PriceCellProps {
    price: number;
    change24h: number;
}

export const PriceCell: React.FC<PriceCellProps> = ({ price, change24h }) => {
    const isPositive = change24h >= 0;

    return (
        <div className="flex flex-col items-end">
            {/* Format price: if < 1 use 4 decimals, else 2 */}
            <span className="font-medium text-sm">
                ${price < 1 ? price.toFixed(4) : price.toFixed(2)}
            </span>
            <span className={cn("text-xs", isPositive ? "text-green-500" : "text-red-500")}>
                {isPositive ? "+" : ""}{change24h.toFixed(2)}%
            </span>
        </div>
    )
}
