import { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { PulseHeader } from './components/layout/PulseHeader';
import { Footer } from './components/layout/Footer';
import { SearchPanel } from './components/layout/SearchPanel';
import { TradingSettingsModal } from './components/layout/TradingSettingsModal';
import { ExchangeModal } from './components/modals/ExchangeModal';
import { SettingsPanel } from './components/panels/SettingsPanel';
import { WalletPanel } from './components/panels/WalletPanel';
import { NotificationsPanel } from './components/panels/NotificationsPanel';
import { TickerRowSettingsPanel } from './components/panels/TickerRowSettingsPanel';
import { WalletManagerPanel } from './components/panels/WalletManagerPanel';
import { TokenColumn } from './components/tokens/TokenColumn';
import { BuyModal } from './components/modals/BuyModal';
import { useAppDispatch, useAppSelector, useTokens, useWebSocket } from './hooks';
import { setTokens, setLoading } from './store/slices/tokensSlice';
import { closeModal } from './store/slices/uiSlice';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const dispatch = useAppDispatch();
  const { tokens, isLoading } = useAppSelector((state) => state.tokens);
  const { 
    selectedToken, 
    isModalOpen, 
    modalType, 
    isSearchPanelOpen, 
    isTradingSettingsOpen, 
    isExchangeModalOpen,
    isSettingsPanelOpen,
    isWalletPanelOpen,
    isNotificationsPanelOpen,
    selectedChain,
    isTickerRowSettingsPanelOpen,
    isWalletManagerPanelOpen
  } = useAppSelector((state) => state.ui);
  
  const { data: fetchedTokens, isLoading: isFetching } = useTokens();

  // Initialize tokens
  useEffect(() => {
    if (fetchedTokens) {
      dispatch(setTokens(fetchedTokens));
    }
  }, [fetchedTokens, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  // Initialize WebSocket for real-time updates
  useWebSocket();

  // Separate tokens by category and filter by selected chain
  const { newPairs, finalStretch, migrated } = useMemo(() => {
    const chainFilteredTokens = tokens.filter((t) => t.chain === selectedChain);
    const newPairs = chainFilteredTokens.filter((t) => t.category === 'new-pairs');
    const finalStretch = chainFilteredTokens.filter((t) => t.category === 'final-stretch');
    const migrated = chainFilteredTokens.filter((t) => t.category === 'migrated');
    
    return { newPairs, finalStretch, migrated };
  }, [tokens, selectedChain]);

  const selectedTokenData = tokens.find((t) => t.id === selectedToken);

  return (
    <div className="flex flex-col h-screen bg-[#06060a] overflow-hidden">
      <Header />
      <TabBar />
      <PulseHeader />
      
      {/* Main Content Area - 3 Columns on desktop, 1 column on mobile */}
      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="flex md:grid md:grid-cols-3 h-full">
          <TokenColumn 
            title="New Pairs" 
            tokens={newPairs} 
            color="blue"
            isLoading={isLoading}
            className="flex-1"
          />
          <TokenColumn 
            title="Final Stretch" 
            tokens={finalStretch} 
            color="orange"
            isLoading={isLoading}
            className="hidden md:flex md:flex-col flex-1"
          />
          <TokenColumn 
            title="Migrated" 
            tokens={migrated} 
            color="green"
            isLoading={isLoading}
            className="hidden md:flex md:flex-col flex-1"
          />
        </div>
      </main>

      <Footer />

      {/* Search Panel */}
      {isSearchPanelOpen && <SearchPanel />}

      {/* Modals */}
      {modalType === 'buy' && (
        <BuyModal
          isOpen={isModalOpen}
          onClose={() => dispatch(closeModal())}
          token={selectedTokenData || null}
        />
      )}
      {isTradingSettingsOpen && <TradingSettingsModal />}
      {isExchangeModalOpen && <ExchangeModal />}
      
      {/* Panels */}
      {isSettingsPanelOpen && <SettingsPanel />}
      {isWalletPanelOpen && <WalletPanel />}
      {isNotificationsPanelOpen && <NotificationsPanel />}
      {isTickerRowSettingsPanelOpen && <TickerRowSettingsPanel />}
      {isWalletManagerPanelOpen && <WalletManagerPanel />}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}