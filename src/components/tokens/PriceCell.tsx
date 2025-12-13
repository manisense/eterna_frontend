import { memo, useEffect, useState } from 'react';
import { formatPercentage, getColorClass } from '../../utils/formatters';

interface PriceCellProps {
  value: number;
  change: number;
  direction?: 'up' | 'down' | 'neutral';
  lastUpdate: number;
}

export const PriceCell = memo<PriceCellProps>(({
  value,
  change,
  direction = 'neutral',
  lastUpdate,
}) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (direction !== 'neutral') {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [lastUpdate, direction]);

  const bgColor = direction === 'up'
    ? 'bg-green-500/20'
    : direction === 'down'
    ? 'bg-red-500/20'
    : 'transparent';

  return (
    <div
      className={`transition-all duration-300 ${
        isFlashing ? bgColor : ''
      }`}
    >
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">Price Change</span>
        <span className={`text-sm ${getColorClass(change)} transition-colors duration-300`}>
          {formatPercentage(change)}
        </span>
      </div>
    </div>
  );
});

PriceCell.displayName = 'PriceCell';