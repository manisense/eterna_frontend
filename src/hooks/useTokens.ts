import { useQuery } from '@tanstack/react-query';
import { TokenData } from '../store/slices/tokensSlice';
import { generateMockTokens } from '../utils/mockData';

export const useTokens = (category?: string) => {
  return useQuery<TokenData[], Error>({
    queryKey: ['tokens', category],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return generateMockTokens(category);
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};
