import { memo, useState } from 'react';
import { X, Download, Upload, Plus, Search, Settings, Trash2, Wallet } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { closeWalletManagerPanel } from '../../store/slices/uiSlice';

type WalletTab = 'all' | 'manager' | 'trades' | 'monitor';

interface Wallet {
  id: string;
  created: string;
  name: string;
  address: string;
  balance: number;
  lastActive: string;
}

export const WalletManagerPanel = memo(() => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<WalletTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const handleClose = () => {
    dispatch(closeWalletManagerPanel());
  };

  const tabs = [
    { id: 'all' as const, label: 'All' },
    { id: 'manager' as const, label: 'Manager' },
    { id: 'trades' as const, label: 'Trades' },
    { id: 'monitor' as const, label: 'Monitor' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="fixed inset-0 md:inset-4 lg:inset-8 xl:inset-12 bg-gray-950 md:border border-gray-800 md:rounded-lg shadow-2xl z-[101] flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col hidden md:flex">
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-white">Wallet Manager</h2>
          </div>

          {/* Tabs */}
          <div className="p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="p-3 space-y-2 mt-auto mb-4">
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm">
              <Download size={16} />
              <span>Import Wallet</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm">
              <Upload size={16} />
              <span>Export Wallet</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm">
              <Plus size={16} />
              <span>Add Wallet</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search by name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Settings size={18} />
              </button>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {wallets.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Wallet size={48} className="mb-4 opacity-50" />
                <p className="text-lg mb-1">No wallets added yet</p>
                <p className="text-sm">Click "Add Wallet" to get started</p>
              </div>
            ) : (
              /* Wallets Table */
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-400">{wallets.length} wallets</p>
                  <button className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 size={14} />
                    <span>Remove All</span>
                  </button>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="px-4 py-3 text-left text-xs text-gray-500">Created</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500">Name</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500">Address</th>
                        <th className="px-4 py-3 text-right text-xs text-gray-500">Balance</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500">Last Active</th>
                        <th className="px-4 py-3 text-right text-xs text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wallets.map((wallet) => (
                        <tr key={wallet.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                          <td className="px-4 py-3 text-sm text-gray-400">{wallet.created}</td>
                          <td className="px-4 py-3 text-sm text-white">{wallet.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 font-mono">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                          </td>
                          <td className="px-4 py-3 text-sm text-white text-right">
                            ${wallet.balance.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-400">{wallet.lastActive}</td>
                          <td className="px-4 py-3 text-right">
                            <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

WalletManagerPanel.displayName = 'WalletManagerPanel';