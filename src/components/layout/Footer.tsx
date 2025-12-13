import { memo } from 'react';
import { SlidersHorizontal, TrendingUp, Activity, User, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openTradingSettings, openWalletManagerPanel } from '../../store/slices/uiSlice';

export const Footer = memo(() => {
  const dispatch = useAppDispatch();
  const activePreset = useAppSelector((state) => state.ui.activePreset);

  // Solana Icon
  const SolanaIcon = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 397.7 311.7" fill="currentColor" className={className}>
      <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
      <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
      <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
    </svg>
  );

  return (
    <footer className="shrink-0 sticky bottom-0 z-50 bg-[#0a0a0f] border-t border-gray-800/50">
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden flex items-center justify-around px-2 py-3 bg-[#0a0a0f]">
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
          <TrendingUp size={20} />
          <span className="text-[10px]">Trending</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
          <Activity size={20} />
          <span className="text-[10px]">Track</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-blue-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span className="text-[10px]">Pulse</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span className="text-[10px]">Perpetuals</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
          <User size={20} />
          <span className="text-[10px]">Account</span>
        </button>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:flex items-center justify-between px-4 py-2">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Preset Button */}
          <button 
            onClick={() => dispatch(openTradingSettings(activePreset))}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg text-[11px] text-white transition-colors"
          >
            <SlidersHorizontal size={14} className="text-blue-400" />
            <span>PRESET {activePreset}</span>
          </button>

          {/* Wallet/Chain Group */}
          <button 
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg text-[11px] transition-colors"
            onClick={() => dispatch(openWalletManagerPanel())}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
            </svg>
            <span className="text-white">1</span>
            <SolanaIcon size={14} className="text-gray-400" />
            <span className="text-white">0</span>
            <ChevronDown size={12} className="text-gray-500" />
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-700"></div>

          {/* Twitter Link */}
          <button className="flex items-center gap-1.5 px-2 py-1 text-gray-400 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>

          {/* Discord Link */}
          <button className="flex items-center gap-1.5 px-2 py-1 text-gray-400 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </button>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-3">
          {/* Connection Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/40 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-[11px] text-gray-300">Connection is stable</span>
          </div>

          {/* Global Dropdown */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/40 hover:bg-gray-700/40 rounded-lg transition-colors">
            <span className="text-[11px] text-white font-medium">GLOBAL</span>
            <ChevronDown size={12} className="text-gray-500" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Docs Link */}
          <button className="px-3 py-1.5 text-[11px] text-gray-400 hover:text-white transition-colors">
            Docs
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
