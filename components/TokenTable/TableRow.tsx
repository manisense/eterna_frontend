'use client'

import React, { memo, useEffect, useState, useRef } from 'react';
import { TableRow as ShadcnTableRow, TableCell } from "@/components/ui/table"
import { Token } from '@/types';
import { PriceCell, TokenCell } from './TokenCell';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';

interface TableRowProps {
    token: Token;
}

const TokenTableRowComponent: React.FC<TableRowProps> = ({ token }) => {
    const prevPriceRef = useRef(token.price);
    const [flashClass, setFlashClass] = useState('');

    useEffect(() => {
        if (token.price > prevPriceRef.current) {
            setFlashClass('bg-green-500/10 transition-colors duration-500');
            const timer = setTimeout(() => setFlashClass(''), 1000);
            return () => clearTimeout(timer);
        } else if (token.price < prevPriceRef.current) {
            setFlashClass('bg-red-500/10 transition-colors duration-500');
            const timer = setTimeout(() => setFlashClass(''), 1000);
            return () => clearTimeout(timer);
        }
        prevPriceRef.current = token.price;
    }, [token.price]);

    return (
        <ShadcnTableRow className={cn("hover:bg-muted/50 cursor-pointer border-gray-800", flashClass)}>
            {/* Token Info */}
            <TableCell className="font-medium">
                <TokenCell token={token} />
            </TableCell>

            {/* Price Info */}
            <TableCell className="text-right">
                <PriceCell price={token.price} change24h={token.change24h} />
            </TableCell>

            {/* Volume */}
            <TableCell className="text-right text-muted-foreground hidden sm:table-cell">
                ${(token.volume24h / 1000).toFixed(1)}k
            </TableCell>

            {/* Market Cap */}
            <TableCell className="text-right text-muted-foreground hidden md:table-cell">
                ${(token.marketCap / 1000000).toFixed(2)}M
            </TableCell>

            {/* Action (e.g., Favorite/Trade) */}
            <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-yellow-400">
                    <Star className="h-4 w-4" />
                </Button>
            </TableCell>
        </ShadcnTableRow>
    );
};

// Memoize to prevent re-renders unless token data changes
export const TokenTableRow = memo(TokenTableRowComponent);
