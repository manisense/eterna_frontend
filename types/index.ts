export interface Token {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    holders: number;
    image?: string;
    status: 'new' | 'final_stretch' | 'migrated'; // Columns mentioned in requirements
    launchDate: string;
    // New Fields
    liquidity: number;
    txns: number;
    buys: number;
    sells: number;
    auditScore: number;
    isAudited: boolean;
    pairAge: string; // e.g., "2m", "1d"
}

export interface WebSocketMessage {
    type: 'UPDATE' | 'INITIAL_DATA';
    data: Token | Token[];
}

export type TokenStatus = Token['status'];

export interface TableColumn {
    id: string;
    label: string;
    sortable: boolean;
}
