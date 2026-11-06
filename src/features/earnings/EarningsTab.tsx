import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Receipt,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard,
  Building,
  ChevronRight,
  ChevronLeft,
  X,
  FileText
} from 'lucide-react';
import { EarningTransaction, Language } from '../../types';
import { translations } from '../../services/i18n';

interface EarningsTabProps {
  transactions: EarningTransaction[];
  onRequestWithdrawal: (amount: number, method: string, accountDetails: string) => void;
  lang: Language;
}

export const EarningsTab: React.FC<EarningsTabProps> = ({
  transactions,
  onRequestWithdrawal,
  lang,
}) => {
  const isAr = lang === 'ar';
  const t = translations[lang].earnings;

  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<EarningTransaction | null>(null);

  // Form states for payout
  const [withdrawAmount, setWithdrawAmount] = useState('15000');
  const [payoutMethod, setPayoutMethod] = useState<'baridimob' | 'ccp' | 'bank'>('baridimob');
  const [accountNumber, setAccountNumber] = useState('0079999900021489245');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Available balance
  const availableBalance = 18450;

  // Chart data for weekly earnings
  const weeklyData = [
    { dayAr: 'السبت', dayEn: 'Sat', amount: 6200 },
    { dayAr: 'الأحد', dayEn: 'Sun', amount: 7800 },
    { dayAr: 'الاثنين', dayEn: 'Mon', amount: 5400 },
    { dayAr: 'الثلاثاء', dayEn: 'Tue', amount: 8900 },
    { dayAr: 'الأربعاء', dayEn: 'Wed', amount: 9200 },
    { dayAr: 'الخميس', dayEn: 'Thu', amount: 11400 },
    { dayAr: 'الجمعة', dayEn: 'Fri', amount: 5145 },
  ];

  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  const handleConfirmWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(withdrawAmount);
    if (!num || num <= 0 || num > availableBalance) return;
    onRequestWithdrawal(num, payoutMethod, accountNumber);
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setShowWithdrawModal(false);
    }, 2000);
  };

  const handleExportStatement = () => {
    const csvRows = [
      ['Transaction ID', 'Date', 'Time', 'Trip Ref', 'Gross Fare (DZD)', 'Commission (DZD)', 'Net Amount (DZD)', 'Payment Method', 'Status', 'Route'],
      ...transactions.map((t) => [
        t.id,
        t.date,
        t.time,
        t.tripRef,
        t.grossFareDzd,
        t.commissionDzd,
        t.netAmountDzd,
        t.paymentMethod,
        t.status,
        t.routeSummary || '—',
      ]),
    ];
    const csvContent = '\uFEFF' + csvRows.map((e) => e.map((val) => `"${val}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wasla_driver_statement_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header & Demo Disclaimer */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isAr ? 'إدارة المداخيل، العمولات، والتحويل إلى الحسابات الجزائرية' : 'Financial overview & payout management'}
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setPeriod('today')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              period === 'today'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {t.today}
          </button>
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              period === 'week'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {t.thisWeek}
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              period === 'month'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {t.thisMonth}
          </button>
        </div>
      </div>

      {/* Demonstration Data Alert */}
      <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-between gap-2 text-xs text-cyan-700 dark:text-cyan-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-500 shrink-0" />
          <span>{t.demoNotice}</span>
        </div>
        <span className="text-[10px] bg-cyan-600 text-white font-mono px-2 py-0.5 rounded-full font-bold">
          DZD
        </span>
      </div>

      {/* MAIN BALANCE & PAYOUT CARD */}
      <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-3xl text-white shadow-xl shadow-cyan-950/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-300 font-medium">
              {t.withdrawableBalance}
            </span>
          </div>

          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
            {isAr ? 'جاهز للتحويل الفوري' : 'Instant Payout Available'}
          </span>
        </div>

        <div>
          <div className="text-3xl sm:text-4xl font-black tabular-nums tracking-tight">
            {availableBalance.toLocaleString()}{' '}
            <span className="text-base sm:text-lg font-bold text-cyan-400">د.ج</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {isAr
              ? 'الحساب المصرفي المرتبط: بريدي موب (BaridiMob RIP)'
              : 'Linked Payout Account: BaridiMob RIP'}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowWithdrawModal(true)}
            className="w-full py-3.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-cyan-500/30 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{t.requestPayout}</span>
          </button>
        </div>
      </div>

      {/* FINANCIAL BREAKDOWN CARDS */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="text-[10px] text-slate-400 font-medium">{t.grossFares}</div>
          <div className="text-base font-black text-slate-900 dark:text-slate-100 tabular-nums mt-1">
            {period === 'today' ? '5,550' : period === 'week' ? '54,045' : '198,200'}{' '}
            <span className="text-[10px] font-normal text-slate-400">د.ج</span>
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="text-[10px] text-amber-500 font-medium">{t.platformCommission} (10%)</div>
          <div className="text-base font-black text-amber-500 tabular-nums mt-1">
            {period === 'today' ? '-555' : period === 'week' ? '-5,400' : '-19,820'}{' '}
            <span className="text-[10px] font-normal text-slate-400">د.ج</span>
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="text-[10px] text-emerald-600 font-medium">{t.adjustments}</div>
          <div className="text-base font-black text-emerald-600 tabular-nums mt-1">
            {period === 'today' ? '+150' : period === 'week' ? '+1,200' : '+4,500'}{' '}
            <span className="text-[10px] font-normal text-slate-400">د.ج</span>
          </div>
        </div>
      </div>

      {/* WEEKLY EARNINGS BAR CHART */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{isAr ? 'منحنى الدخل الأسبوعي (بالدينار الجزائري)' : 'Weekly Earnings Distribution (DZD)'}</span>
          </h3>
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
            54,045 د.ج {isAr ? 'الإجمالي' : 'Total'}
          </span>
        </div>

        {/* SVG/CSS Bar Chart */}
        <div className="h-44 pt-6 flex items-end justify-between gap-2 px-1">
          {weeklyData.map((item, idx) => {
            const heightPercent = Math.round((item.amount / maxAmount) * 100);
            const isToday = idx === weeklyData.length - 1;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums whitespace-nowrap">
                  {item.amount}
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl h-32 flex items-end p-1">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-cyan-500 shadow-md shadow-cyan-500/30'
                        : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-400'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold ${
                    isToday ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isAr ? item.dayAr : item.dayEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRANSACTION HISTORY */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {t.historyTitle}
            </h3>
            <span className="text-[10px] text-slate-400">
              {isAr ? 'انقر على العملية لمعاينة الإشعار المالي' : 'Click to view receipt'}
            </span>
          </div>
          <button
            onClick={handleExportStatement}
            className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-500" />
            <span>{isAr ? 'تصدير الكشف (CSV)' : 'Export CSV'}</span>
          </button>
        </div>

        <div className="space-y-2">
          {transactions.map((txn) => {
            const isWithdrawal = txn.type === 'withdrawal';
            return (
              <div
                key={txn.id}
                onClick={() => setSelectedTxn(txn)}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isWithdrawal
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isWithdrawal ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      {isWithdrawal
                        ? isAr ? 'طلب سحب رصيد' : 'Balance Payout'
                        : txn.routeSummary || txn.tripRef}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>{txn.date} · {txn.time}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase font-mono">{txn.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="text-end shrink-0">
                  <div
                    className={`font-black text-xs tabular-nums ${
                      isWithdrawal ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {txn.netAmountDzd > 0 ? `+${txn.netAmountDzd}` : txn.netAmountDzd} د.ج
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {txn.status === 'settled' ? (isAr ? 'تمت التسوية' : 'Settled') : (isAr ? 'معلقة' : 'Pending')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WITHDRAWAL MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {t.payoutModalTitle}
              </h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {withdrawSuccess ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-200">
                  {isAr ? 'تم تسجيل طلب التحويل بنجاح' : 'Withdrawal Request Submitted'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr
                    ? 'سيتم إيداع المبلغ في حسابك خلال 2 إلى 4 ساعات عمل.'
                    : 'Funds will arrive in your account within 2-4 business hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmWithdrawal} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اختر وسيلة التحويل المالية بالجزائر' : 'Select Payout Channel'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPayoutMethod('baridimob');
                        setAccountNumber('0079999900021489245');
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        payoutMethod === 'baridimob'
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-cyan-500" />
                      <span>بريدي موب</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPayoutMethod('ccp');
                        setAccountNumber('00214892 Clé 45');
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        payoutMethod === 'ccp'
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <FileText className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                      <span>CCP الجزائر</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPayoutMethod('bank');
                        setAccountNumber('002 00012 1234567890 22');
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        payoutMethod === 'bank'
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Building className="w-4 h-4 mx-auto mb-1 text-indigo-500" />
                      <span>حساب بنكي</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.amountToWithdraw}
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={availableBalance}
                    min={1000}
                    className="w-full p-2.5 text-xs font-mono font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{isAr ? 'الحد الأدنى: 1,000 د.ج' : 'Min: 1,000 DZD'}</span>
                    <span>{isAr ? `الرصيد المتاح: ${availableBalance} د.ج` : `Max: ${availableBalance} DZD`}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'رقم الحساب / المعرف (RIP / CCP / RIB)' : 'Account Reference'}
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-[10px] text-slate-500 leading-relaxed">
                  {isAr
                    ? 'التحويل يتم آلياً وبدون رسوم اقتطاع بنكية عبر شراكة شبكة النقد الآلي وبريد الجزائر.'
                    : 'Automatic settlement through Algérie Poste network.'}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-600/30 transition-all"
                >
                  {t.confirmWithdrawal}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TRANSACTION RECEIPT MODAL */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {t.receiptTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'المرجع' : 'Ref'}:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'رقم الرحلة' : 'Trip ID'}:</span>
                <span className="font-mono text-cyan-600">{selectedTxn.tripRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'التاريخ والوقت' : 'Date & Time'}:</span>
                <span className="text-slate-700 dark:text-slate-300">{selectedTxn.date} · {selectedTxn.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'المسار' : 'Route'}:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTxn.routeSummary || '—'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">{isAr ? 'الأجرة الإجمالية' : 'Gross Fare'}:</span>
                <span className="font-mono font-bold tabular-nums">{selectedTxn.grossFareDzd} د.ج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-500">{isAr ? 'عمولة منصة وصلة' : 'Platform Fee'}:</span>
                <span className="font-mono text-amber-500 tabular-nums">-{selectedTxn.commissionDzd} د.ج</span>
              </div>
              {selectedTxn.adjustmentsDzd > 0 && (
                <div className="flex justify-between">
                  <span className="text-emerald-600">{isAr ? 'حوافز تشجيعية' : 'Bonus'}:</span>
                  <span className="font-mono text-emerald-600 tabular-nums">+{selectedTxn.adjustmentsDzd} د.ج</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-black text-slate-900 dark:text-slate-100">
                <span>{isAr ? 'الصافي المستلم' : 'Net Received'}:</span>
                <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {selectedTxn.netAmountDzd} د.ج
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl"
            >
              {isAr ? 'إغلاق الإشعار' : 'Close Receipt'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
