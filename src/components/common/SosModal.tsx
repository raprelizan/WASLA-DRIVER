import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Share2, AlertTriangle, X, CheckCircle2, Copy } from 'lucide-react';
import { Language } from '../../types';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [panicCountdown, setPanicCountdown] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleShareLink = () => {
    navigator.clipboard?.writeText?.('https://wasla-talib.dz/track/trip/DZ-89412-SECURE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTriggerPanic = () => {
    setPanicCountdown(5);
    const interval = setInterval(() => {
      setPanicCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    setReportSent(true);
    setTimeout(() => {
      setReportSent(false);
      setReportReason('');
      onClose();
    }, 2000);
  };

  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-red-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-700/60 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {isAr ? 'مركز طوارئ وسلامة السائق' : lang === 'fr' ? 'Centre de Sécurité & Urgences' : 'Driver Safety & Emergency Hub'}
              </h3>
              <p className="text-xs text-red-100">
                {isAr ? 'بروتوكول الأمان المباشر في الجزائر' : 'Direct Algerian Safety Protocol'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-700/50 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Important demonstration notice */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 dark:text-amber-300 text-xs">
            {isAr
              ? 'تنويه نظامي: هذه واجهة محاكاة لبروتوكول السلامة. لا تتصل بخدمات الطوارئ الفعلية إلا في الحالات الميدانية الحقيقية عبر الأرقام الوطنية المعتمدة أدناه.'
              : 'Notice: Operational safety demonstration mode. Use official Algerian emergency numbers directly in real emergency situations.'}
          </div>

          {/* Quick Emergency Numbers in Algeria */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-600 dark:text-red-400" />
              {isAr ? 'أرقام النجدة والطوارئ الوطنية في الجزائر' : 'Algerian National Emergency Hotlines'}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <a
                href="tel:14"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-red-500 transition-all text-center group"
              >
                <div className="text-xl font-black text-red-600 dark:text-red-400 font-mono">14</div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-1">
                  {isAr ? 'الحماية المدنية' : 'Protection Civile'}
                </div>
              </a>
              <a
                href="tel:1548"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all text-center group"
              >
                <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">1548</div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-1">
                  {isAr ? 'الأمن الوطني (الشرطة)' : 'Police Nationale'}
                </div>
              </a>
              <a
                href="tel:1055"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all text-center group"
              >
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">1055</div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-1">
                  {isAr ? 'الدرك الوطني' : 'Gendarmerie'}
                </div>
              </a>
            </div>
          </div>

          {/* Share trip tracking */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  {isAr ? 'مشاركة مسار الرحلة المباشر' : 'Share Live Trip Route'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isAr
                    ? 'أرسل رابط تتبع مباشر وموقع GPS اللحظي لعائلتك أو لغرفة عمليات WASLA'
                    : 'Share live GPS route link with family or WASLA dispatch team.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleShareLink}
                className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'تم النسخ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{isAr ? 'نسخ الرابط' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Instant Emergency Dispatch Simulation */}
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl">
            <h4 className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">
              {isAr ? 'زر الإنذار الصامت لغرفة العمليات' : 'Silent Emergency Alert to Operations'}
            </h4>
            <p className="text-xs text-red-600/80 dark:text-red-400/80 mb-3">
              {isAr
                ? 'يبث إشارة إنذار طارئة مشفرة لغرفة عمليات وصلة مع إحداثيات موقعك'
                : 'Sends silent distress beacon to WASLA safety team with live coordinates.'}
            </p>

            {panicCountdown === null ? (
              <button
                type="button"
                onClick={handleTriggerPanic}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-red-600/20 active:scale-[0.98]"
              >
                {isAr ? 'تفعيل إنذار الطوارئ الفوري' : 'Trigger Immediate Emergency Alarm'}
              </button>
            ) : panicCountdown > 0 ? (
              <div className="space-y-2 text-center">
                <div className="text-sm font-bold text-red-600 dark:text-red-400">
                  {isAr ? `سيتم إرسال الإنذار خلال ${panicCountdown} ثوانٍ...` : `Sending beacon in ${panicCountdown}s...`}
                </div>
                <button
                  type="button"
                  onClick={() => setPanicCountdown(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold"
                >
                  {isAr ? 'إلغاء الإنذار' : 'Cancel Alert'}
                </button>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {isAr
                    ? 'تم إرسال إشارة الطوارئ بنجاح لغرفة العمليات المركزية.'
                    : 'Emergency beacon broadcasted to WASLA central dispatch.'}
                </span>
              </div>
            )}
          </div>

          {/* Incident / Passenger report form */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              {isAr ? 'تسجيل إفادة أو مشكلة في المسار' : 'Report Route or Passenger Incident'}
            </h4>
            {reportSent ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 rounded-xl text-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                {isAr ? 'تم استلام تقريرك وسيتم التواصل معك من فريق الأمن والسلامة' : 'Report received by safety team.'}
              </div>
            ) : (
              <form onSubmit={handleSendIncident} className="space-y-3">
                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder={
                    isAr
                      ? 'وضح تفاصيل الواقعة (سلوك غير لائق، عطل ميكانيكي، مشكلة أمنية)...'
                      : 'Describe incident details (misconduct, mechanical issue, route obstruction)...'
                  }
                  rows={3}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  disabled={!reportReason.trim()}
                  className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                >
                  {isAr ? 'إرسال التقرير للأمان' : 'Submit Safety Report'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
