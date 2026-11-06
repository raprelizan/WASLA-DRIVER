import React, { useState } from 'react';
import { X, FileText, Camera, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { DriverDocument, Language } from '../../types';

interface UploadDocumentModalProps {
  document: DriverDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveDocument: (docId: string, docNumber: string, expiryDate: string) => void;
  lang: Language;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  document,
  isOpen,
  onClose,
  onSaveDocument,
  lang,
}) => {
  const isAr = lang === 'ar';

  const [docNumber, setDocNumber] = useState(document?.documentNumber || '');
  const [expiryDate, setExpiryDate] = useState(document?.expiryDate || '2028-12-31');
  const [hasFile, setHasFile] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!isOpen || !document) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveDocument(document.id, docNumber, expiryDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {isAr ? 'تحديث وتجديد الوثيقة الرسمية' : 'Update Regulatory Document'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {isAr ? document.titleAr : lang === 'fr' ? document.titleFr : document.titleEn}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            {isAr ? 'الرقم الإداري الحالي:' : 'Reference:'} {document.documentNumber}
          </div>
        </div>

        {/* Camera / Upload Simulation View */}
        <div className="relative w-full h-36 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-4 text-center">
          {hasFile ? (
            <div className="space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isAr ? 'تم تجهيز صورة المستند للمراجعة' : 'Document photo ready'}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">SCAN_DZ_DOC_2026.PDF</div>
            </div>
          ) : (
            <div className="space-y-1">
              <Upload className="w-6 h-6 text-slate-400 mx-auto" />
              <div className="text-xs text-slate-500">
                {isAr ? 'التقط صورة واضحة أو اختر ملفاً من الجهاز' : 'Capture or upload clear photo'}
              </div>
            </div>
          )}

          <div className="absolute bottom-2 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setHasFile(true);
                setIsCapturing(true);
                setTimeout(() => setIsCapturing(false), 1200);
              }}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 shadow-xs"
            >
              <Camera className="w-3 h-3" />
              <span>{isCapturing ? (isAr ? 'جاري الالتقاط...' : 'Capturing...') : (isAr ? 'التقاط عبر الكاميرا' : 'Camera')}</span>
            </button>
            <button
              type="button"
              onClick={() => setHasFile(true)}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 shadow-xs"
            >
              <Upload className="w-3 h-3" />
              <span>{isAr ? 'رفع ملف' : 'Upload'}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'رقم الوثيقة / الشهادة الرسمية' : 'Document / License ID'}
            </label>
            <input
              type="text"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'تاريخ نهاية الصلاحية (Expiry Date)' : 'Expiry Date'}
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="submit"
              className="py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              {isAr ? 'حفظ وإرسال للمراجعة' : 'Save & Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
