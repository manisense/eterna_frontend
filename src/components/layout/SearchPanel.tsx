import { memo, useEffect, useRef, useState } from 'react';
import { Search, Clock, TrendingUp, Droplet, Zap, DollarSign, GraduationCap, Rocket, BarChart3, Target } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { closeSearchPanel } from '../../store/slices/uiSlice';

const FILTER_CHIPS = [
  { id: 'pump', label: 'Pump', icon: '🚀' },
  { id: 'bonk', label: 'Bonk', icon: '🔥' },
  { id: 'bags', label: 'Bags', icon: '💰' },
  { id: 'usd1', label: 'USD1', icon: '🪙' },
  { id: 'og-mode', label: 'OG Mode', icon: '💧' },
  { id: 'graduated', label: 'Graduated', icon: '🎓' },
];

export const SearchPanel = memo(() => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['usd1']);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when panel opens
    inputRef.current?.focus();

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeSearchPanel());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeSearchPanel());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-start justify-center pt-20"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Filter Chips and Sort Icons - Above Search */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-900/50">
          <div className="flex items-center gap-1.5 flex-wrap flex-1">
            {FILTER_CHIPS.map((chip) => {
              const isSelected = selectedFilters.includes(chip.id);
              const isUSD1 = chip.id === 'usd1';
              
              return (
                <button
                  key={chip.id}
                  onClick={() => toggleFilter(chip.id)}
                  className={`
                    px-2 py-0.5 rounded text-xs
                    flex items-center gap-1
                    transition-all border
                    ${
                      isSelected && isUSD1
                        ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                        : isSelected
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-800/60 border-gray-700/50 text-gray-400 hover:bg-gray-700/70'
                    }
                  `}
                >
                  <span className="text-xs leading-none">{chip.icon}</span>
                  <span className="text-[11px]">{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort by Section */}
          <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
            <span className="text-[10px] text-gray-500 whitespace-nowrap">Sort by</span>
            <div className="flex items-center gap-1">
              <button className="p-1 bg-gray-800/60 hover:bg-gray-700 border border-gray-700/50 rounded text-gray-400 hover:text-white transition-all">
                <Clock size={12} />
              </button>
              <button className="p-1 bg-gray-800/60 hover:bg-gray-700 border border-gray-700/50 rounded text-gray-400 hover:text-white transition-all">
                <TrendingUp size={12} />
              </button>
              <button className="p-1 bg-gray-800/60 hover:bg-gray-700 border border-gray-700/50 rounded text-gray-400 hover:text-white transition-all">
                <BarChart3 size={12} />
              </button>
              <button className="p-1 bg-gray-800/60 hover:bg-gray-700 border border-gray-700/50 rounded text-gray-400 hover:text-white transition-all">
                <Target size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Input - Middle */}
        <div className="relative px-3 py-2.5 bg-gray-900">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ticker, or CA..."
            className="w-full bg-gray-800/60 border border-gray-700/50 rounded pl-3 pr-14 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-[10px] text-gray-400">
              Esc
            </kbd>
          </div>
        </div>

        {/* History Section - Below Search */}
        <div className="px-3 py-2.5 bg-gray-900/50 border-t border-gray-800/50">
          <div className="text-[10px] text-gray-500 mb-1.5">History</div>
          <div className="min-h-[80px] text-gray-600 text-[11px] flex items-center justify-center">
            <span className="text-gray-600">No recent searches</span>
          </div>
        </div>
      </div>
    </div>
  );
});

SearchPanel.displayName = 'SearchPanel';
