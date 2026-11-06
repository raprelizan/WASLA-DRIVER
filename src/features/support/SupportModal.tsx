import React, { useState } from 'react';
import {
  X,
  LifeBuoy,
  HelpCircle,
  Plus,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { SupportTicket, Language } from '../../types';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: SupportTicket[];
  onCreateTicket: (category: SupportTicket['category'], subject: string, description: string) => void;
  lang: Language;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  tickets,
  onCreateTicket,
  lang,
}) => {
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'faq' | 'tickets' | 'new'>('tickets');
  const [category, setCategory] = useState<SupportTicket['category']>('payment');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'كيف يتم تحويل أرباح الرحلات إلى حساب بريدي موب؟',
      a: 'تتم التسوية فورياً عند طلب السحب من قسم الأرباح، ويتم قيد المبلغ في حسابك خلال ساعات العمل الرسمية عبر منصة النقد الآلي.',
    },
    {
      q: 'ماذا أفعل إذا تغيب الطالب أو الراكب عند محطة الانطلاق؟',
      a: 'بعد انتظار 5 دقائق كاملة في موقع الركوب، يتيح لك التطبيق تسجيل حالة "عدم حضور" مع الحفاظ على حقك في تعويض وقت الانتظار.',
    },
    {
      q: 'كيف أغير المركبة النشطة إلى حافلة نقل جامعي أو تاكسي؟',
      a: 'من صفحة "حسابي"، انقر على "إدارة المركبات" واختر المركبة المعتمدة المناسبة لطبيعة الخدمة الحالية.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    onCreateTicket(category, subject, description);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject('');
      setDescription('');
      setActiveTab('tickets');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {isAr ? 'مركز الدعم والمساندة التشغيلية' : 'Operational Driver Support'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'tickets'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            {isAr ? 'تذاكري السابقة' : 'My Tickets'} ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'new'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            {isAr ? 'فتح تذكرة جديدة' : 'New Ticket'}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'faq'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
          </button>
        </div>

        {/* TAB 1: TICKETS LIST */}
        {activeTab === 'tickets' && (
          <div className="space-y-3">
            {tickets.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                {isAr ? 'لا توجد تذاكر مسجلة حالياً' : 'No support tickets'}
              </div>
            ) : (
              tickets.map((tck) => (
                <div
                  key={tck.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      #{tck.ticketNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        tck.status === 'resolved'
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                      }`}
                    >
                      {tck.status === 'resolved'
                        ? isAr ? 'تم الحل والتسوية' : 'Resolved'
                        : isAr ? 'قيد المتابعة' : 'In Review'}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 dark:text-slate-100">{tck.subject}</div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    {tck.description}
                  </p>

                  {tck.lastResponse && (
                    <div className="p-2.5 bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-cyan-800 dark:text-cyan-300 text-[11px]">
                      <span className="font-bold block mb-0.5">{isAr ? 'رد فريق الدعم:' : 'Support Response:'}</span>
                      {tck.lastResponse}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 pt-1 flex justify-between">
                    <span>{tck.createdAt}</span>
                    <span className="capitalize">{tck.category}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: NEW TICKET */}
        {activeTab === 'new' && (
          <div>
            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div className="font-bold text-sm text-emerald-800 dark:text-emerald-200">
                  {isAr ? 'تم فتح تذكرة المساعدة بنجاح' : 'Ticket Created'}
                </div>
                <div className="text-xs text-slate-500">
                  {isAr ? 'سيقوم مشرف العمليات بالرد خلال 15 دقيقة.' : 'Agent will respond shortly.'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'تصنيف المشكلة' : 'Issue Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SupportTicket['category'])}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  >
                    <option value="payment">{isAr ? 'المدفوعات والمحفظة المالية' : 'Payments & Wallet'}</option>
                    <option value="trip">{isAr ? 'مشكلة أثناء الرحلة أو المسار' : 'Trip Incident'}</option>
                    <option value="passenger">{isAr ? 'سلوك أو بلاغ بخصوص راكب' : 'Passenger Dispute'}</option>
                    <option value="vehicle">{isAr ? 'اعتماد المركبة أو وثائقها' : 'Vehicle & Compliance'}</option>
                    <option value="technical">{isAr ? 'خلل تقني في التطبيق' : 'Technical Issue'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'موضوع التذكرة' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={isAr ? 'عنوان ملخص للمشكلة...' : 'Summary...'}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'تفاصيل الواقعة أو الاستفسار' : 'Detailed Description'}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={isAr ? 'يرجى ذكر رقم الرحلة أو اسم المحطة إن وجد...' : 'Provide details...'}
                    rows={4}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  {isAr ? 'إرسال التذكرة' : 'Submit Ticket'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 ps-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
