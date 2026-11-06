import React from 'react';
import { X, CheckCheck, Bell, Shield, Wallet, FileText, Car, Compass } from 'lucide-react';
import { NotificationItem, Language } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  lang: Language;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const getIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'request':
        return <Compass className="w-4 h-4 text-cyan-500" />;
      case 'earnings':
        return <Wallet className="w-4 h-4 text-emerald-500" />;
      case 'document':
        return <FileText className="w-4 h-4 text-amber-500" />;
      case 'company':
        return <Car className="w-4 h-4 text-blue-500" />;
      case 'safety':
        return <Shield className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-s border-slate-200 dark:border-slate-800 animate-in ${
          isAr ? 'slide-in-from-left' : 'slide-in-from-right'
        } duration-200`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {isAr ? 'مركز الإشعارات والتنبيهات' : lang === 'fr' ? 'Notifications' : 'Notifications Hub'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'قراءة الكل' : 'Mark all read'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              {isAr ? 'لا توجد إشعارات جديدة' : 'No notifications'}
            </div>
          ) : (
            notifications.map((item) => {
              const title = isAr ? item.titleAr : lang === 'fr' ? item.titleFr : item.titleEn;
              const body = isAr ? item.bodyAr : lang === 'fr' ? item.bodyFr : item.bodyEn;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectNotification(item);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    item.isRead
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80'
                      : 'bg-white dark:bg-slate-800 border-cyan-500/30 shadow-sm'
                  } hover:border-cyan-500/60`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 shrink-0 mt-0.5">
                      {getIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {title}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {body}
                      </p>
                      {item.actionTab && (
                        <span className="inline-block mt-2 text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
                          {isAr ? 'عرض التفاصيل ←' : 'View details →'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
