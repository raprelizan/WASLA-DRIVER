import React, { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Clock,
  AlertTriangle,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Send,
  Building
} from 'lucide-react';
import { UniversityTransportState, Language } from '../../types';
import { translations } from '../../services/i18n';

interface UniversityTransportViewProps {
  universityState: UniversityTransportState;
  onAdvanceStation: () => void;
  onAddDelay: (reason: string) => void;
  lang: Language;
}

export const UniversityTransportView: React.FC<UniversityTransportViewProps> = ({
  universityState,
  onAdvanceStation,
  onAddDelay,
  lang,
}) => {
  const isAr = lang === 'ar';
  const t = translations[lang].universityMode;

  const [showDelayModal, setShowDelayModal] = useState(false);
  const [delayText, setDelayText] = useState('');
  const [studentsCount, setStudentsCount] = useState(universityState.totalBoardedStudents);

  const currentStop = universityState.stops[universityState.currentStopIndex];

  const handleReportDelay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delayText.trim()) return;
    onAddDelay(delayText);
    setDelayText('');
    setShowDelayModal(false);
  };

  return (
    <div className="space-y-4">
      {/* University Header Banner */}
      <div className="p-5 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-indigo-950/20 border border-indigo-500/30 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {universityState.institution}
                </span>
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                {universityState.routeCode} · {universityState.busNumber}
              </p>
            </div>
          </div>

          <div className="text-end">
            <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
              {isAr ? 'نحو القطب الجامعي' : 'To Campus'}
            </span>
          </div>
        </div>

        {/* Current Campus Stop Controller */}
        <div className="p-3.5 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {isAr ? 'المحطة الحالية للطلبة' : 'Current Student Stop'} ({universityState.currentStopIndex + 1}/{universityState.stops.length})
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {currentStop ? currentStop.campusName : 'تم إنهاء دورة النقل بنجاح'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowDelayModal(true)}
              className="px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isAr ? 'إبلاغ عن تأخير' : 'Report Delay'}</span>
            </button>

            <button
              onClick={onAdvanceStation}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-indigo-600/20"
            >
              <span>{t.departStation}</span>
              {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Boarding Counter & Schedule */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.studentsOnboard}
            </span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
            {studentsCount} <span className="text-xs font-normal text-slate-400">{isAr ? 'طالباً' : 'students'}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setStudentsCount((prev) => Math.max(0, prev - 1))}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold"
            >
              -1
            </button>
            <button
              onClick={() => setStudentsCount((prev) => prev + 1)}
              className="px-2 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-lg text-xs font-bold"
            >
              +1
            </button>
            <span className="text-[10px] text-slate-400 ms-auto">
              {isAr ? 'السعة: 50 مقعد' : 'Max: 50'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isAr ? 'مواعيد الجولات' : 'Trip Schedule'}
            </span>
            <Clock className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
            07:15 ➜ 08:30
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            {isAr ? 'جولة العودة المسائية مبرمجة على 16:30' : 'Evening return scheduled for 16:30'}
          </p>
        </div>
      </div>

      {/* Campus Route Station Checklist */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
          {isAr ? 'محطات المسار المعتمدة' : 'Campus Stations'}
        </h3>

        <div className="space-y-2">
          {universityState.stops.map((stp, idx) => (
            <div
              key={stp.id}
              className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                stp.isCompleted
                  ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-70'
                  : idx === universityState.currentStopIndex
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500/40'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    stp.isCompleted
                      ? 'bg-emerald-500 text-white'
                      : idx === universityState.currentStopIndex
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
                  }`}
                >
                  {stp.isCompleted ? '✓' : idx + 1}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{stp.campusName}</div>
                  <div className="text-[10px] text-slate-400">
                    {isAr ? `الوصول: ${stp.arrivalTime} · الانطلاق: ${stp.departureTime}` : `${stp.arrivalTime} - ${stp.departureTime}`}
                  </div>
                </div>
              </div>

              {stp.waitingStudentsCount > 0 && (
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                  {stp.waitingStudentsCount} {isAr ? 'ينتظرون' : 'waiting'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reported Delays Alert */}
      {universityState.delaysReported.length > 0 && (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{isAr ? 'الإشعارات المرورية وبلاغات التأخير' : 'Traffic Delay Alerts'}</span>
          </div>
          {universityState.delaysReported.map((d, i) => (
            <div key={i} className="text-xs text-slate-600 dark:text-slate-300 ps-6">
              <span className="font-mono font-bold text-amber-600">{d.time}:</span> {d.reason}
            </div>
          ))}
        </div>
      )}

      {/* DELAY REPORT MODAL */}
      {showDelayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {isAr ? 'إبلاغ عن تأخير في مسار الطلبة' : 'Report Campus Route Delay'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'سيتم إشعار الطلبة المنتظرين في المحطات وإدارة شؤون الإقامة آلياً.'
                : 'Notifies waiting students and campus dispatch.'}
            </p>

            <form onSubmit={handleReportDelay} className="space-y-3">
              <textarea
                value={delayText}
                onChange={(e) => setDelayText(e.target.value)}
                placeholder={isAr ? 'سبب التأخير (ازدحام مروري، حادث، تحويل طريق)...' : 'Reason for delay...'}
                rows={3}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={!delayText.trim()}
                  className="flex-1 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl disabled:opacity-50"
                >
                  {isAr ? 'إرسال الإشعار للطلبة' : 'Broadcast Delay'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDelayModal(false)}
                  className="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
