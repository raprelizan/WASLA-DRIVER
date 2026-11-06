import React, { useState } from 'react';
import {
  Bus,
  QrCode,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  MapPin,
  Clock,
  Scan,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Camera
} from 'lucide-react';
import { BusOperationState, BusSeat, Language } from '../../types';
import { translations } from '../../services/i18n';
import { soundService } from '../../utils/audio';

interface BusOperationsViewProps {
  busState: BusOperationState;
  onUpdateSeatStatus: (seatId: string, status: BusSeat['status']) => void;
  onAdvanceStop: () => void;
  lang: Language;
}

export const BusOperationsView: React.FC<BusOperationsViewProps> = ({
  busState,
  onUpdateSeatStatus,
  onAdvanceStop,
  lang,
}) => {
  const isAr = lang === 'ar';
  const t = translations[lang].busMode;

  const [selectedSeat, setSelectedSeat] = useState<BusSeat | null>(null);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: 'valid' | 'alreadyUsed' | 'invalid' | 'wrongRoute';
    message: string;
    ticketCode: string;
    studentName?: string;
  } | null>(null);

  const currentStop = busState.stops[busState.currentStopIndex];

  const [manualCode, setManualCode] = useState('');

  // Simulated ticket validation tester
  const handleValidateTestCode = (sampleType: 'valid' | 'alreadyUsed' | 'invalid' | 'wrongRoute') => {
    if (sampleType === 'valid') {
      soundService.playSuccessBeep();
      setScanResult({
        status: 'valid',
        message: t.validationResults.valid,
        ticketCode: 'WT-ALG-9842-VALID',
        studentName: 'محمد لمين بن سالم (طالب كلية الطب)',
      });
      // Mark an available seat as occupied
      const firstAvailable = busState.seats.find((s) => s.status === 'available');
      if (firstAvailable) {
        onUpdateSeatStatus(firstAvailable.id, 'occupied');
      }
    } else if (sampleType === 'alreadyUsed') {
      soundService.playErrorBuzz();
      setScanResult({
        status: 'alreadyUsed',
        message: t.validationResults.alreadyUsed,
        ticketCode: 'WT-ALG-9004-USED',
        studentName: 'طالب جامعي 4 (تم استخدامه في محطة الحراش)',
      });
    } else if (sampleType === 'wrongRoute') {
      soundService.playErrorBuzz();
      setScanResult({
        status: 'wrongRoute',
        message: t.validationResults.wrongRoute,
        ticketCode: 'WT-BLI-1102-WRONG',
        studentName: 'تذكرة خاصة بخط جامعة البليدة علي لونيسي',
      });
    } else {
      soundService.playErrorBuzz();
      setScanResult({
        status: 'invalid',
        message: t.validationResults.invalid,
        ticketCode: 'INVALID-CODE-0000',
      });
    }
  };

  const handleValidateManualCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    if (manualCode.toUpperCase().includes('WT') || manualCode.length >= 6) {
      handleValidateTestCode('valid');
    } else {
      handleValidateTestCode('invalid');
    }
    setManualCode('');
  };

  const getSeatColor = (status: BusSeat['status']) => {
    switch (status) {
      case 'occupied':
        return 'bg-emerald-500 text-white border-emerald-600 shadow-xs';
      case 'reserved':
        return 'bg-cyan-500 text-white border-cyan-600 shadow-xs';
      case 'no_show':
        return 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-cyan-500';
    }
  };

  const occupiedCount = busState.seats.filter((s) => s.status === 'occupied').length;
  const reservedCount = busState.seats.filter((s) => s.status === 'reserved').length;
  const availableCount = busState.seats.filter((s) => s.status === 'available').length;

  return (
    <div className="space-y-4">
      {/* Bus Route Header */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-slate-900 dark:text-slate-100">
                  {busState.routeNumber}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                  {busState.busPlate}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {busState.routeName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowScannerModal(true)}
            className="px-3.5 py-2 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-600/20 transition-transform active:scale-95"
          >
            <QrCode className="w-4 h-4" />
            <span>{t.scanTicketQr}</span>
          </button>
        </div>

        {/* Current Stop Progression Banner */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {isAr ? 'المحطة الحالية' : 'Current Stop'} ({busState.currentStopIndex + 1}/{busState.stops.length})
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {currentStop ? currentStop.stationName : 'نهاية الخط'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
            <div className="text-start sm:text-end text-xs text-slate-500">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{currentStop?.scheduledTime}</span>
              <span className="mx-1">·</span>
              <span>{currentStop?.passengersBoarding} صعود</span>
            </div>

            <button
              onClick={onAdvanceStop}
              className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1"
            >
              <span>{t.confirmDeparture}</span>
              {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Capacity & Seat Stats */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="text-[10px] text-slate-400">{isAr ? 'السعة الكلية' : 'Capacity'}</div>
          <div className="text-base font-black text-slate-900 dark:text-slate-100 tabular-nums mt-0.5">
            {busState.capacity}
          </div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="text-[10px] text-emerald-600 font-semibold">{t.seatOccupied}</div>
          <div className="text-base font-black text-emerald-600 tabular-nums mt-0.5">
            {occupiedCount}
          </div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="text-[10px] text-cyan-600 font-semibold">{t.seatReserved}</div>
          <div className="text-base font-black text-cyan-600 tabular-nums mt-0.5">
            {reservedCount}
          </div>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="text-[10px] text-slate-500 font-semibold">{t.seatAvailable}</div>
          <div className="text-base font-black text-slate-700 dark:text-slate-300 tabular-nums mt-0.5">
            {availableCount}
          </div>
        </div>
      </div>

      {/* VISUAL BUS SEAT MATRIX */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {t.seatMap}
          </h3>
          <span className="text-[10px] text-slate-400">
            {isAr ? 'انقر على المقعد للاطلاع على الراكب أو تغيير حالته' : 'Click seat to view passenger'}
          </span>
        </div>

        {/* Bus Layout Graphic */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm mx-auto">
          {/* Driver Cockpit Indicator */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <Bus className="w-3.5 h-3.5" />
              {isAr ? 'مقصورة السائق والباب الأمامي' : 'Front Driver Door'}
            </span>
            <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-md">
              {isAr ? 'ممر الحافلة' : 'Central Aisle'}
            </span>
          </div>

          {/* Seat Grid: 9 rows of 4 seats (2 left - aisle - 2 right) */}
          <div className="space-y-2">
            {Array.from({ length: 9 }).map((_, rowIdx) => {
              const rowSeats = busState.seats.slice(rowIdx * 4, rowIdx * 4 + 4);
              return (
                <div key={rowIdx} className="flex items-center justify-between gap-1">
                  {/* Left 2 seats */}
                  <div className="flex items-center gap-1.5">
                    {rowSeats.slice(0, 2).map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => setSelectedSeat(seat)}
                        className={`w-9 h-9 rounded-xl border font-mono font-bold text-xs flex items-center justify-center transition-transform active:scale-90 ${getSeatColor(
                          seat.status
                        )}`}
                      >
                        {seat.seatNumber}
                      </button>
                    ))}
                  </div>

                  {/* Central Aisle */}
                  <div className="w-6 text-center text-[10px] text-slate-300 dark:text-slate-700 font-mono">
                    ·
                  </div>

                  {/* Right 2 seats */}
                  <div className="flex items-center gap-1.5">
                    {rowSeats.slice(2, 4).map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => setSelectedSeat(seat)}
                        className={`w-9 h-9 rounded-xl border font-mono font-bold text-xs flex items-center justify-center transition-transform active:scale-90 ${getSeatColor(
                          seat.status
                        )}`}
                      >
                        {seat.seatNumber}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SELECTED SEAT DETAILS MODAL */}
      {selectedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-cyan-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                  {selectedSeat.seatNumber}
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {isAr ? `المقعد رقم ${selectedSeat.seatNumber}` : `Seat #${selectedSeat.seatNumber}`}
                </span>
              </div>
              <button
                onClick={() => setSelectedSeat(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{isAr ? 'المسافر / الطالب' : 'Passenger'}:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedSeat.passengerName || (isAr ? 'شاغر غير محجوز' : 'Empty')}
                </span>
              </div>
              {selectedSeat.ticketCode && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isAr ? 'رمز التذكرة' : 'Ticket'}:</span>
                  <span className="font-mono font-bold text-cyan-600">{selectedSeat.ticketCode}</span>
                </div>
              )}
              {selectedSeat.destinationStop && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isAr ? 'محطة النزول' : 'Destination'}:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {selectedSeat.destinationStop}
                  </span>
                </div>
              )}
            </div>

            {/* Change Status Buttons */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'تعديل حالة الصعود للمقعد' : 'Update Status'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onUpdateSeatStatus(selectedSeat.id, 'occupied');
                    setSelectedSeat(null);
                  }}
                  className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.seatOccupied}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateSeatStatus(selectedSeat.id, 'no_show');
                    setSelectedSeat(null);
                  }}
                  className="py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{t.seatNoShow}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateSeatStatus(selectedSeat.id, 'available');
                    setSelectedSeat(null);
                  }}
                  className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  <span>{t.seatAvailable}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateSeatStatus(selectedSeat.id, 'reserved');
                    setSelectedSeat(null);
                  }}
                  className="py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
                >
                  <span>{t.seatReserved}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE QR CODE SCANNER MODAL */}
      {showScannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scan className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {t.scannerTitle}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowScannerModal(false);
                  setScanResult(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative w-full h-48 bg-slate-950 rounded-2xl overflow-hidden border-2 border-dashed border-cyan-500/40 flex items-center justify-center">
              <div className="w-36 h-36 border-2 border-cyan-400 rounded-xl relative flex items-center justify-center">
                <div className="w-full h-0.5 bg-cyan-400 absolute top-1/2 -translate-y-1/2 animate-pulse shadow-sm shadow-cyan-400" />
                <QrCode className="w-16 h-16 text-slate-700" />
              </div>
              <div className="absolute bottom-2 text-center text-[10px] text-slate-400">
                {t.scanInstruction}
              </div>
            </div>

            {/* Scan Feedback Outcome */}
            {scanResult && (
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-1 animate-in fade-in ${
                  scanResult.status === 'valid'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-800 dark:text-emerald-300'
                    : scanResult.status === 'alreadyUsed'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/50 text-amber-800 dark:text-amber-300'
                    : 'bg-red-50 dark:bg-red-950/40 border-red-500/50 text-red-800 dark:text-red-300'
                }`}
              >
                <div className="font-bold flex items-center gap-2">
                  {scanResult.status === 'valid' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{scanResult.message}</span>
                </div>
                {scanResult.studentName && (
                  <div className="text-[11px] opacity-90">{scanResult.studentName}</div>
                )}
                <div className="text-[10px] font-mono opacity-80">{scanResult.ticketCode}</div>
              </div>
            )}

            {/* Manual Code Input Form */}
            <form onSubmit={handleValidateManualCode} className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isAr ? 'أو أدخل رقم التذكرة يدوياً في حال تعذر المسح:' : 'Or enter ticket code manually:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="مثال: WT-ALG-9842"
                  className="flex-1 p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 uppercase"
                />
                <button
                  type="submit"
                  disabled={!manualCode.trim()}
                  className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl disabled:opacity-50"
                >
                  {isAr ? 'فحص' : 'Check'}
                </button>
              </div>
            </form>

            {/* Test Simulation Controls */}
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'اختبار المسح الضوئي التجريبي للمسافرين:' : 'Simulate Sample Scan:'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleValidateTestCode('valid')}
                  className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold text-start"
                >
                  ✓ {isAr ? 'تذكرة صالحة' : 'Valid Ticket'}
                </button>
                <button
                  type="button"
                  onClick={() => handleValidateTestCode('alreadyUsed')}
                  className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold text-start"
                >
                  ⚠ {isAr ? 'تذكرة مكررة' : 'Already Used'}
                </button>
                <button
                  type="button"
                  onClick={() => handleValidateTestCode('wrongRoute')}
                  className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-bold text-start"
                >
                  ↔ {isAr ? 'خط آخر' : 'Wrong Route'}
                </button>
                <button
                  type="button"
                  onClick={() => handleValidateTestCode('invalid')}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30 text-xs font-bold text-start"
                >
                  ✕ {isAr ? 'تذكرة ملغاة' : 'Invalid Ticket'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
