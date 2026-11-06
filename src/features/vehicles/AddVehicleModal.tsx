import React, { useState } from 'react';
import { X, Car, Plus, CheckCircle2, Upload, Camera } from 'lucide-react';
import { Vehicle, DriverCategory, Language } from '../../types';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicle: Vehicle) => void;
  lang: Language;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle,
  lang,
}) => {
  const isAr = lang === 'ar';

  const [make, setMake] = useState('Hyundai');
  const [model, setModel] = useState('Elantra Premium');
  const [year, setYear] = useState('2023');
  const [color, setColor] = useState('رمادي معدني');
  const [plateNumber, setPlateNumber] = useState('045199-116-16');
  const [category, setCategory] = useState<DriverCategory>('private');
  const [seatsCount, setSeatsCount] = useState('4');
  const [hasAC, setHasAC] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVeh: Vehicle = {
      id: `VEH-${Date.now().toString().slice(-4)}`,
      make,
      model,
      year: Number(year) || 2023,
      color,
      colorNameAr: color,
      plateNumber,
      category,
      seatsCount: Number(seatsCount) || 4,
      luggageCapacityKg: 400,
      hasAirConditioning: hasAC,
      hasAccessibilityRamp: false,
      photoUrl: '/src/assets/images/vehicle_sedan_white_1793951221356.jpg',
      status: 'pending',
      isActive: false,
      documents: {
        carteGrise: true,
        assuranceValidUntil: '2027-11-01',
        controleValidUntil: '2027-10-15',
      },
    };

    onAddVehicle(newVeh);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {isAr ? 'تسجيل مركبة مهنية جديدة' : 'Register New Vehicle'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'الصانع (الشركة)' : 'Make'}
              </label>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'الموديل والتسمية' : 'Model'}
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'سنة الصنع' : 'Year'}
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'اللون' : 'Color'}
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'عدد المقاعد' : 'Seats'}
              </label>
              <input
                type="number"
                value={seatsCount}
                onChange={(e) => setSeatsCount(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'رقم لوحة الترقيم الجزائرية (Matricule)' : 'Algerian Plate Number'}
            </label>
            <input
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="023456-116-16"
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isAr ? 'فئة الخدمة المصرح بها للمركبة' : 'Vehicle Service Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DriverCategory)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            >
              <option value="private">{isAr ? 'نقل خاص (VTC)' : 'Private VTC'}</option>
              <option value="taxi">{isAr ? 'تاكسي حضري' : 'Urban Taxi'}</option>
              <option value="intercity">{isAr ? 'نقل بين الولايات' : 'Intercity'}</option>
              <option value="university">{isAr ? 'نقل جامعي (WASLA TALIB)' : 'University Transit'}</option>
              <option value="bus">{isAr ? 'حافلة مسافرين' : 'Passenger Bus'}</option>
              <option value="company">{isAr ? 'أسطول مؤسسة نقل' : 'Company Fleet'}</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="ac"
              checked={hasAC}
              onChange={(e) => setHasAC(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
            />
            <label htmlFor="ac" className="text-xs text-slate-700 dark:text-slate-300">
              {isAr ? 'المركبة مجهزة بنظام تكييف هواء فعال' : 'Equipped with operational Air Conditioning'}
            </label>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 rounded-xl text-amber-700 dark:text-amber-300 text-xs">
            {isAr
              ? 'تخضع المركبات الجديدة للفحص الإداري قبل إتاحتها للعمل على الطرقات.'
              : 'New vehicles undergo regulatory check prior to service activation.'}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="submit"
              className="py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              {isAr ? 'إرسال لطلب الاعتماد' : 'Submit Vehicle'}
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
