import React from 'react';
import {
  Power,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Car,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Radio
} from 'lucide-react';
import {
  DriverProfile,
  DriverStatus,
  Vehicle,
  DriverDocument,
  ActiveTrip,
  ScheduledTrip,
  Language,
  TripRequest
} from '../../types';
import { translations } from '../../services/i18n';
import { TabType } from '../../components/common/BottomNav';

interface DashboardTabProps {
  profile: DriverProfile;
  status: DriverStatus;
  onToggleOnline: () => void;
  activeVehicle: Vehicle;
  documents: DriverDocument[];
  activeTrip: ActiveTrip | null;
  scheduledTrips: ScheduledTrip[];
  pendingRequests: TripRequest[];
  onChangeTab: (tab: TabType) => void;
  onOpenVehicles: () => void;
  onOpenDocuments: () => void;
  onOpenSupport: () => void;
  onOpenOnboarding: () => void;
  lang: Language;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  profile,
  status,
  onToggleOnline,
  activeVehicle,
  documents,
  activeTrip,
  scheduledTrips,
  pendingRequests,
  onChangeTab,
  onOpenVehicles,
  onOpenDocuments,
  onOpenSupport,
  onOpenOnboarding,
  lang,
}) => {
  const isAr = lang === 'ar';
  const t = translations[lang];

  // Check if any critical doc is expired or rejected
  const hasDocIssues = documents.some(
    (d) => d.isRequired && (d.status === 'expired' || d.status === 'rejected')
  );

  const isOnline = status === 'online';
  const isBusy = status === 'busy';

  return (
    <div className="space-y-4 pb-20">
      {/* Ecosystem Certification Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-950/40 border border-cyan-500/20 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300 font-medium">
            {isAr
              ? 'معتمد ضمن المنظومة الوطنية للنقل WASLA TALIB الجزائر'
              : 'Certified under the WASLA TALIB National Transport Ecosystem'}
          </span>
        </div>
        <button
          onClick={onOpenOnboarding}
          className="text-cyan-400 font-bold hover:underline shrink-0 text-[11px]"
        >
          {isAr ? 'جولة النظام والتعريف ←' : 'Ecosystem Tour →'}
        </button>
      </div>

      {/* Driver Identity Card & Vehicle Header */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500/60 shadow-sm"
              />
              {profile.isVerified && (
                <div
                  title="سائق معتمد"
                  className="absolute -bottom-1 -end-1 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {profile.fullName}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                  {profile.categoryLabelAr}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                <span className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="tabular-nums">{profile.rating}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{profile.wilaya}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{profile.totalTrips} {t.stats.tripsCount}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenVehicles}
            className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Car className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <div className="text-start hidden sm:block">
              <div className="text-[10px] text-slate-400 leading-none">{t.selectedVehicle}</div>
              <div className="text-xs font-bold leading-tight">{activeVehicle.make} {activeVehicle.model}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Prominent Online/Offline Controller */}
      <div
        className={`p-5 rounded-3xl border transition-all ${
          isOnline
            ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
            : isBusy
            ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-amber-950/20 border-amber-500/40'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-start">
            <div className="relative">
              <button
                type="button"
                onClick={onToggleOnline}
                disabled={hasDocIssues}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform active:scale-95 shadow-md ${
                  isOnline
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
                    : isBusy
                    ? 'bg-amber-500 text-white shadow-amber-500/30'
                    : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                } ${hasDocIssues ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Toggle Online Status"
              >
                <Power className="w-8 h-8" />
              </button>
              {isOnline && (
                <div className="absolute -inset-1 rounded-2xl border-2 border-emerald-400 animate-ping pointer-events-none" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {isOnline ? t.online : isBusy ? t.busy : t.offline}
                </span>
                {isOnline && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isOnline
                  ? isAr ? 'جاهز لاستقبال طلبات الركاب والرحلات الفورية' : 'Ready to accept passenger requests'
                  : isBusy
                  ? isAr ? 'أنت في مسار رحلة جارية، أكمل المشوار للعودة للاستقبال' : 'Currently performing a ride'
                  : isAr ? 'انقر على الزر لتفعيل استقبال الطلبات في نطاقك' : 'Tap to start accepting trip requests'}
              </p>
            </div>
          </div>

          {/* Quick checklist */}
          <div className="w-full sm:w-auto p-3 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5 min-w-[210px]">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                {t.locationActive}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-blue-500" />
                {activeVehicle.make} ({activeVehicle.plateNumber})
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                {hasDocIssues ? t.documentsExpiredAlert : t.documentsVerified}
              </span>
              {hasDocIssues ? (
                <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              )}
            </div>
          </div>
        </div>

        {hasDocIssues && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center justify-between">
            <span>{t.cannotGoOnlineReason}</span>
            <button
              onClick={onOpenDocuments}
              className="font-bold underline hover:no-underline"
            >
              {isAr ? 'تجديد الوثائق' : 'Renew Docs'}
            </button>
          </div>
        )}
      </div>

      {/* Primary KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Today's Net Earnings */}
        <div
          onClick={() => onChangeTab('earnings')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-cyan-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stats.todayEarnings}
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
            5,145 <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{t.stats.dzd}</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span>+18%</span>
            <span className="text-slate-400 text-[10px] font-normal">
              {isAr ? 'عن متوسط الأمس' : 'vs yesterday'}
            </span>
          </div>
        </div>

        {/* Completed Trips */}
        <div
          onClick={() => onChangeTab('trips')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-cyan-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stats.completedTrips}
            </span>
            <CheckCircle2 className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
            4 <span className="text-xs font-normal text-slate-400">{t.stats.tripsCount}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {isAr ? 'المستهدف اليومي: 8' : 'Daily target: 8'}
          </div>
        </div>

        {/* Acceptance Rate */}
        <div
          onClick={() => onChangeTab('profile')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-cyan-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stats.acceptanceRate}
            </span>
            <Radio className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
            {profile.acceptanceRate}<span className="text-sm font-semibold">%</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {isAr ? 'معدل ممتاز ومعتمد' : 'Compliant status'}
          </div>
        </div>

        {/* Working Hours */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.stats.workingHours}
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
            4.7 <span className="text-xs font-normal text-slate-400">{t.stats.hoursUnit}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {isAr ? 'الحد الأقصى القانوني: 8 سا' : 'Legal daily cap: 8h'}
          </div>
        </div>
      </div>

      {/* Active Trip Banner if present */}
      {activeTrip && (
        <div
          onClick={() => onChangeTab('trips')}
          className="p-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-3xl shadow-lg shadow-cyan-600/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-2xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[11px] text-cyan-100 font-semibold uppercase tracking-wider">
                  {isAr ? 'رحلة نشطة قيد التنفيذ الآن' : 'Active Ongoing Trip'}
                </div>
                <div className="text-sm font-bold mt-0.5">
                  {activeTrip.request.passengerName} · {activeTrip.request.fareDzd} {t.stats.dzd}
                </div>
                <div className="text-xs text-cyan-100 truncate max-w-xs sm:max-w-md mt-0.5">
                  {activeTrip.request.dropoffAddress}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 font-bold text-xs bg-white text-cyan-900 px-3 py-2 rounded-xl group-hover:scale-105 transition-transform shrink-0">
              <span>{isAr ? 'متابعة المسار' : 'View Trip'}</span>
              {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>
        </div>
      )}

      {/* Pending Incoming Requests Trigger Card */}
      {pendingRequests.length > 0 && (
        <div
          onClick={() => onChangeTab('requests')}
          className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/40 rounded-3xl flex items-center justify-between gap-3 cursor-pointer hover:border-amber-500 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              {pendingRequests.length}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {isAr ? 'توجد طلبات نقل جديدة واردة' : 'New incoming requests available'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {isAr ? 'مشاوير بانتظار استجابتك وقبولك الفوري' : 'Rides awaiting your immediate response'}
              </div>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-xs">
            {isAr ? 'عرض الطلبات' : 'Open'}
          </button>
        </div>
      )}

      {/* Next Scheduled Trip */}
      {scheduledTrips.length > 0 && (
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isAr ? 'الرحلة المجدولة القادمة' : 'Next Scheduled Intercity Trip'}</span>
            </h3>
            <button
              onClick={() => onChangeTab('trips')}
              className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
            >
              {isAr ? 'عرض الجدول ←' : 'Full Schedule →'}
            </button>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                <span>{scheduledTrips[0].departureWilaya}</span>
                <span className="text-cyan-600 font-bold">➜</span>
                <span>{scheduledTrips[0].destinationWilaya}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                <span>{scheduledTrips[0].date}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {scheduledTrips[0].time}
                </span>
                <span aria-hidden="true">·</span>
                <span>{scheduledTrips[0].passengerCount} ركاب</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
              <div className="text-start sm:text-end">
                <div className="text-xs font-black text-slate-900 dark:text-slate-100 tabular-nums">
                  {scheduledTrips[0].fareDzd} {t.stats.dzd}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">مؤكدة نظامياً</div>
              </div>
              <button
                onClick={() => onChangeTab('trips')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold"
              >
                {isAr ? 'تفاصيل' : 'Details'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Dock */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-3">
          {isAr ? 'الإجراءات التشغيلية السريعة' : 'Operational Quick Actions'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onChangeTab('requests')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t.quickActions.viewRequests}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              {pendingRequests.length} {isAr ? 'طلبات جاهزة' : 'ready requests'}
            </p>
          </button>

          <button
            onClick={onOpenVehicles}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t.quickActions.vehicles}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              {activeVehicle.make} {activeVehicle.model}
            </p>
          </button>

          <button
            onClick={onOpenDocuments}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t.quickActions.complianceDocs}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              {documents.filter((d) => d.status === 'approved').length}/{documents.length} {isAr ? 'وثيقة معتمدة' : 'approved'}
            </p>
          </button>

          <button
            onClick={onOpenSupport}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t.quickActions.support}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              {isAr ? 'تذاكر الدعم والنزاعات' : 'Help & dispute tickets'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
