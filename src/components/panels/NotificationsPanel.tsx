import { memo, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { closeNotificationsPanel } from '../../store/slices/uiSlice';

export const NotificationsPanel = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeNotificationsPanel());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeNotificationsPanel());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClearAll = () => {
    // Clear all notifications logic
  };

  return (
    <div
      className="fixed inset-0 bg-transparent z-50"
      onClick={handleBackdropClick}
    >
      <div className="absolute top-16 right-4 w-[600px] h-[700px] bg-gray-900/95 border border-gray-700 rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl text-white">Notifications</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClearAll}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-600 mb-2">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No notifications yet</p>
          </div>
        </div>
      </div>
    </div>
  );
});

NotificationsPanel.displayName = 'NotificationsPanel';
