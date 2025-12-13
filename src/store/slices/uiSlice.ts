import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  activeTab: "new-pairs" | "final-stretch" | "migrated";
  timeFilter: "1m" | "5m" | "30m" | "1h";
  selectedToken: string | null;
  isModalOpen: boolean;
  modalType: "token-details" | "buy" | null;
  isSearchPanelOpen: boolean;
  isTradingSettingsOpen: boolean;
  activePreset: 1 | 2 | 3;
  isExchangeModalOpen: boolean;
  exchangeTab: "convert" | "deposit" | "buy";
  isSettingsPanelOpen: boolean;
  isWalletPanelOpen: boolean;
  isNotificationsPanelOpen: boolean;
  selectedChain: "SOL" | "BNB";
  isTickerRowSettingsPanelOpen: boolean;
  isWalletManagerPanelOpen: boolean;
}

const initialState: UiState = {
  activeTab: "new-pairs",
  timeFilter: "1m",
  selectedToken: null,
  isModalOpen: false,
  modalType: null,
  isSearchPanelOpen: false,
  isTradingSettingsOpen: false,
  activePreset: 1,
  isExchangeModalOpen: false,
  exchangeTab: "deposit",
  isSettingsPanelOpen: false,
  isWalletPanelOpen: false,
  isNotificationsPanelOpen: false,
  selectedChain: "SOL",
  isTickerRowSettingsPanelOpen: false,
  isWalletManagerPanelOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<UiState["activeTab"]>) => {
      state.activeTab = action.payload;
    },
    setTimeFilter: (state, action: PayloadAction<UiState["timeFilter"]>) => {
      state.timeFilter = action.payload;
    },
    setSelectedToken: (state, action: PayloadAction<string | null>) => {
      state.selectedToken = action.payload;
    },
    openModal: (
      state,
      action: PayloadAction<{ type: "token-details" | "buy"; tokenId: string }>
    ) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.selectedToken = action.payload.tokenId;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
    },
    openSearchPanel: (state) => {
      state.isSearchPanelOpen = true;
    },
    closeSearchPanel: (state) => {
      state.isSearchPanelOpen = false;
    },
    openTradingSettings: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.isTradingSettingsOpen = true;
      state.activePreset = action.payload;
    },
    closeTradingSettings: (state) => {
      state.isTradingSettingsOpen = false;
    },
    setActivePreset: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.activePreset = action.payload;
    },
    openExchangeModal: (
      state,
      action: PayloadAction<"convert" | "deposit" | "buy">
    ) => {
      state.isExchangeModalOpen = true;
      state.exchangeTab = action.payload;
    },
    closeExchangeModal: (state) => {
      state.isExchangeModalOpen = false;
    },
    openSettingsPanel: (state) => {
      state.isSettingsPanelOpen = true;
    },
    closeSettingsPanel: (state) => {
      state.isSettingsPanelOpen = false;
    },
    openWalletPanel: (state) => {
      state.isWalletPanelOpen = true;
    },
    closeWalletPanel: (state) => {
      state.isWalletPanelOpen = false;
    },
    openNotificationsPanel: (state) => {
      state.isNotificationsPanelOpen = true;
    },
    closeNotificationsPanel: (state) => {
      state.isNotificationsPanelOpen = false;
    },
    setSelectedChain: (
      state,
      action: PayloadAction<UiState["selectedChain"]>
    ) => {
      state.selectedChain = action.payload;
    },
    openTickerRowSettingsPanel: (state) => {
      state.isTickerRowSettingsPanelOpen = true;
    },
    closeTickerRowSettingsPanel: (state) => {
      state.isTickerRowSettingsPanelOpen = false;
    },
    openWalletManagerPanel: (state) => {
      state.isWalletManagerPanelOpen = true;
    },
    closeWalletManagerPanel: (state) => {
      state.isWalletManagerPanelOpen = false;
    },
  },
});

export const {
  setActiveTab,
  setTimeFilter,
  setSelectedToken,
  openModal,
  closeModal,
  openSearchPanel,
  closeSearchPanel,
  openTradingSettings,
  closeTradingSettings,
  setActivePreset,
  openExchangeModal,
  closeExchangeModal,
  openSettingsPanel,
  closeSettingsPanel,
  openWalletPanel,
  closeWalletPanel,
  openNotificationsPanel,
  closeNotificationsPanel,
  setSelectedChain,
  openTickerRowSettingsPanel,
  closeTickerRowSettingsPanel,
  openWalletManagerPanel,
  closeWalletManagerPanel,
} = uiSlice.actions;

export default uiSlice.reducer;
