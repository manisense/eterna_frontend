import { memo, useEffect } from 'react';
import { User, Settings, Languages, Rocket, LogOut } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { closeSettingsPanel } from '../../store/slices/uiSlice';

export const SettingsPanel = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeSettingsPanel());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeSettingsPanel());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent z-50"
      onClick={handleBackdropClick}
    >
      <div className="absolute top-16 right-4 w-72 bg-gray-900/95 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Menu Items */}
        <div className="py-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left">
            <User size={18} className="text-gray-400" />
            <span className="text-white text-sm">Account and Security</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left">
            <Settings size={18} className="text-gray-400" />
            <span className="text-white text-sm">Settings</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left">
            <Languages size={18} className="text-gray-400" />
            <span className="text-white text-sm">Auto Translate</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left">
            <Rocket size={18} className="text-gray-400" />
            <span className="text-white text-sm">Feature Updates</span>
          </button>

          <div className="h-px bg-gray-800 my-2" />

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left">
            <LogOut size={18} className="text-red-400" />
            <span className="text-red-400 text-sm">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
});

SettingsPanel.displayName = 'SettingsPanel';
