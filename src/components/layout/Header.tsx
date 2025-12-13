import { memo, useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openSearchPanel, openExchangeModal, openSettingsPanel, openWalletPanel, setSelectedChain } from '../../store/slices/uiSlice';

export const Header = memo(() => {
  const dispatch = useAppDispatch();
  const selectedChain = useAppSelector((state) => state.ui.selectedChain);
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsChainDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    dispatch(openSearchPanel());
  };

  const handleDepositClick = () => {
    dispatch(openExchangeModal('deposit'));
  };

  const handleSettingsClick = () => {
    dispatch(openSettingsPanel());
  };

  const handleWalletClick = () => {
    dispatch(openWalletPanel());
  };

  const handleChainSelect = (chain: 'SOL' | 'BNB') => {
    dispatch(setSelectedChain(chain));
    setIsChainDropdownOpen(false);
  };

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
    <header className="flex-shrink-0 sticky top-0 z-50 bg-[#0a0a0f] border-b border-gray-800/50">
      <div className="flex items-center justify-between px-3 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <span className="text-white text-sm font-medium hidden sm:inline">axiom</span>
        </div>
        
        {/* Desktop Nav - hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-5">
          <a href="#" className="text-[13px] text-gray-500 hover:text-white transition-colors">Discover</a>
          <a href="#" className="text-[13px] text-white font-medium">Pulse</a>
          <a href="#" className="text-[13px] text-gray-500 hover:text-white transition-colors">Trackers</a>
          <a href="#" className="text-[13px] text-gray-500 hover:text-white transition-colors">Perpetuals</a>
          <a href="#" className="text-[13px] text-gray-500 hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="text-[13px] text-gray-500 hover:text-white transition-colors">Rewards</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Header */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={handleWalletClick}
              className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/80 rounded text-[11px]"
            >
              <BNBIcon size={14} className="text-yellow-500" />
              <span className="text-white">0</span>
            </button>
            
            <button 
              onClick={handleWalletClick}
              className="flex items-center gap-1.5 px-2 py-1 bg-gray-800/80 rounded text-[11px]"
            >
              <SolanaIcon size={14} className="text-gray-400" />
              <span className="text-white">0</span>
            </button>
            
            <button className="p-1.5 text-gray-400 hover:text-white" onClick={handleSearchClick}>
              <Search size={18} />
            </button>
            
            <button className="p-1.5 text-gray-400 hover:text-white">
              <Menu size={18} />
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            <button 
              className="p-2 text-gray-500 hover:text-white transition-colors" 
              onClick={handleSearchClick}
            >
              <Search size={18} />
            </button>
            
            {/* Chain Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-colors"
                onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
              >
                {selectedChain === 'BNB' ? (
                  <BNBIcon size={16} className="text-yellow-500" />
                ) : (
                  <SolanaIcon size={16} className="text-purple-400" />
                )}
                <span className="text-[12px] text-gray-300">{selectedChain}</span>
                <ChevronDown size={14} className="text-gray-500" />
              </button>
              
              {isChainDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-36 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-[60]">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                      selectedChain === 'SOL' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => handleChainSelect('SOL')}
                  >
                    <SolanaIcon size={18} className="text-purple-400" />
                    <span>Solana</span>
                  </button>
                  
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                      selectedChain === 'BNB' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => handleChainSelect('BNB')}
                  >
                    <BNBIcon size={18} className="text-yellow-500" />
                    <span>BNB</span>
                  </button>
                </div>
              )}
            </div>

            {/* Deposit Button */}
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-500 text-white text-[12px] px-4 py-1.5 rounded-lg font-medium" 
              onClick={handleDepositClick}
            >
              Deposit
            </Button>

            {/* Wallet indicators */}
            <button 
              onClick={handleWalletClick}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-colors"
            >
              <span className="text-[12px] text-gray-400">0</span>
            </button>

            <button 
              onClick={handleWalletClick}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-colors"
            >
              <span className="text-[12px] text-gray-400">0</span>
            </button>

            {/* Profile Icon */}
            <button 
              className="w-8 h-8 bg-gray-800/60 hover:bg-gray-700/60 rounded-full flex items-center justify-center transition-colors" 
              onClick={handleSettingsClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';