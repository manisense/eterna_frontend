import { memo, useEffect, useState } from 'react';
import { X, ArrowUpDown, Copy, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeExchangeModal } from '../../store/slices/uiSlice';

export const ExchangeModal = memo(() => {
  const dispatch = useAppDispatch();
  const exchangeTab = useAppSelector((state) => state.ui.exchangeTab);
  
  const [activeTab, setActiveTab] = useState<'convert' | 'deposit' | 'buy'>(exchangeTab);
  const [convertingAmount, setConvertingAmount] = useState('0.0');
  const [gainingAmount, setGainingAmount] = useState('0.0');
  const [buyingAmount, setBuyingAmount] = useState('0.0');

  useEffect(() => {
    setActiveTab(exchangeTab);
  }, [exchangeTab]);

  useEffect(() => {
    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeExchangeModal());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeExchangeModal());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const depositAddress = 'bc6rJPc8tHywgnYCahMJM8WKg8BSEFYOBMUY8C1RRv';

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xl bg-gray-900/95 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl text-white">Exchange</h2>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 px-6 pt-6">
          <button
            onClick={() => setActiveTab('convert')}
            className={`
              flex-1 px-6 py-3 rounded-lg text-sm transition-all
              ${
                activeTab === 'convert'
                  ? 'bg-gray-700 text-white'
                  : 'bg-transparent text-gray-500 hover:text-gray-300'
              }
            `}
          >
            Convert
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`
              flex-1 px-6 py-3 rounded-lg text-sm transition-all
              ${
                activeTab === 'deposit'
                  ? 'bg-gray-700 text-white'
                  : 'bg-transparent text-gray-500 hover:text-gray-300'
              }
            `}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`
              flex-1 px-6 py-3 rounded-lg text-sm transition-all
              ${
                activeTab === 'buy'
                  ? 'bg-gray-700 text-white'
                  : 'bg-transparent text-gray-500 hover:text-gray-300'
              }
            `}
          >
            Buy
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Deposit Tab */}
          {activeTab === 'deposit' && (
            <div className="space-y-4">
              {/* Solana Selection */}
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 397.7 311.7" fill="currentColor" className="text-purple-400">
                    <path fill="currentColor" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
                    <path fill="currentColor" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
                    <path fill="currentColor" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
                  </svg>
                  <span className="text-white text-sm">Solana</span>
                </button>
                <div className="text-sm">
                  <span className="text-gray-400">Balance:</span>
                  <span className="text-white ml-2">0 SOL</span>
                </div>
              </div>

              {/* Deposit Info */}
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                <p className="text-xs text-gray-400">
                  Only deposit Solana through the Solana network for this address.
                </p>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="w-32 h-32 bg-gray-900 rounded flex items-center justify-center">
                      <div className="text-white text-xs text-center">QR Code</div>
                    </div>
                  </div>
                  
                  {/* Deposit Address */}
                  <div className="w-full">
                    <div className="text-xs text-gray-400 mb-1">Deposit Address</div>
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2">
                      <div className="flex-1 text-xs text-gray-300 font-mono break-all">
                        {depositAddress}
                      </div>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors shrink-0">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  Don't have any Solana?{' '}
                  <button className="text-blue-400 hover:text-blue-300">
                    Buy through Onramper
                  </button>
                </div>
              </div>

              {/* Copy Address Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm transition-colors">
                Copy Address
              </button>
            </div>
          )}

          {/* Convert Tab */}
          {activeTab === 'convert' && (
            <div className="space-y-4">
              <h3 className="text-sm text-gray-400">Swap SOL for BNB</h3>

              {/* Converting Section */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Converting</span>
                  <span className="text-xs">
                    <span className="text-gray-400">Balance:</span>
                    <span className="text-blue-400 ml-1">0</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={convertingAmount}
                    onChange={(e) => setConvertingAmount(e.target.value)}
                    className="flex-1 bg-transparent text-2xl text-white outline-none"
                    placeholder="0.0"
                  />
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 397.7 311.7" fill="currentColor" className="text-purple-400">
                      <path fill="currentColor" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
                      <path fill="currentColor" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
                      <path fill="currentColor" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
                    </svg>
                    <span className="text-white text-sm">SOL</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2">($0.73) ≈</div>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center -my-2 relative z-10">
                <button className="p-2 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 transition-colors">
                  <ArrowUpDown size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Gaining Section */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Gaining</span>
                  <span className="text-xs">
                    <span className="text-gray-400">Balance:</span>
                    <span className="text-white ml-1">0</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={gainingAmount}
                    onChange={(e) => setGainingAmount(e.target.value)}
                    className="flex-1 bg-transparent text-2xl text-white outline-none"
                    placeholder="0.0"
                  />
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors">
                    <span className="text-xl">📦</span>
                    <span className="text-white text-sm">BNB</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Exchange Rate */}
              <div className="text-xs text-gray-400 text-right">
                1 SOL ≈ 0.1503 BNB
              </div>

              {/* Confirm Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm transition-colors">
                Confirm
              </button>
            </div>
          )}

          {/* Buy Tab */}
          {activeTab === 'buy' && (
            <div className="space-y-4">
              {/* Solana Selection */}
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 397.7 311.7" fill="currentColor" className="text-purple-400">
                    <path fill="currentColor" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
                    <path fill="currentColor" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
                    <path fill="currentColor" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
                  </svg>
                  <span className="text-white text-sm">Solana</span>
                </button>
                <div className="text-sm">
                  <span className="text-gray-400">Balance:</span>
                  <span className="text-white ml-2">0 SOL</span>
                </div>
              </div>

              {/* Buying Section */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Buying</span>
                  <span className="text-xs text-gray-400">
                    SOL Price: <span className="text-white">131.79</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={buyingAmount}
                    onChange={(e) => setBuyingAmount(e.target.value)}
                    className="flex-1 bg-transparent text-2xl text-white outline-none"
                    placeholder="0.0"
                  />
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 397.7 311.7" fill="currentColor" className="text-purple-400">
                      <path fill="currentColor" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"/>
                      <path fill="currentColor" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"/>
                      <path fill="currentColor" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
                    </svg>
                    <span className="text-white text-sm">SOL</span>
                  </div>
                </div>
              </div>

              {/* Minimum Notice */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-red-400">Minimum: 20 USD</span>
                <span className="text-gray-400">≈ 0 USD</span>
              </div>

              {/* Powered by Onramper */}
              <div className="flex justify-center py-6">
                <div className="text-xs text-gray-500">
                  powered by <span className="text-white font-medium">onramper</span>
                </div>
              </div>

              {/* Buy Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm transition-colors">
                Buy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ExchangeModal.displayName = 'ExchangeModal';
