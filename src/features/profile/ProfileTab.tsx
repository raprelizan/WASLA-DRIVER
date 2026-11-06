import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Star,
  Car,
  FileText,
  Building2,
  Settings,
  Globe,
  Moon,
  Sun,
  ShieldAlert,
  LifeBuoy,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  LogOut,
  Camera
} from 'lucide-react';
import {
  DriverProfile,
  Vehicle,
  DriverDocument,
  DriverCategory,
  Language
} from '../../types';
import { translations } from '../../services/i18n';

interface ProfileTabProps {
  profile: DriverProfile;
  vehicles: Vehicle[];
  activeVehicle: Vehicle;
  documents: DriverDocument[];
  onSelectActiveVehicle: (vehicleId: string) => void;
  onOpenAddVehicle: () => void;
  onOpenUploadDoc: (doc: DriverDocument) => void;
  onChangeCategory: (cat: DriverCategory) => void;
  onOpenSupport: () => void;
  onOpenSos: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  activeSection?: 'vehicles' | 'documents' | 'performance' | 'settings';
  onSectionChange?: (section: 'vehicles' | 'documents' | 'performance' | 'settings') => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  vehicles,
  activeVehicle,
  documents,
  onSelectActiveVehicle,
  onOpenAddVehicle,
  onOpenUploadDoc,
  onChangeCategory,
  onOpenSupport,
  onOpenSos,
  isDarkMode,
  onToggleTheme,
  lang,
  onChangeLang,
  activeSection: controlledSection,
  onSectionChange,
}) => {
  const isAr = lang === 'ar';
  const t = translations[lang].profile;

  const [internalSection, setInternalSection] = useState<'vehicles' | 'documents' | 'performance' | 'settings'>('vehicles');
  const activeSection = controlledSection || internalSection;
  const setActiveSection = (s: 'vehicles' | 'documents' | 'performance' | 'settings') => {
    setInternalSection(s);
    onSectionChange?.(s);
  };

  const categories: { id: DriverCategory; labelAr: string; labelFr: string }[] = [
    { id: 'private', labelAr: 'نقل خاص (VTC)', labelFr: 'VTC Privé' },
    { id: 'taxi', labelAr: 'تاكسي نظامي', labelFr: 'Taxi' },
    { id: 'university', labelAr: 'نقل جامعي', labelFr: 'Universitaire' },
    { id: 'intercity', labelAr: 'نقل بين الولايات', labelFr: 'Inter-wilayas' },
    { id: 'bus', labelAr: 'حافلة مسافرين', labelFr: 'Autobus' },
    { id: 'company', labelAr: 'مؤسسة نقل (ETUSA)', labelFr: 'Flotte' },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* DRIVER PROFILE HEADER */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-start">
          <div className="relative">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-cyan-500/40 shadow-md"
            />
            {profile.isVerified && (
              <div
                title="سائق معتمد رسمياً"
                className="absolute -bottom-1 -end-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {profile.fullName}
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="font-mono">{profile.phone}</span>
                  <span aria-hidden="true">·</span>
                  <span>{profile.wilaya} ({profile.municipality})</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold shrink-0">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">{profile.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({profile.totalTrips} {isAr ? 'مشوار' : 'rides'})</span>
              </div>
            </div>

            {/* Category selection selector */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 text-start">
                {t.driverCategory} (تبديل الفئة التشغيلية المعتمدة):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => {
                  const isSelected = profile.driverCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => onChangeCategory(c.id)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-cyan-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {isAr ? c.labelAr : c.labelFr}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Company Affiliation Badge if present */}
        {profile.companyAffiliation && (
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  {profile.companyAffiliation.companyName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {profile.companyAffiliation.contractType} · معرف الأسطول: {profile.companyAffiliation.fleetId}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
              {isAr ? 'شريك متعاقد' : 'Affiliated'}
            </span>
          </div>
        )}
      </div>

      {/* SECTION TABS (VEHICLES / DOCUMENTS / PERFORMANCE / SETTINGS) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto text-xs">
        <button
          onClick={() => setActiveSection('vehicles')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'vehicles'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          <span>{isAr ? 'أسطول المركبات' : 'Vehicles'}</span>
          <span className="text-[10px] px-1.5 bg-slate-200 dark:bg-slate-800 rounded-full">
            {vehicles.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('documents')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'documents'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isAr ? 'الملف والوثائق' : 'Documents'}</span>
          <span className="text-[10px] px-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full">
            {documents.filter((d) => d.status === 'approved').length}/{documents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('performance')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'performance'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>{isAr ? 'الأداء والتقييم' : 'Performance'}</span>
        </button>

        <button
          onClick={() => setActiveSection('settings')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'settings'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{t.settings}</span>
        </button>
      </div>

      {/* SECTION 1: VEHICLES FLEET */}
      {activeSection === 'vehicles' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {isAr ? 'المركبات المسجلة والمعتمدة لحسابك' : 'Registered Vehicles Fleet'}
            </h3>
            <button
              onClick={onOpenAddVehicle}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addVehicle}</span>
            </button>
          </div>

          <div className="space-y-3">
            {vehicles.map((veh) => {
              const isActive = veh.id === activeVehicle.id;
              return (
                <div
                  key={veh.id}
                  className={`p-4 bg-white dark:bg-slate-900 rounded-3xl border transition-all ${
                    isActive
                      ? 'border-cyan-500 shadow-md shadow-cyan-500/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={veh.photoUrl}
                      alt={veh.make}
                      className="w-20 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                          {veh.make} {veh.model}
                        </div>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-white shrink-0">
                            {isAr ? 'المركبة النشطة حالياً' : 'Active'}
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                        {veh.plateNumber}
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                        <span>{veh.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{veh.colorNameAr}</span>
                        <span aria-hidden="true">·</span>
                        <span>{veh.seatsCount} {isAr ? 'مقاعد' : 'seats'}</span>
                        {veh.hasAirConditioning && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-cyan-600">{isAr ? 'مكيف هواء' : 'AC'}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="text-[10px] text-slate-400">
                      {isAr ? 'التأمين ساري حتى:' : 'Insurance:'} {veh.documents.assuranceValidUntil}
                    </div>

                    {!isActive && (
                      <button
                        onClick={() => onSelectActiveVehicle(veh.id)}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-700 dark:text-slate-200 font-bold text-xs"
                      >
                        {isAr ? 'تعيين كمركبة نشطة' : 'Set as Active'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: DOCUMENTS AND COMPLIANCE */}
      {activeSection === 'documents' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {t.documentsCompliance}
            </h3>
            <span className="text-[10px] text-slate-400">
              {isAr ? 'انقر على أي وثيقة لمعاينتها أو تجديدها' : 'Click document to renew'}
            </span>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => {
              const title = isAr ? doc.titleAr : lang === 'fr' ? doc.titleFr : doc.titleEn;
              const isApproved = doc.status === 'approved';
              return (
                <div
                  key={doc.id}
                  onClick={() => onOpenUploadDoc(doc)}
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isApproved
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-slate-100 truncate">
                        {title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span className="font-mono">#{doc.documentNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{isAr ? 'تنتهي:' : 'Expires:'} {doc.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isApproved
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                      }`}
                    >
                      {isApproved ? (isAr ? 'سارية المفعول' : 'Approved') : (isAr ? 'مطلوب التجديد' : 'Renewal')}
                    </span>
                    {isAr ? <ChevronLeft className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: PERFORMANCE & REVIEWS */}
      {activeSection === 'performance' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {isAr ? 'مؤشرات جودة الخدمة ورضا الركاب' : 'Quality & Passenger Satisfaction'}
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <div className="text-[10px] text-slate-400">{isAr ? 'نظافة المركبة' : 'Cleanliness'}</div>
                <div className="text-base font-black text-amber-500 mt-0.5">4.98 ★</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <div className="text-[10px] text-slate-400">{isAr ? 'دقة المواعيد' : 'Punctuality'}</div>
                <div className="text-base font-black text-cyan-600 mt-0.5">98.4%</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <div className="text-[10px] text-slate-400">{isAr ? 'اللباقة والاحترافية' : 'Politeness'}</div>
                <div className="text-base font-black text-emerald-600 mt-0.5">5.0 ★</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {isAr ? 'آخر تقييمات المسافرين والطلبة' : 'Recent Passenger Comments'}
            </h3>

            <div className="space-y-2.5">
              {[
                {
                  author: 'د. طارق حيمود',
                  rating: 5,
                  comment: 'سائق محترف جداً، القيادة هادئة وآمنة ووصلنا للمطار في الوقت المحدد تماماً.',
                  date: 'اليوم، 14:30',
                },
                {
                  author: 'ياسمين بوعلام (طالبة USTHB)',
                  rating: 5,
                  comment: 'شكراً جزيلاً لخدمة النقل الجامعي الممتازة عبر منصة وصلة، احترام كبير للمواعيد.',
                  date: 'أمس، 18:20',
                },
              ].map((rev, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{rev.author}</span>
                    <span className="text-[10px] text-amber-500 font-bold">★★★★★</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-slate-400">{rev.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SETTINGS & CONTROLS */}
      {activeSection === 'settings' && (
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {isAr ? 'تفضيلات التطبيق والأمان' : 'App Settings & Security'}
          </h3>

          <div className="space-y-2 text-xs">
            {/* Language */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">{t.language}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onChangeLang('ar')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    lang === 'ar' ? 'bg-cyan-600 text-white' : 'text-slate-500'
                  }`}
                >
                  عربي
                </button>
                <button
                  onClick={() => onChangeLang('fr')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    lang === 'fr' ? 'bg-cyan-600 text-white' : 'text-slate-500'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => onChangeLang('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-500'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Dark mode */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                <span className="font-bold text-slate-800 dark:text-slate-200">{t.darkMode}</span>
              </div>
              <button
                onClick={onToggleTheme}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  isDarkMode ? 'bg-cyan-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isDarkMode ? (isAr ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Support */}
            <button
              onClick={onOpenSupport}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:border-cyan-500 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <LifeBuoy className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-slate-800 dark:text-slate-200">{t.supportTicket} & {t.faq}</span>
              </div>
              {isAr ? <ChevronLeft className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Safety SOS */}
            <button
              onClick={onOpenSos}
              className="w-full p-3 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-500/30 flex items-center justify-between hover:border-red-500 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span className="font-bold text-red-600 dark:text-red-400">{t.emergencySos}</span>
              </div>
              {isAr ? <ChevronLeft className="w-4 h-4 text-red-400" /> : <ChevronRight className="w-4 h-4 text-red-400" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
