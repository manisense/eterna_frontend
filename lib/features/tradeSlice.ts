import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token, WebSocketMessage } from '@/types'

interface TradeState {
    tokens: Token[];
    loading: boolean;
    error: string | null;
}

const initialState: TradeState = {
    tokens: [],
    loading: true,
    error: null,
}

const tradeSlice = createSlice({
    name: 'trade',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Token[]>) => {
            state.tokens = action.payload;
            state.loading = false;
        },
        updateToken: (state, action: PayloadAction<Token>) => {
            const index = state.tokens.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tokens[index] = action.payload;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
})

export const { setTokens, updateToken, setLoading } = tradeSlice.actions
export default tradeSlice.reducer
