/**
 * Format large numbers with K, M, B suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
};

/**
 * Format percentage with sign and color indication
 */
export const formatPercentage = (num: number, showSign = true): string => {
  const sign = num > 0 && showSign ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
};

/**
 * Get color class based on value
 */
export const getColorClass = (value: number, type: 'text' | 'bg' = 'text'): string => {
  if (value > 0) {
    return type === 'text' ? 'text-green-500' : 'bg-green-500/20';
  }
  if (value < 0) {
    return type === 'text' ? 'text-red-500' : 'bg-red-500/20';
  }
  return type === 'text' ? 'text-gray-400' : 'bg-gray-500/20';
};

/**
 * Format compact numbers for display
 */
export const formatCompact = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toFixed(0);
};
