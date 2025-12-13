import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';

export const TokenTableSkeleton = memo(() => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg"
        >
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height={16} />
            <Skeleton width="40%" height={14} />
          </div>
          <Skeleton width={100} height={40} />
          <Skeleton width={80} height={32} />
          <Skeleton width={80} height={32} />
          <Skeleton width={60} height={32} />
          <Skeleton width={100} height={32} />
          <Skeleton width={70} height={36} />
        </div>
      ))}
    </div>
  );
});

TokenTableSkeleton.displayName = 'TokenTableSkeleton';
