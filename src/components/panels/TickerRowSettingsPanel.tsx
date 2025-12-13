import { memo, useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { closeTickerRowSettingsPanel } from '../../store/slices/uiSlice';

export const TickerRowSettingsPanel = memo(() => {
  const dispatch = useAppDispatch();
  const [quickbuyOption, setQuickbuyOption] = useState<'never' | 'always' | 'hover'>('hover');
  const [showActivePositions, setShowActivePositions] = useState(true);
  const [sortBy, setSortBy] = useState('Price');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = ['Price', 'Market Cap', 'Volume', 'Liquidity', 'Holders'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleClose = () => {
    dispatch(closeTickerRowSettingsPanel());
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-[100]"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-2xl z-[101]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <h2 className="text-white">Ticker Row Settings</h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Show Quickbuy Section */}
          <div>
            <label className="block text-sm text-gray-300 mb-3">Show Quickbuy</label>
            <div className="grid grid-cols-3 gap-3">
              {/* Never Option */}
              <button
                onClick={() => setQuickbuyOption('never')}
                className={`relative p-3 rounded-lg border transition-all ${
                  quickbuyOption === 'never'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-8 bg-gray-700/50 rounded flex items-center justify-center">
                    <div className="w-6 h-3 bg-gray-600 rounded-sm" />
                  </div>
                  <span className="text-xs text-gray-300">Never</span>
                </div>
                {quickbuyOption === 'never' && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>

              {/* Always Option */}
              <button
                onClick={() => setQuickbuyOption('always')}
                className={`relative p-3 rounded-lg border transition-all ${
                  quickbuyOption === 'always'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-8 bg-gray-700/50 rounded flex items-center justify-center">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-2 bg-green-500 rounded-sm" />
                      <div className="w-5 h-2 bg-red-500 rounded-sm" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-300">Always</span>
                </div>
                {quickbuyOption === 'always' && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>

              {/* On Hover Option */}
              <button
                onClick={() => setQuickbuyOption('hover')}
                className={`relative p-3 rounded-lg border transition-all ${
                  quickbuyOption === 'hover'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-8 bg-gray-700/50 rounded flex items-center justify-center relative">
                    <div className="w-6 h-3 bg-gray-600 rounded-sm" />
                    <div className="absolute -top-1 -right-1 flex items-center gap-0.5">
                      <div className="w-3 h-2 bg-green-500/60 rounded-sm" />
                      <div className="w-3 h-2 bg-red-500/60 rounded-sm" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-300">On Hover</span>
                </div>
                {quickbuyOption === 'hover' && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Show Active Positions Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-300">Show Active Positions Market Caps</label>
            <button
              onClick={() => setShowActivePositions(!showActivePositions)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                showActivePositions ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  showActivePositions ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sort Watchlist By Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm text-gray-300 mb-2">Sort Watchlist By</label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600 transition-all"
            >
              <span>{sortBy}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      sortBy === option
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Done Button */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleClose}
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
});

TickerRowSettingsPanel.displayName = 'TickerRowSettingsPanel';
