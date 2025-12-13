import { memo } from 'react';
import { Flame, Clock, CheckCircle, ChevronDown, Settings } from 'lucide-react';

interface ColumnHeaderProps {
  title: string;
  count: number;
  color: string;
}

const getIconByTitle = (title: string) => {
  switch (title) {
    case 'New Pairs':
      return <Flame size={14} className="text-blue-400" />;
    case 'Final Stretch':
      return <Clock size={14} className="text-orange-400" />;
    case 'Migrated':
      return <CheckCircle size={14} className="text-green-400" />;
    default:
      return null;
  }
};

const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    green: 'text-green-400',
  };
  return colorMap[color] || 'text-blue-400';
};

export const ColumnHeader = memo<ColumnHeaderProps>(({ title, count, color }) => {
  const colorClass = getColorClass(color);
  const icon = getIconByTitle(title);

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#0d0d14] border-b border-gray-800/30">
      {/* Left: Title, Count, and Controls */}
      <div className="flex items-center gap-2">
        {/* Icon */}
        {icon}
        
        {/* Title */}
        <span className="text-[13px] text-white font-medium">{title}</span>
        
        {/* Count Badge */}
        <span className={`text-[12px] ${colorClass}`}>{count}</span>
        
        {/* Sort Arrow */}
        <button className="p-0.5 text-gray-500 hover:text-white transition-colors">
          <ChevronDown size={14} />
        </button>
        
        {/* Number indicator */}
        <span className="text-[11px] text-gray-500">0</span>
        
        {/* Settings/Filter */}
        <button className="p-0.5 text-gray-500 hover:text-white transition-colors">
          <Settings size={12} />
        </button>
      </div>

      {/* Right: P1, P2, P3 Badges */}
      <div className="flex items-center gap-1">
        <button className="px-1.5 py-0.5 text-[10px] text-blue-400 hover:bg-gray-800 rounded transition-colors font-medium">
          P1
        </button>
        <button className="px-1.5 py-0.5 text-[10px] text-pink-400 hover:bg-gray-800 rounded transition-colors font-medium">
          P2
        </button>
        <button className="px-1.5 py-0.5 text-[10px] text-purple-400 hover:bg-gray-800 rounded transition-colors font-medium">
          P3
        </button>
        
        {/* Settings Icon */}
        <button className="p-1 text-gray-500 hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>
    </div>
  );
});

ColumnHeader.displayName = 'ColumnHeader';