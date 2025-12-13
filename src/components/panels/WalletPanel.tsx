import { memo, useEffect, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { closeWalletPanel, openExchangeModal } from '../../store/slices/uiSlice';

export const WalletPanel = memo(() => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'total' | 'solana' | 'perps'>('total');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeWalletPanel());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeWalletPanel());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleDeposit = () => {
    dispatch(closeWalletPanel());
    dispatch(openExchangeModal('deposit'));
  };

  return (
    <div
      className="fixed inset-0 bg-transparent z-50"
      onClick={handleBackdropClick}
    >
      <div className="absolute top-16 right-4 w-[500px] bg-gray-900/95 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Header Tabs */}
        <div className="flex items-center border-b border-gray-800">
          <button
            onClick={() => setActiveTab('total')}
            className={`flex-1 px-6 py-4 text-sm transition-colors ${
              activeTab === 'total'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Total Value
          </button>
          <button
            onClick={() => setActiveTab('solana')}
            className={`flex-1 px-6 py-4 text-sm transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'solana'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 397.7 311.7" fill="currentColor" className="text-purple-400">
              <path fill="currentColor" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
              <path fill="currentColor" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
              <path fill="currentColor" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
            </svg>
            Solana
          </button>
          <button
            onClick={() => setActiveTab('perps')}
            className={`flex-1 px-6 py-4 text-sm transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'perps'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-blue-400">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Perps
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Total Value */}
          <div className="text-center mb-6">
            <div className="text-4xl text-white mb-6">$0</div>
          </div>

          {/* Balance Display */}
          <div className="flex items-center justify-center gap-8 mb-6 py-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 397.7 311.7" fill="currentColor" className="text-purple-400">
                <path fill="currentColor" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
                <path fill="currentColor" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
                <path fill="currentColor" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
              </svg>
              <span className="text-2xl text-white">0</span>
            </div>

            <ArrowLeftRight size={20} className="text-gray-600" />

            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.2"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="text-2xl text-white">0</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDeposit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm transition-colors"
            >
              Deposit
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg text-sm transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

WalletPanel.displayName = 'WalletPanel';
