import { memo, useCallback } from 'react';
import { TokenData } from '../../store/slices/tokensSlice';
import { TokenRow } from './TokenRow';
import { ColumnHeader } from './ColumnHeader';
import { Skeleton } from '../ui/skeleton';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/slices/uiSlice';

interface TokenColumnProps {
  title: string;
  tokens: TokenData[];
  color: string;
  isLoading?: boolean;
  className?: string;
}

const ColumnSkeleton = memo(() => (
  <div className="space-y-2 p-2">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="p-3 bg-[#0d0d14] rounded-lg border border-gray-800/20 space-y-3">
        <div className="flex gap-3">
          <Skeleton variant="rectangular" width={80} height={80} className="rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <Skeleton width="50%" height={14} />
              <Skeleton width="25%" height={14} />
            </div>
            <Skeleton width="70%" height={12} />
            <Skeleton width="90%" height={10} />
            <div className="flex gap-1">
              <Skeleton width={40} height={16} className="rounded" />
              <Skeleton width={50} height={16} className="rounded" />
              <Skeleton width={35} height={16} className="rounded" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
));

ColumnSkeleton.displayName = 'ColumnSkeleton';

export const TokenColumn = memo<TokenColumnProps>(({ title, tokens, color, isLoading = false, className = '' }) => {
  const dispatch = useAppDispatch();

  const handleBuyClick = useCallback((tokenId: string) => {
    dispatch(openModal({ type: 'buy', tokenId }));
  }, [dispatch]);

  return (
    <div className={`flex flex-col h-full bg-[#08080c] border-r border-gray-800/30 last:border-r-0 overflow-hidden ${className}`}>
      <ColumnHeader title={title} count={tokens.length} color={color} />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {isLoading ? (
          <ColumnSkeleton />
        ) : (
          <div className="p-2">
            {tokens.map((token) => (
              <TokenRow key={token.id} token={token} onBuyClick={handleBuyClick} />
            ))}
            
            {tokens.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">
                No tokens found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

TokenColumn.displayName = 'TokenColumn';