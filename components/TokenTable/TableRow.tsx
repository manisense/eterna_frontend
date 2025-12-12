'use client'

import React, { memo, useRef, useEffect, useState } from 'react';
import { TableRow as ShadcnTableRow, TableCell } from "@/components/ui/table"
import { Token } from '@/types';
import { TokenCell } from './TokenCell';
import { TokenInfoCell, TxnsCell } from './Cells';
import { Sparkline } from '@/components/ui/sparkline';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

interface TableRowProps {
    token: Token;
}

const TokenTableRowComponent: React.FC<TableRowProps> = ({ token }) => {
    // Generate static sparkline data based on token properties to avoid random re-renders
    const sparklineData = React.useMemo(() => {
        const data = [];
        let val = token.price;
        // Use token ID as seed for pseudo-randomness consistency
        const seed = token.id.charCodeAt(0);

        for (let i = 0; i < 20; i++) {
            // Deterministic variation
            const variation = Math.sin(seed + i) * 0.05;
            val = val * (1 + variation);
            data.push(val);
        }
        return data;
    }, [token.price, token.id]);

    const isPositive = token.change24h >= 0;

    return (
        <ShadcnTableRow className="hover:bg-muted/50 cursor-pointer border-gray-800 h-[72px]">
            {/* Pair Info */}
            <TableCell className="w-[300px]">
                <TokenCell token={token} />
            </TableCell>

            {/* Sparkline (merged visually or separate column?) - Design shows it separate */}
            <TableCell className="w-[120px]">
                <Sparkline
                    data={sparklineData}
                    color={isPositive ? "#22c55e" : "#ef4444"}
                    width={100}
                    height={36}
                />
            </TableCell>

            {/* Market Cap */}
            <TableCell className="text-left w-[120px]">
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-100">${(token.marketCap / 1000).toFixed(1)}K</span>
                    <span className={cn("text-xs font-medium", isPositive ? "text-axiom-green" : "text-axiom-red")}>
                        {isPositive ? "+" : ""}{token.change24h.toFixed(2)}%
                    </span>
                </div>
            </TableCell>

            {/* Liquidity */}
            <TableCell className="text-left font-medium text-sm text-gray-100 w-[100px]">
                ${(token.liquidity / 1000).toFixed(1)}K
            </TableCell>

            {/* Volume */}
            <TableCell className="text-left font-medium text-sm text-gray-100 w-[100px]">
                ${(token.volume24h / 1000).toFixed(1)}K
            </TableCell>

            {/* TXNS */}
            <TableCell className="w-[100px]">
                <TxnsCell buys={token.buys} sells={token.sells} txns={token.txns} />
            </TableCell>

            {/* Token Info */}
            <TableCell className="w-[180px]">
                <TokenInfoCell token={token} />
            </TableCell>

            {/* Audit / Holders / Socials Column (Simplifying into specific metrics) - Using Grid */}
            <TableCell className="w-[100px]">
                <div className="flex flex-col gap-1 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        123
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px]">0</span> {token.holders}
                    </div>
                </div>
            </TableCell>


            {/* Action */}
            <TableCell className="text-right">
                <Button
                    className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold h-8 px-5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                >
                    Buy
                </Button>
            </TableCell>
        </ShadcnTableRow>
    );
};

export const TokenTableRow = memo(TokenTableRowComponent);
