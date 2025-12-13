import { memo, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeTradingSettings, setActivePreset } from '../../store/slices/uiSlice';

const MEV_MODES = [
  { id: 'slow', label: 'Slow', value: '0.001' },
  { id: 'normal', label: 'Normal', value: '0.005' },
  { id: 'fast', label: 'Fast', value: '0.01' },
  { id: 'turbo', label: 'Turbo', value: '0.05' },
];

export const TradingSettingsModal = memo(() => {
  const dispatch = useAppDispatch();
  const activePreset = useAppSelector((state) => state.ui.activePreset);
  
  const [buyAmount, setBuyAmount] = useState('0.1');
  const [sellPercentage, setSellPercentage] = useState('100');
  const [slippage, setSlippage] = useState('10');
  const [priorityFee, setPriorityFee] = useState('0.001');
  const [selectedMevMode, setSelectedMevMode] = useState('normal');
  const [rpcUrl, setRpcUrl] = useState('https://api.mainnet-beta.solana.com');

  useEffect(() => {
    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeTradingSettings());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeTradingSettings());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handlePresetChange = (preset: 1 | 2 | 3) => {
    dispatch(setActivePreset(preset));
  };

  const handleContinue = () => {
    // Save settings and close
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 bg-transparent backdrop-blur-none z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Header with Preset Tabs */}
        <div className="flex items-center justify-between bg-gray-900 border-b border-gray-800">
          <div className="flex items-center flex-1">
            {[1, 2, 3].map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetChange(preset as 1 | 2 | 3)}
                className={`
                  flex-1 px-4 py-3 text-xs transition-colors
                  ${
                    activePreset === preset
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                  }
                `}
              >
                PRESET {preset}
              </button>
            ))}
          </div>
          <button
            onClick={handleClose}
            className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Buy Settings */}
          <div>
            <div className="text-xs text-gray-400 mb-2">Buy Settings</div>
            <div className="space-y-2">
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">Amount (SOL)</label>
                <input
                  type="text"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">Slippage (%)</label>
                <input
                  type="text"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Sell Settings */}
          <div>
            <div className="text-xs text-gray-400 mb-2">Sell Settings</div>
            <div className="space-y-2">
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">Sell Percentage (%)</label>
                <input
                  type="text"
                  value={sellPercentage}
                  onChange={(e) => setSellPercentage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">Priority Fee (SOL)</label>
                <input
                  type="text"
                  value={priorityFee}
                  onChange={(e) => setPriorityFee(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* MEV Mode */}
          <div>
            <div className="text-xs text-gray-400 mb-2">MEV Mode</div>
            <div className="grid grid-cols-4 gap-2">
              {MEV_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setSelectedMevMode(mode.id);
                    setPriorityFee(mode.value);
                  }}
                  className={`
                    px-3 py-2 rounded text-[11px] transition-all border
                    ${
                      selectedMevMode === mode.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }
                  `}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* RPC */}
          <div>
            <label className="text-[11px] text-gray-500 mb-1 block">RPC Endpoint</label>
            <input
              type="text"
              value={rpcUrl}
              onChange={(e) => setRpcUrl(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="https://api.mainnet-beta.solana.com"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded text-xs transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
});

TradingSettingsModal.displayName = 'TradingSettingsModal';