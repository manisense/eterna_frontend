import { memo, useCallback } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { TokenData } from '../../store/slices/tokensSlice';
import { TokenRow } from './TokenRow';
import { TokenTableSkeleton } from './TokenTableSkeleton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortBy } from '../../store/slices/tokensSlice';
import { openModal } from '../../store/slices/uiSlice';

interface TokenTableProps {
  tokens: TokenData[];
  isLoading?: boolean;
}

export const TokenTable = memo<TokenTableProps>(({ tokens, isLoading = false }) => {
  const dispatch = useAppDispatch();
  const { sortBy, sortDirection } = useAppSelector((state) => state.tokens);

  const handleSort = useCallback((field: string) => {
    dispatch(setSortBy(field));
  }, [dispatch]);

  const handleBuyClick = useCallback((tokenId: string) => {
    dispatch(openModal({ type: 'buy', tokenId }));
  }, [dispatch]);

  const sortedTokens = [...tokens].sort((a, b) => {
    if (!sortBy) return 0;

    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'marketCap':
        aValue = a.marketCap;
        bValue = b.marketCap;
        break;
      case 'liquidity':
        aValue = a.liquidity;
        bValue = b.liquidity;
        break;
      case 'volume':
        aValue = a.volume;
        bValue = b.volume;
        break;
      case 'txns':
        aValue = a.txns.total;
        bValue = b.txns.total;
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const SortButton = ({ field, label }: { field: string; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
    >
      {label}
      {sortBy === field ? (
        sortDirection === 'asc' ? (
          <ArrowUp size={12} />
        ) : (
          <ArrowDown size={12} />
        )
      ) : (
        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" />
      )}
    </button>
  );

  if (isLoading) {
    return <TokenTableSkeleton />;
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-2 text-xs text-gray-500 border-b border-gray-800">
        <div className="min-w-[180px] group">
          <SortButton field="name" label="Pair Info" />
        </div>
        <div className="min-w-[140px] group">
          <SortButton field="marketCap" label="Market Cap" />
        </div>
        <div className="min-w-[80px] text-center group">
          <SortButton field="liquidity" label="Liquidity" />
        </div>
        <div className="min-w-[80px] text-center group">
          <SortButton field="volume" label="Volume" />
        </div>
        <div className="min-w-[100px] text-center group">
          <SortButton field="txns" label="TXNS" />
        </div>
        <div className="min-w-[120px] text-center">
          <span>Token Info</span>
        </div>
        <div className="min-w-[100px] text-center">
          <span>Price Change</span>
        </div>
        <div className="min-w-[80px] text-center">
          <span>Action</span>
        </div>
      </div>

      {/* Rows */}
      {sortedTokens.map((token) => (
        <TokenRow key={token.id} token={token} onBuyClick={handleBuyClick} />
      ))}

      {sortedTokens.length === 0 && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          No tokens found
        </div>
      )}
    </div>
  );
});

TokenTable.displayName = 'TokenTable';
