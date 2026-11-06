import React, { useState } from 'react';
import {
  Navigation,
  MapPin,
  Phone,
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Compass,
  ArrowRight,
  User,
  Star,
  Receipt,
  Car
} from 'lucide-react';
import { ActiveTrip, ActiveTripStage, Language } from '../../types';
import { translations } from '../../services/i18n';

interface ActiveTripViewProps {
  trip: ActiveTrip | null;
  onUpdateStage: (nextStage: ActiveTripStage) => void;
  onCancelTrip: (reason: string) => void;
  onOpenSos: () => void;
  onCompleteFare: () => void;
  lang: Language;
}

export const ActiveTripView: React.FC<ActiveTripViewProps> = ({
  trip,
  onUpdateStage,
  onCancelTrip,
  onOpenSos,
  onCompleteFare,
  lang,
}) => {
  const isAr = lang === 'ar';
  const t = translations[lang].activeTrip;

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [quickMessage, setQuickMessage] = useState('');

  if (!trip) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <Navigation className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          {isAr ? 'لا توجد رحلة نشطة جارية حالياً' : 'No active trip in progress'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          {isAr
            ? 'اقبل أحد الطلبات الواردة من قسم "الطلبات" لبدء الملاحة الميدانية ومتابعة مسار الرحلة خطوة بخطوة.'
            : 'Accept a ride from the Requests tab to start live route navigation.'}
        </p>
      </div>
    );
  }

  const { request, stage } = trip;

  // Stages definition
  const stagesList: { key: ActiveTripStage; label: string; actionLabel: string }[] = [
    {
      key: 'accepted',
      label: t.steps.accepted,
      actionLabel: t.nextStepAction.headToPickup,
    },
    {
      key: 'en_route_pickup',
      label: t.steps.en_route_pickup,
      actionLabel: t.nextStepAction.confirmArrival,
    },
    {
      key: 'arrived_pickup',
      label: t.steps.arrived_pickup,
      actionLabel: t.nextStepAction.startTripWithPassenger,
    },
    {
      key: 'trip_started',
      label: t.steps.trip_started,
      actionLabel: t.nextStepAction.reachDestination,
    },
    {
      key: 'arrived_destination',
      label: t.steps.arrived_destination,
      actionLabel: t.nextStepAction.completeAndReceiveFare,
    },
    {
      key: 'completed',
      label: t.steps.completed,
      actionLabel: t.nextStepAction.finished,
    },
  ];

  const currentStageIndex = stagesList.findIndex((s) => s.key === stage);

  const handleNextStep = () => {
    if (currentStageIndex < stagesList.length - 1) {
      const nextStage = stagesList[currentStageIndex + 1].key;
      if (nextStage === 'completed') {
        onCompleteFare();
      } else {
        onUpdateStage(nextStage);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* MAP & ROUTE SIMULATION CONTAINER */}
      <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-950">
        {/* Stylized vector map of Algiers coastal area & highway */}
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full object-cover select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mediterranean sea background */}
          <path d="M 0,0 L 800,0 L 800,120 Q 550,150 400,100 T 0,140 Z" fill="#0f2b48" />
          {/* Coastline */}
          <path
            d="M 0,140 Q 250,90 400,100 T 800,120"
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="8"
          />

          {/* Urban land area */}
          <rect y="110" width="800" height="340" fill="#0a121e" />

          {/* City road grids */}
          <g stroke="#1a2638" strokeWidth="3" opacity="0.6">
            <line x1="50" y1="130" x2="750" y2="130" />
            <line x1="80" y1="210" x2="720" y2="210" />
            <line x1="120" y1="290" x2="780" y2="290" />
            <line x1="60" y1="370" x2="740" y2="370" />
            <line x1="150" y1="120" x2="150" y2="440" />
            <line x1="300" y1="120" x2="300" y2="440" />
            <line x1="450" y1="120" x2="450" y2="440" />
            <line x1="600" y1="120" x2="600" y2="440" />
          </g>

          {/* Main East-West Highway (Autoroute de l'Est - Alger) */}
          <path
            d="M 80,180 Q 260,250 420,230 T 720,290"
            fill="none"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 80,180 Q 260,250 420,230 T 720,290"
            fill="none"
            stroke="#475569"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Active Route polyline glowing in cyan */}
          <path
            d="M 160,205 Q 300,240 430,230 T 650,285"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="8 4"
            className="animate-pulse"
          />

          {/* Location markers & Labels */}
          {/* Pickup Pin */}
          <g transform="translate(160, 205)">
            <circle r="14" fill="#10b981" opacity="0.3" className="animate-ping" />
            <circle r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="14" y="5" fill="#e2e8f0" fontSize="12" fontWeight="bold">
              {isAr ? 'نقطة الانطلاق (ديدوش مراد)' : 'Pickup: Didouche'}
            </text>
          </g>

          {/* Destination Pin */}
          <g transform="translate(650, 285)">
            <circle r="14" fill="#ef4444" opacity="0.3" />
            <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="-120" y="-12" fill="#e2e8f0" fontSize="12" fontWeight="bold">
              {isAr ? 'الوجهة (باب الزوار)' : 'Dropoff: Bab Ezzouar'}
            </text>
          </g>

          {/* Current Driver Car Pin positioned along route based on stage */}
          <g
            transform={`translate(${
              currentStageIndex <= 1
                ? '240, 220'
                : currentStageIndex <= 3
                ? '410, 230'
                : '560, 260'
            })`}
          >
            <circle r="20" fill="#0284c7" opacity="0.3" className="animate-ping" />
            <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <path
              d="M -6,-4 L 0,-10 L 6,-4 M 0,-10 L 0,8"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* Floating Map HUD Overlays */}
        {/* Top Directions Banner */}
        <div className="absolute top-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 text-white flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-600 text-white">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold">
                {currentStageIndex < 3
                  ? isAr ? 'توجه نحو الراكب (شارع ديدوش مراد)' : 'Head to passenger pickup'
                  : isAr ? 'المسار نحو الوجهة (باب الزوار عبر السريع)' : 'Head to destination via East Highway'}
              </div>
              <div className="text-[10px] text-slate-400">
                {isAr ? 'بعد 350 متر انعطف يميناً نحو الطريق الوطني رقم 5' : 'In 350m turn right toward N5 highway'}
              </div>
            </div>
          </div>

          <div className="text-end shrink-0">
            <div className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
              {currentStageIndex < 3 ? '4 دقائق' : '18 دقيقة'}
            </div>
            <div className="text-[10px] text-slate-400 tabular-nums">
              {currentStageIndex < 3 ? '1.8 كم' : '14.4 كم'}
            </div>
          </div>
        </div>

        {/* Floating Safety & Compass Buttons */}
        <div className="absolute bottom-3 end-3 flex flex-col gap-2">
          <button
            onClick={onOpenSos}
            className="p-2.5 rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/40 hover:bg-red-700 transition-transform active:scale-90"
            title="طوارئ وأمان"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>
          <div className="p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700">
            <Compass className="w-5 h-5 animate-spin" />
          </div>
        </div>
      </div>

      {/* STEP PROGRESSION BAR (6 STAGES) */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
          <span>{isAr ? 'مراحل تنفيذ الرحلة' : 'Trip Progression'}</span>
          <span className="text-cyan-600 dark:text-cyan-400 tabular-nums">
            {currentStageIndex + 1} / {stagesList.length}
          </span>
        </div>

        {/* Progress track */}
        <div className="grid grid-cols-6 gap-1.5">
          {stagesList.map((stg, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={stg.key} className="space-y-1">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isCompleted
                      ? 'bg-emerald-500'
                      : isCurrent
                      ? 'bg-cyan-500 animate-pulse'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
                <div
                  className={`text-[9px] truncate text-center font-semibold ${
                    isCurrent
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  {idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Stage Label */}
        <div className="p-3 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-500/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {stagesList[currentStageIndex]?.label}
            </span>
          </div>

          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            {trip.startTime}
          </span>
        </div>
      </div>

      {/* PASSENGER PROFILE & TRIP DETAILS CARD */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        {/* Passenger Info Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-lg">
              {request.passengerName.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {request.passengerName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{request.passengerRating}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{request.paymentMethod === 'baridimob' ? 'بريدي موب' : request.paymentMethod === 'wallet' ? 'محفظة' : 'نقداً'}</span>
              </div>
            </div>
          </div>

          {/* Action Call & Message */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCallModal(true)}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title={t.callPassenger}
            >
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </button>
            <button
              onClick={() => setShowMessageModal(true)}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title={t.messagePassenger}
            >
              <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Address Points */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">{t.pickupAt}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{request.pickupAddress}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
            <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">{t.dropoffAt}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{request.dropoffAddress}</span>
            </div>
          </div>
        </div>

        {/* Fare and Next Step CTA */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">{t.tripSummaryTitle}</span>
            <div className="font-black text-base text-slate-900 dark:text-slate-100 tabular-nums">
              {request.fareDzd} <span className="text-xs text-cyan-600 font-bold">د.ج</span>
            </div>
          </div>

          {/* Primary Action Button to advance stage */}
          {currentStageIndex < stagesList.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-sm shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <span>{stagesList[currentStageIndex]?.actionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-2">
              <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                {isAr ? 'تم استلام الأجرة وإنهاء المشوار بنجاح' : 'Trip completed & fare collected'}
              </div>
              <div className="text-xs text-slate-500">
                {isAr ? `صافي المبلغ المستلم: ${request.fareDzd - request.commissionDzd} د.ج` : `Net: ${request.fareDzd - request.commissionDzd} DZD`}
              </div>
            </div>
          )}

          {/* Cancel button */}
          {currentStageIndex < 4 && (
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="w-full py-2.5 rounded-xl text-slate-500 hover:text-red-500 text-xs font-semibold transition-colors"
            >
              {t.cancelRide}
            </button>
          )}
        </div>
      </div>

      {/* QUICK CALL SIMULATION MODAL */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {isAr ? 'الاتصال بالراكب' : 'Call Passenger'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{request.passengerName}</p>
              <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-2">
                {request.passengerPhone}
              </p>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[11px] text-slate-400">
              {isAr ? 'يتم الاتصال عبر رقم افتراضي مشفر لحماية خصوصية السائق والراكب.' : 'Secured via masked virtual number.'}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${request.passengerPhone}`}
                className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                {isAr ? 'بدء المكالمة' : 'Call Now'}
              </a>
              <button
                onClick={() => setShowCallModal(false)}
                className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK MESSAGE SIMULATION MODAL */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {isAr ? 'رسالة سريعة للراكب' : 'Quick Message to Passenger'}
            </h3>
            <div className="space-y-2">
              {[
                'أنا في موقع الركوب بانتظارك',
                'سأصل خلال دقيقتين إن شاء الله',
                'أرجو الانتظار عند المخرج الرئيسي',
              ].map((msg, i) => (
                <button
                  key={i}
                  onClick={() => setQuickMessage(msg)}
                  className="w-full p-2.5 text-xs text-start bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-cyan-500 transition-colors"
                >
                  {msg}
                </button>
              ))}
            </div>

            <textarea
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder={isAr ? 'اكتب رسالة خاصة...' : 'Type custom message...'}
              rows={2}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setQuickMessage('');
                }}
                className="flex-1 py-2.5 bg-cyan-600 text-white rounded-xl text-xs font-bold"
              >
                {isAr ? 'إرسال' : 'Send'}
              </button>
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-red-500/30 rounded-3xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {isAr ? 'تأكيد إلغاء الرحلة' : 'Confirm Ride Cancellation'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isAr
                  ? 'يتطلب النظام ذكر سبب مبرر لعدم التأثير على نسبة القبول'
                  : 'A valid reason is required under transport compliance.'}
              </p>
            </div>

            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            >
              <option value="">{isAr ? 'اختر سبب الإلغاء...' : 'Select cancellation reason...'}</option>
              <option value="الراكب لم يحضر بعد تجاوز وقت الانتظار">الراكب لم يحضر بعد تجاوز وقت الانتظار (5 د)</option>
              <option value="عطل ميكانيكي طارئ في المركبة">عطل ميكانيكي طارئ في المركبة</option>
              <option value="تعذر الوصول لموقع الركوب بسبب أشغال">تعذر الوصول لموقع الركوب بسبب أشغال الطرق</option>
              <option value="طلب من الراكب نفسه">طلب من الراكب نفسه</option>
            </select>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                disabled={!cancelReason}
                onClick={() => {
                  onCancelTrip(cancelReason);
                  setShowCancelModal(false);
                }}
                className="py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold disabled:opacity-50"
              >
                {isAr ? 'تأكيد الإلغاء' : 'Confirm Cancel'}
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
              >
                {isAr ? 'تراجع' : 'Back'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
