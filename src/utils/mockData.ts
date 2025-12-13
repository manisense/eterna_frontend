import { TokenData } from '../store/slices/tokensSlice';

const tokenNames = [
  { name: 'HUMAN', ticker: 'HUMAN COIN', verified: true },
  { name: 'BART', ticker: 'Bart Market', verified: false },
  { name: 'COWALON', ticker: 'CowAlon', verified: false },
  { name: 'SHOEBILL', ticker: 'THE SHO...', verified: true },
  { name: '$1', ticker: '$1', verified: false },
  { name: 'DISNEYFI', ticker: 'Disneyfi...', verified: false },
  { name: 'PEPE', ticker: 'Pepe Coin', verified: true },
  { name: 'WOJAK', ticker: 'Wojak', verified: false },
  { name: 'DOGE', ticker: 'Doge Elite', verified: true },
  { name: 'SHIB', ticker: 'Shiba Pro', verified: false },
];

const generateChartData = (isPositive: boolean): number[] => {
  const data: number[] = [];
  let value = 50;
  for (let i = 0; i < 20; i++) {
    const change = (Math.random() - (isPositive ? 0.3 : 0.7)) * 10;
    value = Math.max(20, Math.min(80, value + change));
    data.push(value);
  }
  return data;
};

export const generateMockTokens = (category?: string): TokenData[] => {
  // Generate tokens for all categories
  const categories: Array<'new-pairs' | 'final-stretch' | 'migrated'> = ['new-pairs', 'final-stretch', 'migrated'];
  const chains: Array<'SOL' | 'BNB'> = ['SOL', 'BNB'];
  const allTokens: TokenData[] = [];

  categories.forEach((cat) => {
    const tokensPerCategory = 8; // 8 tokens per category for better scrolling demo
    for (let i = 0; i < tokensPerCategory; i++) {
      const tokenInfo = tokenNames[Math.floor(Math.random() * tokenNames.length)];
      const isPositive = Math.random() > 0.4;
      const marketCapChange = parseFloat((Math.random() * 200 - 60).toFixed(2));
      // Assign chain - distribute evenly between SOL and BNB
      const chain = chains[i % chains.length];
      
      allTokens.push({
        id: `token-${cat}-${i}-${Date.now()}-${Math.random()}`,
        name: tokenInfo.name,
        ticker: tokenInfo.ticker,
        icon: `https://api.dicebear.com/7.x/shapes/svg?seed=${tokenInfo.name}${i}${cat}`,
        marketCap: Math.floor(Math.random() * 10000000) + 10000,
        marketCapChange,
        liquidity: Math.floor(Math.random() * 100000) + 10000,
        volume: Math.floor(Math.random() * 100000) + 10000,
        txns: {
          buys: Math.floor(Math.random() * 300) + 50,
          sells: Math.floor(Math.random() * 200) + 30,
          total: 0,
        },
        tokenInfo: {
          holders: Math.floor(Math.random() * 5000) + 100,
          holdersChange: parseFloat((Math.random() * 50 - 10).toFixed(2)),
          marketCap24h: parseFloat((Math.random() * 20 - 5).toFixed(2)),
          liquidity24h: parseFloat((Math.random() * 15 - 5).toFixed(2)),
          volume24h: parseFloat((Math.random() * 30 - 10).toFixed(2)),
          price: parseFloat((Math.random() * 10).toFixed(4)),
          priceChange: parseFloat((Math.random() * 50 - 20).toFixed(2)),
        },
        chartData: generateChartData(isPositive),
        socials: {
          twitter: Math.random() > 0.3 ? '#' : undefined,
          website: Math.random() > 0.4 ? '#' : undefined,
          telegram: Math.random() > 0.5 ? '#' : undefined,
        },
        hasTwitter: Math.random() > 0.3,
        hasWebsite: Math.random() > 0.4,
        hasTelegram: Math.random() > 0.5,
        isVerified: tokenInfo.verified,
        category: cat,
        chain,
        lastUpdate: Date.now(),
        priceDirection: 'neutral',
      });
    }
  });

  return allTokens.map(token => ({
    ...token,
    txns: {
      ...token.txns,
      total: token.txns.buys + token.txns.sells,
    },
  }));
};