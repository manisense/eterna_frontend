import { Token, WebSocketMessage } from "@/types";

type Listener = (message: WebSocketMessage) => void;

const MOCK_TOKENS: Token[] = [
    {
        id: "1",
        name: "Nebula",
        symbol: "NEB",
        price: 1.23,
        change24h: 5.4,
        volume24h: 1200000,
        marketCap: 5000000,
        holders: 1200,
        status: "new",
        launchDate: new Date().toISOString(),
        liquidity: 450000,
        txns: 245,
        buys: 156,
        sells: 89,
        auditScore: 98,
        isAudited: true,
        pairAge: "2m",
    },
    {
        id: "2",
        name: "Quasar",
        symbol: "QSR",
        price: 0.85,
        change24h: -2.1,
        volume24h: 800000,
        marketCap: 3500000,
        holders: 900,
        status: "new",
        launchDate: new Date().toISOString(),
        liquidity: 200000,
        txns: 120,
        buys: 40,
        sells: 80,
        auditScore: 75,
        isAudited: false,
        pairAge: "45m",
    },
    {
        id: "3",
        name: "Pulsar",
        symbol: "PUL",
        price: 12.50,
        change24h: 12.8,
        volume24h: 5000000,
        marketCap: 50000000,
        holders: 5000,
        status: "final_stretch",
        launchDate: new Date().toISOString(),
        liquidity: 2000000,
        txns: 1500,
        buys: 1200,
        sells: 300,
        auditScore: 100,
        isAudited: true,
        pairAge: "1d",
    },
    {
        id: "4",
        name: "Vortex",
        symbol: "VTX",
        price: 0.05,
        change24h: 0.5,
        volume24h: 100000,
        marketCap: 200000,
        holders: 300,
        status: "migrated",
        launchDate: new Date().toISOString(),
        liquidity: 50000,
        txns: 50,
        buys: 25,
        sells: 25,
        auditScore: 60,
        isAudited: false,
        pairAge: "5m",
    },
    {
        id: "5",
        name: "Aether",
        symbol: "AET",
        price: 4.20,
        change24h: 1.2,
        volume24h: 950000,
        marketCap: 4200000,
        holders: 1500,
        status: "new",
        launchDate: new Date().toISOString(),
        liquidity: 300000,
        txns: 200,
        buys: 110,
        sells: 90,
        auditScore: 92,
        isAudited: true,
        pairAge: "3h",
    },
];

export class MockWebSocketService {
    private listeners: Listener[] = [];
    private intervalId: NodeJS.Timeout | null = null;

    constructor() { }

    connect() {
        console.log("Mock WebSocket Connected");
        // Simulate initial data load
        setTimeout(() => {
            this.emit({ type: "INITIAL_DATA", data: MOCK_TOKENS });
        }, 500);

        // Start emitting updates
        this.startUpdates();
    }

    disconnect() {
        console.log("Mock WebSocket Disconnected");
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private emit(message: WebSocketMessage) {
        this.listeners.forEach((listener) => listener(message));
    }

    private startUpdates() {
        this.intervalId = setInterval(() => {
            // Pick a random token to update
            const randomTokenIndex = Math.floor(Math.random() * MOCK_TOKENS.length);
            const token = { ...MOCK_TOKENS[randomTokenIndex] };

            // Random price change between -1% and +1%
            const changePercent = (Math.random() - 0.5) * 0.02;
            token.price = token.price * (1 + changePercent);
            token.change24h += changePercent * 100; // Simplified

            // Update the source array too so consistent state
            MOCK_TOKENS[randomTokenIndex] = token;

            this.emit({ type: "UPDATE", data: token });
        }, 2000); // 2 seconds per update
    }
}

export const mockSocket = new MockWebSocketService();
