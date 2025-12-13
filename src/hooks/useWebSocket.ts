import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './';
import { updateTokenPrice } from '../store/slices/tokensSlice';

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Mock WebSocket with interval-based updates
    intervalRef.current = setInterval(() => {
      if (tokens.length > 0) {
        // Randomly select 2-3 tokens to update
        const numUpdates = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numUpdates; i++) {
          const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
          const currentPrice = randomToken.tokenInfo.price;
          
          // Generate price change between -5% to +5%
          const changePercent = (Math.random() * 10 - 5);
          const newPrice = currentPrice * (1 + changePercent / 100);
          const direction = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral';

          dispatch(updateTokenPrice({
            id: randomToken.id,
            price: newPrice,
            priceChange: changePercent,
            direction,
          }));
        }
      }
    }, 2000); // Update every 2 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens, dispatch]);
};
