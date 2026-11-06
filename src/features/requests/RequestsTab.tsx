import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  User,
  Star,
  CheckCircle2,
  XCircle,
  CreditCard,
  Volume2,
  VolumeX,
  Radio,
  Plus
} from 'lucide-react';
import { TripRequest, Language } from '../../types';
import { translations } from '../../services/i18n';
import { soundService } from '../../utils/audio';

interface RequestsTabProps {
  requests: TripRequest[];
  onAccept: (request: TripRequest) => void;
  onReject: (request: TripRequest) => void;
  onSimulateRequest: () => void;
  lang: Language;
}

export const RequestsTab: React.FC<RequestsTabProps> = ({
  requests,
  onAccept,
  onReject,
  onSimulateRequest,
  lang,
}) => {
  const isAr = lang === 'ar';
  const t = translations[lang].requests;

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState<'all' | 'accepted' | 'rejected'>('all');

  // Active pending requests (new or awaiting)
  const pendingRequests = requests.filter(
    (r) => r.status === 'new' || r.status === 'awaiting'
  );

  // Past requests
  const pastRequests = requests.filter(
    (r) => r.status === 'accepted' || r.status === 'rejected' || r.status === 'expired'
  );

  const filteredPast = pastRequests.filter((r) => {
    if (filter === 'accepted') return r.status === 'accepted';
    if (filter === 'rejected') return r.status === 'rejected' || r.status === 'expired';
    return true;
  });

  const getPaymentBadge = (method: TripRequest['paymentMethod']) => {
    switch (method) {
      case 'baridimob':
        return {
          label: isAr ? 'بريدي موب (BaridiMob)' : 'BaridiMob App',
          color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
        };
      case 'wallet':
        return {
          label: isAr ? 'محفظة وصلة طالب' : 'WASLA TALIB Wallet',
          color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
        };
      default:
        return {
          label: isAr ? 'دفع نقدي (Espèces)' : 'Cash in Hand',
          color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        };
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
            {t.incomingTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {pendingRequests.length > 0
              ? `${pendingRequests.length} ${isAr ? 'طلبات بانتظار قرارك' : 'pending requests'}`
              : t.noActiveRequests}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound alert toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? (isAr ? 'كتم صوت الإشعارات' : 'Mute sound') : (isAr ? 'تفعيل صوت التنبيه' : 'Unmute sound')}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Simulate button */}
          <button
            onClick={() => {
              if (soundEnabled) soundService.playRequestChime();
              onSimulateRequest();
            }}
            className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-cyan-600/30 transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? 'محاكاة طلب جديد' : 'Simulate Ride'}</span>
          </button>
        </div>
      </div>

      {/* ACTIVE PENDING REQUEST CARDS */}
      {pendingRequests.length > 0 ? (
        <div className="space-y-4">
          {pendingRequests.map((req) => {
            const pay = getPaymentBadge(req.paymentMethod);
            return (
              <div
                key={req.id}
                className="p-5 bg-white dark:bg-slate-900 border-2 border-cyan-500/80 rounded-3xl shadow-xl shadow-cyan-600/10 space-y-4 relative overflow-hidden"
              >
                {/* Countdown banner with animated progress bar */}
                <div className="space-y-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                      <span className="font-extrabold text-cyan-600 dark:text-cyan-400">
                        {t.newRideRequest}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">#{req.id}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl tabular-nums">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>
                        {t.expiresIn} {req.expiresInSeconds} {t.seconds}
                      </span>
                    </div>
                  </div>

                  {/* Visual timer countdown bar (assuming 30s base) */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        req.expiresInSeconds > 10
                          ? 'bg-cyan-500'
                          : req.expiresInSeconds > 5
                          ? 'bg-amber-500'
                          : 'bg-red-500 animate-pulse'
                      }`}
                      style={{ width: `${Math.min(100, (req.expiresInSeconds / 30) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Fare & Passenger Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                      {req.fareDzd} <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">د.ج</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {isAr ? 'الصافي بعد خصم العمولة: ' : 'Net after commission: '}
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {req.fareDzd - req.commissionDzd} د.ج
                      </span>
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {req.passengerName}
                      </span>
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-[11px] text-amber-500 font-semibold flex items-center gap-1 justify-end mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="tabular-nums">{req.passengerRating}</span>
                      <span className="text-slate-400">({req.passengerCount} {isAr ? 'ركاب' : 'passengers'})</span>
                    </div>
                  </div>
                </div>

                {/* Route Points */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {isAr ? 'نقطة الانطلاق (الركوب)' : 'Pickup Location'}
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                        {req.pickupAddress}
                      </div>
                    </div>
                  </div>

                  <div className="h-4 border-s-2 border-dashed border-slate-300 dark:border-slate-700 ms-1.5" />

                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-500/20 shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {isAr ? 'الوجهة المقصودة (النزول)' : 'Dropoff Location'}
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                        {req.dropoffAddress}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Metrics and Payment */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 font-medium">{t.distance}</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200 tabular-nums mt-0.5">
                      {req.distanceKm} كم
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 font-medium">{t.duration}</div>
                    <div className="font-extrabold text-slate-800 dark:text-slate-200 tabular-nums mt-0.5">
                      ~{req.estimatedMinutes} دقيقة
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
                    <div className="text-[10px] text-slate-400 font-medium">{t.paymentMethod}</div>
                    <div className={`text-[10px] font-bold px-1 py-0.5 rounded-md border mt-0.5 truncate ${pay.color}`}>
                      {pay.label}
                    </div>
                  </div>
                </div>

                {/* Special passenger requirements if present */}
                {req.specialRequirements && (
                  <div className="p-2.5 bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-500/20 rounded-xl text-cyan-800 dark:text-cyan-300 text-xs flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    <span>{req.specialRequirements}</span>
                  </div>
                )}

                {/* Safe Large Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onReject(req)}
                    className="py-3.5 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-98"
                  >
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>{t.rejectRide}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onAccept(req)}
                    className="py-3.5 px-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-transform active:scale-98"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>{t.acceptRide}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {t.noActiveRequests}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            {t.noActiveRequestsDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={onSimulateRequest}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-600/20"
            >
              {t.simulateNewRequest}
            </button>
          </div>
        </div>
      )}

      {/* REQUEST HISTORY SECTION */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {t.history}
          </h3>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t.allFilter}
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filter === 'accepted'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t.acceptedFilter}
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filter === 'rejected'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t.rejectedFilter}
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-2">
          {filteredPast.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">
              {isAr ? 'لا توجد طلبات سابقة في هذا الفلتر' : 'No past requests found'}
            </div>
          ) : (
            filteredPast.map((item) => {
              const isAccepted = item.status === 'accepted';
              return (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isAccepted
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}
                    >
                      {isAccepted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {item.dropoffAddress}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{item.passengerName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-end shrink-0">
                    <div className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {item.fareDzd} د.ج
                    </div>
                    <div
                      className={`text-[10px] font-semibold ${
                        isAccepted ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    >
                      {isAccepted
                        ? isAr ? 'مقبولة' : 'Accepted'
                        : isAr ? 'مرفوضة / منتهية' : 'Declined'}
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
