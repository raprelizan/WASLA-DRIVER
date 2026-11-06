import React from 'react';
import {
  Bell,
  Moon,
  Sun,
  ShieldAlert,
  Smartphone,
  Monitor,
  Globe,
  Radio
} from 'lucide-react';
import { DriverStatus, Language } from '../../types';

interface HeaderProps {
  driverStatus: DriverStatus;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSos: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onSimulateRequest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  driverStatus,
  unreadCount,
  onOpenNotifications,
  onOpenSos,
  isDarkMode,
  onToggleTheme,
  lang,
  onChangeLang,
  isPhoneFrame,
  onTogglePhoneFrame,
  onSimulateRequest,
}) => {
  const isAr = lang === 'ar';

  const getStatusDisplay = () => {
    switch (driverStatus) {
      case 'online':
        return {
          text: isAr ? 'متصل للخدمة' : lang === 'fr' ? 'En ligne' : 'Online',
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
        };
      case 'busy':
        return {
          text: isAr ? 'في رحلة' : lang === 'fr' ? 'En course' : 'Busy',
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
        };
      case 'break':
        return {
          text: isAr ? 'استراحة' : lang === 'fr' ? 'Pause' : 'On break',
          bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
        };
      case 'suspended':
        return {
          text: isAr ? 'موقوف' : lang === 'fr' ? 'Suspendu' : 'Suspended',
          bg: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
        };
      default:
        return {
          text: isAr ? 'غير متصل' : lang === 'fr' ? 'Hors ligne' : 'Offline',
          bg: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-400/20'
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-cyan-600/20 shrink-0">
            W
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
                WASLA DRIVER
              </span>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                وصلة السائق
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>منظومة WASLA TALIB الجزائر</span>
              <span aria-hidden="true">·</span>
              <span className={`inline-block px-1.5 py-0.2 rounded-md text-[9px] font-semibold border ${status.bg}`}>
                {status.text}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Simulation trigger */}
          <button
            onClick={onSimulateRequest}
            title={isAr ? 'محاكاة وصول طلب جديد' : 'Simulate incoming ride request'}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-semibold hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-500" />
            <span>{isAr ? 'طلب تجريبي' : 'Simulate Request'}</span>
          </button>

          {/* SOS Safety Button */}
          <button
            onClick={onOpenSos}
            title={isAr ? 'مركز الطوارئ والسلامة' : 'Emergency & Safety Center'}
            className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-red-600/30 transition-transform active:scale-95"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden xs:inline">{isAr ? 'طوارئ' : 'SOS'}</span>
          </button>

          {/* Device Frame View Switcher (Desktop preview vs phone frame) */}
          <button
            onClick={onTogglePhoneFrame}
            title={isPhoneFrame ? (isAr ? 'عرض ملء الشاشة' : 'Expand full width') : (isAr ? 'عرض كإطار هاتف' : 'Switch to phone frame')}
            className="hidden md:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="Toggle device frame view"
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div className="relative group">
            <button
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1 text-xs font-bold"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{lang}</span>
            </button>
            <div className="absolute end-0 mt-1 w-28 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 hidden group-hover:block z-50">
              <button
                onClick={() => onChangeLang('ar')}
                className={`w-full px-3 py-1.5 text-xs text-start font-medium hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between ${
                  lang === 'ar' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>العربية</span>
                <span className="text-[10px] text-slate-400">DZ</span>
              </button>
              <button
                onClick={() => onChangeLang('fr')}
                className={`w-full px-3 py-1.5 text-xs text-start font-medium hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between ${
                  lang === 'fr' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>Français</span>
                <span className="text-[10px] text-slate-400">FR</span>
              </button>
              <button
                onClick={() => onChangeLang('en')}
                className={`w-full px-3 py-1.5 text-xs text-start font-medium hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between ${
                  lang === 'en' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>English</span>
                <span className="text-[10px] text-slate-400">EN</span>
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -end-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
