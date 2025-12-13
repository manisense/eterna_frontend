import { memo, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/button';
import { TokenData } from '../../store/slices/tokensSlice';
import { formatNumber } from '../../utils/formatters';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: TokenData | null;
}

export const BuyModal = memo<BuyModalProps>(({ isOpen, onClose, token }) => {
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('1');

  if (!token) return null;

  const handleBuy = () => {
    // Mock buy action
    console.log(`Buying ${amount} of ${token.name} with ${slippage}% slippage`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Buy ${token.name}`} size="md">
      <div className="space-y-6">
        {/* Token Info */}
        <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg">
          <img src={token.icon} alt={token.name} className="w-12 h-12 rounded-lg" />
          <div className="flex-1">
            <div className="text-white">{token.name}</div>
            <div className="text-sm text-gray-400">{token.ticker}</div>
          </div>
          <div className="text-right">
            <div className="text-white">{formatNumber(token.marketCap)}</div>
            <div className="text-xs text-gray-400">Market Cap</div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Amount (SOL)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex gap-2">
            {['0.1', '0.5', '1', '5'].map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className="flex-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
              >
                {preset} SOL
              </button>
            ))}
          </div>
        </div>

        {/* Slippage */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Slippage Tolerance (%)</label>
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            placeholder="1"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Summary */}
        <div className="p-4 bg-gray-800 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Liquidity</span>
            <span className="text-white">{formatNumber(token.liquidity)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>24h Volume</span>
            <span className="text-white">{formatNumber(token.volume)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Price Impact</span>
            <span className="text-yellow-500">~0.5%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBuy} className="flex-1" disabled={!amount}>
            Confirm Buy
          </Button>
        </div>

        {/* Warning */}
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-500">
          ⚠️ Always DYOR. Trading crypto carries significant risk. Only invest what you can afford to lose.
        </div>
      </div>
    </Modal>
  );
});

BuyModal.displayName = 'BuyModal';
