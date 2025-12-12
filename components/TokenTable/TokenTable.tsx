'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { Table, TableBody } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector, RootState } from '@/lib/store';
import { setTokens, updateToken } from '@/lib/features/tradeSlice';
import { mockSocket } from '@/services/mockWebSocket';
import { TableHeader } from './TableHeader';
import { TokenTableRow } from './TableRow';
import { TableColumn, Token } from '@/types';
import { Skeleton } from '../ui/skeleton';

const COLUMNS: TableColumn[] = [
    { id: 'name', label: 'Pair Info', sortable: true },
    { id: 'graph', label: '', sortable: false }, // Sparkline placeholder
    { id: 'marketCap', label: 'Market Cap', sortable: true },
    { id: 'liquidity', label: 'Liquidity', sortable: true },
    { id: 'volume', label: 'Volume', sortable: true },
    { id: 'txns', label: 'TXNS', sortable: true }, // Custom sort logic needed later
    { id: 'audit', label: 'Token Info', sortable: false },
    { id: 'holders', label: '', sortable: false }, // Holders column
    { id: 'actions', label: 'Action', sortable: false },
];

export function TokenTable() {
    const dispatch = useAppDispatch();
    const { tokens, loading } = useAppSelector((state: RootState) => state.trade);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        // Connect to WebSocket
        mockSocket.connect();

        const unsubscribe = mockSocket.subscribe((message) => {
            if (message.type === 'INITIAL_DATA') {
                dispatch(setTokens(message.data as Token[]));
            } else if (message.type === 'UPDATE') {
                dispatch(updateToken(message.data as Token));
            }
        });

        return () => {
            unsubscribe();
            mockSocket.disconnect();
        };
    }, [dispatch]);

    // Sorting Logic
    const sortedTokens = useMemo(() => {
        if (!sortColumn) return tokens;

        return [...tokens].sort((a, b) => {
            let aValue = a[sortColumn as keyof Token];
            let bValue = b[sortColumn as keyof Token];

            if (aValue === undefined || bValue === undefined) return 0;

            if (typeof aValue === 'string') aValue = aValue.toLowerCase();
            if (typeof bValue === 'string') bValue = bValue.toLowerCase();

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tokens, sortColumn, sortDirection]);

    const handleSort = (columnId: string) => {
        if (sortColumn === columnId) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnId);
            setSortDirection('desc');
        }
    };

    return (
        <Card className="w-full bg-black/40 border-gray-800 backdrop-blur-sm text-gray-100">
            <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight">Token Trading</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-gray-800">
                    <Table>
                        <TableHeader
                            columns={COLUMNS}
                            currentSort={sortColumn}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                        <TableBody>
                            {loading ? (
                                // Skeleton Loading
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="h-16">
                                        <td colSpan={5} className="p-4">
                                            <Skeleton className="h-8 w-full bg-gray-800" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                sortedTokens.map((token: Token) => (
                                    <TokenTableRow key={token.id} token={token} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
