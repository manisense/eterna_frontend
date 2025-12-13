import { memo, useMemo } from 'react';

interface MiniChartProps {
  data: number[];
  isPositive: boolean;
  width?: number;
  height?: number;
}

export const MiniChart = memo<MiniChartProps>(({
  data,
  isPositive,
  width = 100,
  height = 40,
}) => {
  const pathData = useMemo(() => {
    if (data.length < 2) return '';

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  }, [data, width, height]);

  const color = isPositive ? '#10b981' : '#ef4444';

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${isPositive}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={pathData}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`${pathData} L ${width},${height} L 0,${height} Z`}
        fill={`url(#gradient-${isPositive})`}
      />
    </svg>
  );
});

MiniChart.displayName = 'MiniChart';
