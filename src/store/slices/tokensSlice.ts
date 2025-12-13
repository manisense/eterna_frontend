import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TokenData {
  id: string;
  name: string;
  ticker: string;
  icon: string;
  marketCap: number;
  marketCapChange: number;
  liquidity: number;
  volume: number;
  txns: {
    buys: number;
    sells: number;
    total: number;
  };
  tokenInfo: {
    holders: number;
    holdersChange: number;
    marketCap24h: number;
    liquidity24h: number;
    volume24h: number;
    price: number;
    priceChange: number;
  };
  chartData: number[];
  socials: {
    twitter?: string;
    website?: string;
    telegram?: string;
  };
  hasTwitter: boolean;
  hasWebsite: boolean;
  hasTelegram: boolean;
  isVerified: boolean;
  category: 'new-pairs' | 'final-stretch' | 'migrated';
  chain: 'SOL' | 'BNB';
  lastUpdate: number;
  priceDirection?: 'up' | 'down' | 'neutral';
}

interface TokensState {
  tokens: TokenData[];
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  isLoading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  tokens: [],
  sortBy: null,
  sortDirection: 'desc',
  isLoading: false,
  error: null,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenData[]>) => {
      state.tokens = action.payload;
      state.isLoading = false;
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number; priceChange: number; direction: 'up' | 'down' | 'neutral' }>) => {
      const token = state.tokens.find((t) => t.id === action.payload.id);
      if (token) {
        token.tokenInfo.price = action.payload.price;
        token.tokenInfo.priceChange = action.payload.priceChange;
        token.priceDirection = action.payload.direction;
        token.lastUpdate = Date.now();
      }
    },
    updateTokenMetrics: (state, action: PayloadAction<{ id: string; updates: Partial<TokenData> }>) => {
      const token = state.tokens.find((t) => t.id === action.payload.id);
      if (token) {
        Object.assign(token, action.payload.updates);
        token.lastUpdate = Date.now();
      }
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      if (state.sortBy === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortDirection = 'desc';
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setTokens,
  updateTokenPrice,
  updateTokenMetrics,
  setSortBy,
  setLoading,
  setError,
} = tokensSlice.actions;

export default tokensSlice.reducer;