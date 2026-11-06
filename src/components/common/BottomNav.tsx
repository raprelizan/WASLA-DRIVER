import React from 'react';
import { Home, Compass, Navigation, Wallet, User } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../services/i18n';

export type TabType = 'home' | 'requests' | 'trips' | 'earnings' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  pendingRequestsCount: number;
  hasActiveTrip: boolean;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  pendingRequestsCount,
  hasActiveTrip,
  lang,
}) => {
  const t = translations[lang].tabs;

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: number; indicator?: boolean }[] = [
    {
      id: 'home',
      label: t.home,
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'requests',
      label: t.requests,
      icon: <Compass className="w-5 h-5" />,
      badge: pendingRequestsCount,
    },
    {
      id: 'trips',
      label: t.trips,
      icon: <Navigation className="w-5 h-5" />,
      indicator: hasActiveTrip,
    },
    {
      id: 'earnings',
      label: t.earnings,
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 'profile',
      label: t.profile,
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full transition-all group ${
                isActive
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive ? 'scale-110 bg-cyan-50 dark:bg-cyan-950/50' : 'group-hover:scale-105'
                  }`}
                >
                  {tab.icon}
                </div>
                {/* Pending requests badge */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -end-1.5 min-w-[16px] h-4 px-1 bg-red-600 text-white rounded-full text-[9px] font-black flex items-center justify-center tabular-nums shadow-sm animate-bounce">
                    {tab.badge}
                  </span>
                )}
                {/* Active trip indicator */}
                {tab.indicator && (
                  <span className="absolute -top-0.5 -end-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
