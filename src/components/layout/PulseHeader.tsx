import { memo } from 'react';
import { ChevronDown, Filter, Grid, Bookmark, Volume2, LayoutGrid } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedChain } from '../../store/slices/uiSlice';

export const PulseHeader = memo(() => {
  const dispatch = useAppDispatch();
  const selectedChain = useAppSelector((state) => state.ui.selectedChain);

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
    <div className="hidden md:flex flex-shrink-0 items-center justify-between px-4 py-2 bg-[#0a0a0f] border-b border-gray-800/50">
      {/* Left: Pulse Logo & Chain Icons */}
      <div className="flex items-center gap-3">
        {/* Pulse Text with filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-500" />
          <span className="text-[13px] text-white font-medium">Pulse</span>
        </div>

        {/* Chain Selector Buttons */}
        <div className="flex items-center gap-1 bg-gray-800/40 rounded-lg p-0.5">
          <button 
            className={`p-1.5 rounded transition-all ${
              selectedChain === 'SOL' 
                ? 'bg-gray-700 text-purple-400' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => dispatch(setSelectedChain('SOL'))}
            title="Solana"
          >
            <SolanaIcon size={16} />
          </button>
          
          <button 
            className={`p-1.5 rounded transition-all ${
              selectedChain === 'BNB' 
                ? 'bg-gray-700 text-yellow-500' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => dispatch(setSelectedChain('BNB'))}
            title="BNB Chain"
          >
            <BNBIcon size={16} />
          </button>
        </div>
      </div>

      {/* Right: Display & Controls */}
      <div className="flex items-center gap-2">
        {/* Display Dropdown */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/40 hover:bg-gray-700/40 rounded-lg transition-colors">
          <LayoutGrid size={14} className="text-gray-400" />
          <span className="text-[12px] text-gray-300">Display</span>
          <ChevronDown size={12} className="text-gray-500" />
        </button>

        {/* Bookmark */}
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <Bookmark size={16} />
        </button>

        {/* Sound */}
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <Volume2 size={16} />
        </button>

        {/* Grid View */}
        <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
          <Grid size={16} />
        </button>

        {/* Activity/Pulse Icon */}
        <button className="p-1.5 text-blue-400 hover:text-blue-300 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
});

PulseHeader.displayName = 'PulseHeader';