import { memo } from 'react';
import { Settings as SettingsIcon, Star, Activity, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveTab, openTickerRowSettingsPanel } from '../../store/slices/uiSlice';

export const TabBar = memo(() => {
  const dispatch = useAppDispatch();
  const { activeTab, selectedChain } = useAppSelector((state) => state.ui);

  const tabs = [
    { id: 'new-pairs' as const, label: 'New Pairs' },
    { id: 'final-stretch' as const, label: 'Final Stretch' },
    { id: 'migrated' as const, label: 'Migrat...' },
  ];

  // BNB Chain Icon
  const BNBIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 126.61 126.61" fill="currentColor" className={className}>
      <path d="M38.73 53.2l24.59-24.58 24.6 24.6 14.3-14.31L63.32 0 24.43 38.88l14.3 14.32zm-14.31 10.1l-14.3 14.3 14.3 14.31 14.31-14.3-14.31-14.32zm14.31 24.6l24.59 24.6 24.6-24.6 14.31 14.29-38.9 38.91-38.9-38.88-.01-.01 14.31-14.3zm53.19-10.12l14.3-14.3-14.3-14.32-14.31 14.3 14.31 14.32z"/>
      <path d="M77.83 63.3L63.32 48.78 52.59 59.51l-1.24 1.23-2.54 2.54 14.51 14.5 14.51-14.47z"/>
    </svg>
  );

  // Solana Icon
  const SolanaIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 397.7 311.7" fill="currentColor" className={className}>
      <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
      <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
      <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
    </svg>
  );

  return (
    <>
      {/* Mobile Tab Bar - horizontal scrolling */}
      <div className="md:hidden flex-shrink-0 bg-[#0a0a0f] border-b border-gray-800/50">
        <div className="flex items-center gap-1 px-2 py-2 overflow-x-auto scrollbar-hide">
          {/* Filter Icon */}
          <button className="flex-shrink-0 p-2 text-gray-500 hover:text-white">
            <Filter size={18} />
          </button>

          {/* Chain Icon */}
          <button className="flex-shrink-0 p-2">
            {selectedChain === 'BNB' ? (
              <BNBIcon size={18} className="text-yellow-500" />
            ) : (
              <SolanaIcon size={18} className="text-purple-400" />
            )}
          </button>

          {/* Tab Buttons */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`flex-shrink-0 px-3 py-1.5 rounded text-[11px] font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-700/80 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* P1 Badge */}
          <button className="flex-shrink-0 px-2 py-1.5 text-[11px] text-blue-400 font-medium">
            P1
          </button>

          {/* Settings Icon */}
          <button 
            className="flex-shrink-0 p-2 text-gray-500 hover:text-white"
            onClick={() => dispatch(openTickerRowSettingsPanel())}
          >
            <SettingsIcon size={16} />
          </button>
        </div>
      </div>

      {/* Desktop Tab Bar */}
      <div className="hidden md:flex flex-shrink-0 items-center justify-between px-4 py-1.5 bg-[#0a0a0f] border-b border-gray-800/50">
        {/* Left: Icon Controls */}
        <div className="flex items-center gap-2">
          {/* Settings */}
          <button 
            className="p-1.5 text-gray-500 hover:text-white transition-colors"
            onClick={() => dispatch(openTickerRowSettingsPanel())}
          >
            <SettingsIcon size={18} />
          </button>
          
          {/* Watchlist Star */}
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Star size={18} />
          </button>
          
          {/* Active Positions Chart */}
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Activity size={18} />
          </button>
        </div>

        {/* Right: Empty for desktop - columns have their own headers */}
        <div className="flex items-center gap-3">
          {/* Additional controls can go here */}
        </div>
      </div>
    </>
  );
});

TabBar.displayName = 'TabBar';