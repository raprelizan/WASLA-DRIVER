import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Car,
  Bus,
  GraduationCap,
  Building2,
  MapPin,
  Camera,
  Upload,
  ArrowRight,
  ArrowLeft,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import { DriverCategory, Language } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { category: DriverCategory; fullName: string; phone: string; wilaya: string }) => void;
  lang: Language;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  lang,
}) => {
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('أمين بلقاسم');
  const [phone, setPhone] = useState('0661248912');
  const [email, setEmail] = useState('amine.belkacem@wasla-driver.dz');
  const [password, setPassword] = useState('WaslaDriver2026!');
  const [confirmPassword, setConfirmPassword] = useState('WaslaDriver2026!');
  const [selectedCategory, setSelectedCategory] = useState<DriverCategory>('private');
  const [wilaya, setWilaya] = useState('16 - الجزائر العاصمة');
  const [municipality, setMunicipality] = useState('باب الزوار');
  const [birthDate, setBirthDate] = useState('1994-08-15');
  const [address, setAddress] = useState('حي 8 ماي 1945، عمارة 12');

  // Document upload simulation
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({
    national_id: true,
    license: true,
    carte_grise: true,
    assurance: false,
  });

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const categories: {
    id: DriverCategory;
    titleAr: string;
    titleFr: string;
    descAr: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'private',
      titleAr: 'سائق نقل خاص (VTC)',
      titleFr: 'Transport Privé VTC',
      descAr: 'رحلات مدنية وسياحية بمركبات مريحة مع مرونة كاملة في أوقات العمل.',
      icon: <Car className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/20',
    },
    {
      id: 'taxi',
      titleAr: 'سائق تاكسي نظامي',
      titleFr: 'Chauffeur de Taxi',
      descAr: 'لسائقي التاكسي الحائزين على دفتر المقاعد ورخصة الاستغلال الحضرية.',
      icon: <Car className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20',
    },
    {
      id: 'university',
      titleAr: 'سائق نقل جامعي (WASLA TALIB)',
      titleFr: 'Transport Universitaire',
      descAr: 'نقل الطلبة والأساتذة بين الحرم الجامعي والإقامات الجامعية بالجزائر.',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      color: 'border-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-950/20',
    },
    {
      id: 'intercity',
      titleAr: 'سائق نقل بين الولايات',
      titleFr: 'Transport Inter-wilayas',
      descAr: 'رحلات طويلة ومجدولة مسبقاً بين المحطات والولايات الكبرى.',
      icon: <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20',
    },
    {
      id: 'bus',
      titleAr: 'سائق حافلة مسافرين',
      titleFr: 'Conducteur d\'Autobus',
      descAr: 'تشغيل خطوط النقل الجماعي وإدارة المقاعد وفحص تذاكر الركاب.',
      icon: <Bus className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      color: 'border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20',
    },
    {
      id: 'company',
      titleAr: 'سائق تابع لمؤسسة نقل معتمدة',
      titleFr: 'Chauffeur Flotte d\'Entreprise',
      descAr: 'للأساطيل المؤسساتية (مثل ETUSA) والشركات المتعاقدة في النقل.',
      icon: <Building2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
      color: 'border-violet-500/40 bg-violet-50/50 dark:bg-violet-950/20',
    },
  ];

  const toggleDoc = (key: string) => {
    setUploadedDocs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFinish = () => {
    onComplete({
      category: selectedCategory,
      fullName,
      phone,
      wilaya,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Progress Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center tabular-nums">
              {step}/6
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {step === 1 && (isAr ? 'شاشة البداية' : 'Splash')}
              {step === 2 && (isAr ? 'مرحباً بك في وصلة' : 'Welcome')}
              {step === 3 && (isAr ? 'تسجيل الحساب' : 'Account Details')}
              {step === 4 && (isAr ? 'اختيار فئة النقل' : 'Driver Category')}
              {step === 5 && (isAr ? 'المعلومات الشخصية' : 'Personal Profile')}
              {step === 6 && (isAr ? 'إثبات الهوية والوثائق' : 'Identity Verification')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: SPLASH */}
          {step === 1 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-cyan-600/30">
                W
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  WASLA DRIVER
                </h2>
                <p className="text-base font-bold text-cyan-600 dark:text-cyan-400 mt-1">
                  وصلة السائق
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  المنظومة الوطنية للنقل التابعة لـ WASLA TALIB في الجزائر
                </p>
              </div>

              <div className="pt-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                  <span>تهيئة بيئة التشغيل المعتمدة...</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: WELCOME */}
          {step === 2 && (
            <div className="space-y-6 py-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mx-auto">
                <Car className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  "رحلاتك، عملك، ومستقبلك في مكان واحد."
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-md mx-auto">
                  انضم إلى شبكة وصلة، وأدر رحلاتك ونشاطك في مجال النقل بسهولة واحترافية. دعم كامل للنقل الخاص، التاكسي، الحافلات، والنقل الجامعي WASLA TALIB.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    أرباح شفافة تسوى مباشرة عبر بريدي موب (BaridiMob) أو CCP
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    تأمين مسارات النقل الجامعي المدعومة للطلبة في 58 ولاية
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    مرونة كاملة في التبديل بين وضع التاكسي، الحافلة، والسيارة الخاصة
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ACCOUNT REGISTRATION */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  إنشاء حساب سائق مهني جديد
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  أدخل بياناتك المسجلة رسمياً لدى المصالح الإدارية
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الاسم واللقب الكامل (كما في بطاقة التعريف)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    رقم الهاتف المحمول (مفعل في الجزائر)
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center">
                      +213
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0661 24 89 12"
                      className="flex-1 p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    البريد الإلكتروني المهني
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute end-2.5 top-2.5 text-slate-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DRIVER CATEGORY SELECTION */}
          {step === 4 && (
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  حدد نشاطك أو الفئة التي تزاولها
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  هذا الاختيار يحدد شروط الاعتماد والوثائق والتراخيص المطلوبة
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? `${cat.color} border-cyan-500 shadow-sm`
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-xs shrink-0">
                          {cat.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {cat.titleAr}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                            {cat.descAr}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-cyan-600 bg-cyan-600 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: PERSONAL DETAILS */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  المعلومات الشخصية ونطاق الإقامة
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  تحديد الولاية والبلدية لربطك بالمسارات وطلبات النقل الأقرب
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      الولاية السكنية
                    </label>
                    <select
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="16 - الجزائر العاصمة">16 - الجزائر العاصمة</option>
                      <option value="31 - وهران">31 - وهران</option>
                      <option value="25 - قسنطينة">25 - قسنطينة</option>
                      <option value="19 - سطيف">19 - سطيف</option>
                      <option value="09 - البليدة">09 - البليدة</option>
                      <option value="15 - تيزي وزو">15 - تيزي وزو</option>
                      <option value="23 - عنابة">23 - عنابة</option>
                      <option value="05 - باتنة">05 - باتنة</option>
                      <option value="35 - بومرداس">35 - بومرداس</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      البلدية
                    </label>
                    <input
                      type="text"
                      value={municipality}
                      onChange={(e) => setMunicipality(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      تاريخ الميلاد
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      عنوان الإقامة الفعلي
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Profile Photo preview */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/src/assets/images/driver_portrait_algeria_1793951220191.jpg"
                      alt="Driver Portrait"
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        الصورة الشخصية الرسمية
                      </div>
                      <div className="text-[10px] text-slate-400">
                        صورة واضحة بخلفية مهنية ومطابقة للمستندات
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>تغيير</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: IDENTITY VERIFICATION & DOCUMENTS */}
          {step === 6 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  إثبات الهوية والملف القانوني للمهنة
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ارفع الوثائق الرسمية للتدقيق من قبل مصلحة التراخيص والاعتماد
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    key: 'national_id',
                    title: 'بطاقة التعريف الوطنية البيومترية',
                    desc: 'الواجهتان الأمامية والخلفية بوضوح',
                  },
                  {
                    key: 'license',
                    title: 'رخصة السياقة البيومترية (صنف ب / د)',
                    desc: 'صالحة وسارية المفعول للنشاط المحدد',
                  },
                  {
                    key: 'carte_grise',
                    title: 'البطاقة الرمادية للمركبة (Carte Grise)',
                    desc: 'مطابقة لرقم التسجيل والمواصفات',
                  },
                  {
                    key: 'assurance',
                    title: 'عقد التأمين التجاري للمركبة والمسافرين',
                    desc: 'بوليصة تأمين تغطي نقل الركاب',
                  },
                ].map((doc) => {
                  const isUploaded = uploadedDocs[doc.key];
                  return (
                    <div
                      key={doc.key}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl shrink-0 ${
                            isUploaded
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {doc.title}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {doc.desc}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleDoc(doc.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                          isUploaded
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                        }`}
                      >
                        {isUploaded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>تم الرفع</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>رفع الوثيقة</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-cyan-800 dark:text-cyan-300 text-xs">
                {isAr
                  ? 'سيتم تدقيق المستندات بواسطة فريق الامتثال لمنصة وصلة بالتنسيق مع مديرية النقل الولائية.'
                  : 'Documents will be audited by WASLA compliance team.'}
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-md shadow-cyan-600/20 transition-all flex items-center gap-1.5"
            >
              <span>{step === 1 ? 'بدء التسجيل' : 'المتابعة'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>إتمام التسجيل والدخول للمنصة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
