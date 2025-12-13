import { memo, useState } from 'react';
import { Globe } from 'lucide-react';
import { TokenData } from '../../store/slices/tokensSlice';
import { TokenIcon } from './TokenIcon';
import { formatNumber, formatCompact } from '../../utils/formatters';

interface TokenRowProps {
  token: TokenData;
  onBuyClick: (tokenId: string) => void;
}

export const TokenRow = memo<TokenRowProps>(({ token, onBuyClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBorderColor = () => {
    if (token.category === 'new-pairs') return 'border-l-blue-500';
    if (token.category === 'final-stretch') return 'border-l-orange-500';
    if (token.category === 'migrated') return 'border-l-green-500';
    return 'border-l-gray-700';
  };

  // Generate random stats for demo
  const age = Math.floor(Math.random() * 5) + 1;
  const holders = Math.floor(Math.random() * 100);
  const buys = Math.floor(Math.random() * 20);
  const sells = Math.floor(Math.random() * 10);
  const txCount = Math.floor(Math.random() * 50) + 5;
  const holdersPercent = Math.floor(Math.random() * 30);
  const liquidityPercent = Math.floor(Math.random() * 20);
  const riskPercent = Math.floor(Math.random() * 15);
  const lockPercent = Math.floor(Math.random() * 5);
  const distPercent = Math.floor(Math.random() * 10);

  return (
    <div
      className={`group relative bg-[#0d0d14] hover:bg-[#131320] border-l-2 ${getBorderColor()} border-gray-800/20 rounded-lg transition-all duration-150 mb-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-3 flex gap-3">
        {/* Token Image with Contract Address */}
        <div className="shrink-0 flex flex-col items-center gap-1">
          <div className="relative">
            <TokenIcon 
              src={token.icon} 
              alt={token.name} 
              size={80} 
              className="border-2 border-green-500/60 rounded-lg" 
            />
          </div>
          {/* Contract Address */}
          <button className="flex items-center gap-1 text-[9px] text-gray-500 hover:text-gray-400 transition-colors">
            <span>{token.id.substring(0, 4)}...{token.id.substring(token.id.length - 4)}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          {/* Row 1: Name/Ticker and MC/V */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-white font-medium">{token.name}</span>
              <span className="text-[12px] text-gray-500">{token.ticker}</span>
            </div>
            <div className="flex flex-col items-end text-[11px]">
              <div className="flex items-center gap-1">
                <span className="text-gray-500">MC</span>
                <span className="text-blue-400 font-medium">{formatNumber(token.marketCap)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">V</span>
                <span className="text-white">{formatCompact(token.volume)}</span>
              </div>
            </div>
          </div>

          {/* Row 2: Time, Icons, and Stats */}
          <div className="flex items-center gap-2 text-[11px]">
            {/* Age */}
            <span className="text-green-400 font-medium">{age}m</span>

            {/* Key/Lock Icon */}
            <button className="text-gray-500 hover:text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
            </button>

            {/* Hand/Wave Icon */}
            <button className="text-gray-500 hover:text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
              </svg>
            </button>

            {/* Website */}
            {token.hasWebsite && (
              <a href={token.socials.website} className="text-gray-500 hover:text-gray-400">
                <Globe size={12} />
              </a>
            )}

            {/* Search/Magnifier */}
            <button className="text-gray-500 hover:text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            {/* Divider */}
            <div className="w-px h-3 bg-gray-700"></div>

            {/* Users/Holders count */}
            <div className="flex items-center gap-1 text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
              <span>{holders}</span>
            </div>

            {/* Heart/Likes */}
            <div className="flex items-center gap-1 text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <span>0</span>
            </div>

            {/* Buys/Sells */}
            <div className="flex items-center gap-0.5 text-gray-400">
              <span className="text-green-400">{buys}</span>
              <span>/</span>
              <span className="text-red-400">{sells}</span>
            </div>
          </div>

          {/* Row 3: More Stats */}
          <div className="flex items-center gap-2 text-[10px]">
            {/* Chart bars */}
            <div className="flex items-center gap-1 text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span>0</span>
            </div>

            {/* Trophy */}
            <div className="flex items-center gap-1 text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
              <span>0</span>
            </div>

            {/* Tasks */}
            <div className="flex items-center gap-1 text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>0/38</span>
            </div>

            {/* F with bars */}
            <div className="flex items-center gap-1 text-gray-400">
              <span>F</span>
              <div className="flex items-center gap-0.5">
                <div className="w-1 h-2 bg-blue-500 rounded-sm"></div>
                <div className="w-1 h-2 bg-purple-500 rounded-sm"></div>
                <div className="w-1 h-2 bg-pink-500 rounded-sm"></div>
              </div>
              <span className="text-[9px]">0.0₂3</span>
            </div>

            {/* TX with progress bar */}
            <div className="flex items-center gap-1 text-gray-400">
              <span>TX</span>
              <span>{txCount}</span>
              <div className="w-10 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-green-500 to-pink-500 rounded-full"
                  style={{ width: `${Math.min(txCount * 2, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Row 4: Badge Metrics */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Holders % */}
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] ${
              holdersPercent > 0 ? 'bg-teal-500/20 text-teal-400' : 'bg-gray-800/50 text-gray-400'
            }`}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>{holdersPercent}%</span>
            </div>

            {/* Liquidity % */}
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] ${
              liquidityPercent > 0 ? 'bg-teal-500/20 text-teal-400' : 'bg-gray-800/50 text-gray-400'
            }`}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
              <span>{liquidityPercent}% 2d</span>
            </div>

            {/* Risk % */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-red-500/20 text-red-400">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
              <span>{riskPercent}%</span>
            </div>

            {/* Lock % */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-teal-500/20 text-teal-400">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{lockPercent}%</span>
            </div>

            {/* Distribution % */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-gray-800/50 text-gray-400">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <circle cx="19" cy="5" r="2"></circle>
                <circle cx="5" cy="5" r="2"></circle>
                <circle cx="19" cy="19" r="2"></circle>
                <circle cx="5" cy="19" r="2"></circle>
                <path d="m14 12 5-5"></path>
                <path d="m10 12-5-5"></path>
                <path d="m14 12 5 5"></path>
                <path d="m10 12-5 5"></path>
              </svg>
              <span>{distPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Buy Button */}
      <div className="md:hidden px-3 pb-3">
        <button 
          onClick={() => onBuyClick(token.id)}
          className="w-full py-2 bg-gray-800/80 hover:bg-gray-700/80 text-white text-[12px] font-medium rounded-lg transition-colors"
        >
          0 BNB
        </button>
      </div>

      {/* Hover Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none rounded-lg" />
      )}
    </div>
  );
});

TokenRow.displayName = 'TokenRow';
