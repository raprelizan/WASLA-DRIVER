import {
  DriverProfile,
  Vehicle,
  DriverDocument,
  TripRequest,
  ScheduledTrip,
  BusOperationState,
  UniversityTransportState,
  EarningTransaction,
  SupportTicket,
  NotificationItem,
  ActiveTrip
} from '../types';

export const initialDriverProfile: DriverProfile = {
  id: 'DRV-DZ-16-0941',
  fullName: 'أمين بلقاسم',
  phone: '0661 24 89 12',
  email: 'amine.belkacem@wasla-driver.dz',
  avatarUrl: '/src/assets/images/driver_portrait_algeria_1793951220191.jpg',
  driverCategory: 'private',
  categoryLabelAr: 'سائق نقل خاص وسياحي (VTC)',
  wilaya: 'الجزائر العاصمة',
  wilayaCode: '16',
  municipality: 'باب الزوار',
  rating: 4.94,
  totalTrips: 1428,
  acceptanceRate: 97,
  cancellationRate: 1.2,
  onTimeRate: 98.4,
  todayWorkingMinutes: 285, // 4 hours 45 mins
  isVerified: true,
  companyAffiliation: {
    companyName: 'مؤسسة النقل الحضري والشبه حضري (ETUSA الجزائر)',
    fleetId: 'ETUSA-FLT-882',
    contractType: 'شريك ناقل معتمد بموجب رخصة وزارة النقل',
    dispatchNotice: 'الالتزام بمحطات التوقف النظامية وقواعد السلامة في الطرق السريعة.'
  }
};

export const initialVehicles: Vehicle[] = [
  {
    id: 'VEH-01',
    make: 'Toyota',
    model: 'Corolla Prestige',
    year: 2023,
    color: 'أبيض لؤلؤي',
    colorNameAr: 'أبيض ناصع',
    plateNumber: '023456-116-16',
    category: 'private',
    seatsCount: 4,
    luggageCapacityKg: 450,
    hasAirConditioning: true,
    hasAccessibilityRamp: false,
    photoUrl: '/src/assets/images/vehicle_sedan_white_1793951221356.jpg',
    status: 'approved',
    isActive: true,
    documents: {
      carteGrise: true,
      assuranceValidUntil: '2027-05-18',
      controleValidUntil: '2027-03-10'
    }
  },
  {
    id: 'VEH-02',
    make: 'Renault',
    model: 'Symbol Taxi',
    year: 2022,
    color: 'أصفر تاكسي حضري',
    colorNameAr: 'أصفر نظامي',
    plateNumber: '089123-116-16',
    category: 'taxi',
    seatsCount: 4,
    luggageCapacityKg: 400,
    hasAirConditioning: true,
    hasAccessibilityRamp: false,
    photoUrl: '/src/assets/images/vehicle_sedan_white_1793951221356.jpg',
    status: 'approved',
    isActive: false,
    documents: {
      carteGrise: true,
      assuranceValidUntil: '2027-04-12',
      controleValidUntil: '2027-02-15'
    }
  },
  {
    id: 'VEH-03',
    make: 'Otokar',
    model: 'Navigo T Transit',
    year: 2024,
    color: 'أزرق وأبيض (نقل جامعي)',
    colorNameAr: 'أزرق جامعي',
    plateNumber: '001420-216-16',
    category: 'bus',
    seatsCount: 36,
    luggageCapacityKg: 1200,
    hasAirConditioning: true,
    hasAccessibilityRamp: true,
    photoUrl: '/src/assets/images/transport_bus_blue_1793951220299.jpg',
    status: 'approved',
    isActive: false,
    documents: {
      carteGrise: true,
      assuranceValidUntil: '2027-08-30',
      controleValidUntil: '2027-06-22'
    }
  }
];

export const initialDocuments: DriverDocument[] = [
  {
    id: 'DOC-01',
    type: 'national_id',
    titleAr: 'بطاقة التعريف الوطنية البيومترية',
    titleFr: 'Carte Nationale d\'Identité Biométrique',
    titleEn: 'National Biometric ID Card',
    documentNumber: '1169002847192',
    issueDate: '2021-04-10',
    expiryDate: '2031-04-10',
    status: 'approved',
    isRequired: true,
    applicableCategories: ['private', 'taxi', 'intercity', 'university', 'bus', 'company']
  },
  {
    id: 'DOC-02',
    type: 'driving_license',
    titleAr: 'رخصة السياقة البيومترية (صنف ب / د)',
    titleFr: 'Permis de Conduire Biométrique (Catégories B/D)',
    titleEn: 'Professional Driving License (B/D)',
    documentNumber: '16/2014/99120',
    issueDate: '2019-09-15',
    expiryDate: '2029-09-15',
    status: 'approved',
    isRequired: true,
    applicableCategories: ['private', 'taxi', 'intercity', 'university', 'bus', 'company']
  },
  {
    id: 'DOC-03',
    type: 'carte_grise',
    titleAr: 'البطاقة الرمادية للمركبة (Carte Grise)',
    titleFr: 'Certificat d\'Immatriculation (Carte Grise)',
    titleEn: 'Vehicle Registration Certificate',
    documentNumber: 'CG-16-023456-2023',
    issueDate: '2023-01-20',
    expiryDate: '2033-01-20',
    status: 'approved',
    isRequired: true,
    applicableCategories: ['private', 'taxi', 'intercity', 'university', 'bus', 'company']
  },
  {
    id: 'DOC-04',
    type: 'assurance',
    titleAr: 'عقد التأمين التجاري للمركبة والمسافرين',
    titleFr: 'Police d\'Assurance Professionnelle & Passagers',
    titleEn: 'Commercial & Passenger Vehicle Insurance',
    documentNumber: 'SAA-POL-2026-981',
    issueDate: '2026-05-18',
    expiryDate: '2027-05-18',
    status: 'approved',
    isRequired: true,
    applicableCategories: ['private', 'taxi', 'intercity', 'university', 'bus', 'company']
  },
  {
    id: 'DOC-05',
    type: 'controle_technique',
    titleAr: 'شهادة المراقبة التقنية الدورية للمركبة',
    titleFr: 'Procès-Verbal de Contrôle Technique',
    titleEn: 'Periodic Technical Vehicle Inspection',
    documentNumber: 'CT-ENACT-16-778',
    issueDate: '2026-03-10',
    expiryDate: '2027-03-10',
    status: 'approved',
    isRequired: true,
    applicableCategories: ['private', 'taxi', 'intercity', 'university', 'bus', 'company']
  },
  {
    id: 'DOC-06',
    type: 'professional_card',
    titleAr: 'دفتر المقاعد ورخصة استغلال النقل العمومي',
    titleFr: 'Livret de Place & Autorisation d\'Exploitation',
    titleEn: 'Commercial Transport Operating License',
    documentNumber: 'MIN-TRANS-16-00452',
    issueDate: '2025-06-01',
    expiryDate: '2028-06-01',
    status: 'approved',
    isRequired: true,
    applicableCategories: ['taxi', 'intercity', 'university', 'bus', 'company']
  },
  {
    id: 'DOC-07',
    type: 'company_contract',
    titleAr: 'عقد الانتساب لمؤسسة النقل المعتمدة',
    titleFr: 'Contrat d\'Affiliation Entreprise de Transport',
    titleEn: 'Company Fleet Affiliation Contract',
    documentNumber: 'AFFIL-ETUSA-2025-11',
    issueDate: '2025-01-01',
    expiryDate: '2027-12-31',
    status: 'approved',
    isRequired: false,
    applicableCategories: ['company', 'university', 'bus']
  }
];

export const initialRequests: TripRequest[] = [
  {
    id: 'REQ-101',
    passengerName: 'كريم منصوري',
    passengerPhone: '0550 18 34 92',
    passengerRating: 4.92,
    passengerCount: 1,
    serviceType: 'private',
    pickupAddress: 'مطار هواري بومدين الدولي - صالة 1 الدولية للوصول',
    dropoffAddress: 'فندق الأوراسي، شارع الدكتور سعدان، الجزائر الوسطى',
    pickupWilaya: 'الجزائر',
    distanceKm: 19.8,
    estimatedMinutes: 28,
    fareDzd: 1850,
    commissionDzd: 185,
    paymentMethod: 'baridimob',
    specialRequirements: 'راكب يحمل حقيبتين سفر، يرجى تشغيل مكيف الهواء',
    expiresInSeconds: 32,
    status: 'new',
    createdAt: 'منذ دقيقة واحدة'
  },
  {
    id: 'REQ-102',
    passengerName: 'ياسمين بوعلام (طالبة WASLA TALIB)',
    passengerPhone: '0772 49 10 33',
    passengerRating: 5.0,
    passengerCount: 2,
    serviceType: 'university',
    pickupAddress: 'جامعة باب الزوار USTHB - البوابة الجنوبية',
    dropoffAddress: 'الحي الجامعي طالب عبد الرحمن - بن عكنون',
    pickupWilaya: 'الجزائر',
    distanceKm: 15.4,
    estimatedMinutes: 24,
    fareDzd: 950,
    commissionDzd: 70,
    paymentMethod: 'wallet',
    specialRequirements: 'اشتراك طالبي مدعوم عبر WASLA TALIB',
    expiresInSeconds: 45,
    status: 'awaiting',
    createdAt: 'منذ 3 دقائق'
  },
  {
    id: 'REQ-103',
    passengerName: 'رضا زروقي',
    passengerPhone: '0665 92 11 04',
    passengerRating: 4.85,
    passengerCount: 3,
    serviceType: 'taxi',
    pickupAddress: 'محطة السكة الحديدية آغا - شارع ديدوش مراد',
    dropoffAddress: 'المدينة الجديدة سيدي عبد الله - حي 1000 مسكن',
    pickupWilaya: 'الجزائر',
    distanceKm: 29.5,
    estimatedMinutes: 38,
    fareDzd: 2450,
    commissionDzd: 245,
    paymentMethod: 'cash',
    specialRequirements: 'دفع نقدي مباشر مع الفكة',
    expiresInSeconds: 0,
    status: 'accepted',
    createdAt: 'منذ 25 دقيقة'
  }
];

export const initialActiveTrip: ActiveTrip = {
  id: 'TRIP-DZ-89412',
  request: {
    id: 'REQ-ACTIVE-01',
    passengerName: 'د. طارق حيمود',
    passengerPhone: '0555 88 41 20',
    passengerRating: 4.96,
    passengerCount: 1,
    serviceType: 'private',
    pickupAddress: 'محطة القطار آغا - شارع ديدوش مراد، الجزائر الوسطى',
    dropoffAddress: 'المركز التجاري والمالي باب الزوار، الجزائر',
    pickupWilaya: 'الجزائر',
    distanceKm: 16.2,
    estimatedMinutes: 22,
    fareDzd: 1600,
    commissionDzd: 160,
    paymentMethod: 'baridimob',
    specialRequirements: 'الراكب ينتظر عند المخرج الرئيسي للمحطة قرب الصيدلية',
    expiresInSeconds: 0,
    status: 'accepted',
    createdAt: 'الآن'
  },
  stage: 'en_route_pickup',
  driverLocation: { lat: 36.7538, lng: 3.0588 },
  pickupLocation: { lat: 36.7621, lng: 3.0543 },
  dropoffLocation: { lat: 36.7215, lng: 3.1872 },
  startTime: '10:15',
  currentStepIndex: 1,
  notes: 'المسار عبر الطريق السريع الشرقي خالي من الازدحام الشديد حالياً.'
};

export const initialScheduledTrips: ScheduledTrip[] = [
  {
    id: 'SCH-01',
    departure: 'محطة خروبة للنقل البري، الجزائر العاصمة',
    destination: 'محطة الباهية لنقل المسافرين، وهران',
    departureWilaya: 'الجزائر (16)',
    destinationWilaya: 'وهران (31)',
    date: 'غداً، الجمعة 7 نوفمبر',
    time: '07:30 صباحاً',
    passengerCount: 4,
    serviceType: 'intercity',
    fareDzd: 3200,
    status: 'confirmed',
    isRecurring: true,
    recurrenceText: 'كل جمعة وأحد وأربعاء'
  },
  {
    id: 'SCH-02',
    departure: 'القطب الجامعي بن عكنون، الجزائر',
    destination: 'جامعة قسنطينة 1 - الإخوة منتوري',
    departureWilaya: 'الجزائر (16)',
    destinationWilaya: 'قسنطينة (25)',
    date: 'السبت 8 نوفمبر',
    time: '06:00 صباحاً',
    passengerCount: 3,
    serviceType: 'intercity',
    fareDzd: 3600,
    status: 'upcoming',
    isRecurring: false
  },
  {
    id: 'SCH-03',
    departure: 'محطة تافورة، الجزائر العاصمة',
    destination: 'ساحة أول ماي، سطيف العالي',
    departureWilaya: 'الجزائر (16)',
    destinationWilaya: 'سطيف (19)',
    date: 'الأحد 9 نوفمبر',
    time: '14:00 زوالاً',
    passengerCount: 4,
    serviceType: 'intercity',
    fareDzd: 2200,
    status: 'pending',
    isRecurring: true,
    recurrenceText: 'رحلة أسبوعية مجدولة'
  }
];

export const initialBusState: BusOperationState = {
  routeNumber: 'خط 24 U',
  routeName: 'محطة الحراش ➜ حي الموز ➜ جامعة باب الزوار USTHB ➜ تافورة',
  busPlate: '001420-216-16',
  capacity: 36,
  currentStopIndex: 1,
  totalBoarded: 22,
  stops: [
    {
      id: 'ST-01',
      stationName: 'محطة قطار الحراش المركزية',
      wilaya: 'الجزائر',
      scheduledTime: '08:00',
      isCompleted: true,
      isCurrent: false,
      passengersBoarding: 14,
      passengersAlighting: 0
    },
    {
      id: 'ST-02',
      stationName: 'محطة حي الموز / باب الزوار',
      wilaya: 'الجزائر',
      scheduledTime: '08:20',
      isCompleted: false,
      isCurrent: true,
      passengersBoarding: 8,
      passengersAlighting: 2
    },
    {
      id: 'ST-03',
      stationName: 'القطب الجامعي باب الزوار USTHB (البوابة 1)',
      wilaya: 'الجزائر',
      scheduledTime: '08:40',
      isCompleted: false,
      isCurrent: false,
      passengersBoarding: 6,
      passengersAlighting: 16
    },
    {
      id: 'ST-04',
      stationName: 'محطة المترو تافورة - البريد المركزي',
      wilaya: 'الجزائر',
      scheduledTime: '09:15',
      isCompleted: false,
      isCurrent: false,
      passengersBoarding: 0,
      passengersAlighting: 10
    }
  ],
  seats: Array.from({ length: 36 }, (_, i) => {
    const seatNum = i + 1;
    const row = Math.floor(i / 4) + 1;
    const posIndex = i % 4;
    const positions: Array<'window_left' | 'aisle_left' | 'aisle_right' | 'window_right'> = [
      'window_left',
      'aisle_left',
      'aisle_right',
      'window_right'
    ];
    let status: 'available' | 'reserved' | 'occupied' | 'no_show' = 'available';
    let passengerName: string | undefined;
    let ticketCode: string | undefined;

    if (seatNum <= 14) {
      status = 'occupied';
      passengerName = `طالب جامعي ${seatNum}`;
      ticketCode = `WT-ALG-${9000 + seatNum}`;
    } else if (seatNum <= 22) {
      status = 'reserved';
      passengerName = `مسافر محجوز ${seatNum}`;
      ticketCode = `WT-ALG-${9100 + seatNum}`;
    } else if (seatNum === 35) {
      status = 'no_show';
      passengerName = 'مسافر متغيب';
      ticketCode = 'WT-ALG-9999';
    }

    return {
      id: `SEAT-${seatNum}`,
      seatNumber: seatNum,
      row,
      position: positions[posIndex],
      status,
      passengerName,
      ticketCode,
      destinationStop: seatNum % 2 === 0 ? 'جامعة باب الزوار USTHB' : 'تافورة'
    };
  })
};

export const initialUniversityState: UniversityTransportState = {
  institution: 'جامعة هواري بومدين للعلوم والتكنولوجيا (USTHB)',
  campusName: 'الحرم الجامعي باب الزوار - الجزائر',
  routeCode: 'خط C3 - الإقامات الجامعية',
  direction: 'to_campus',
  busNumber: 'حافلة رقم 18 - شبكة وصلة طالب',
  currentStopIndex: 0,
  totalBoardedStudents: 41,
  stops: [
    {
      id: 'UST-01',
      campusName: 'الإقامة الجامعية قاريدي 1 (القبة)',
      arrivalTime: '07:15',
      departureTime: '07:25',
      isCompleted: true,
      waitingStudentsCount: 0
    },
    {
      id: 'UST-02',
      campusName: 'محطة النقل بالرغاية (نقطة تجمع الطلبة)',
      arrivalTime: '07:45',
      departureTime: '07:55',
      isCompleted: false,
      waitingStudentsCount: 18
    },
    {
      id: 'UST-03',
      campusName: 'الحرم الرئيسي USTHB باب الزوار (كلية الإعلام الآلي)',
      arrivalTime: '08:20',
      departureTime: '08:30',
      isCompleted: false,
      waitingStudentsCount: 0
    }
  ],
  delaysReported: [
    { time: '07:35', reason: 'ازدحام مروري عند مخرج نفق العناصر في اتجاه الطريق السريع' }
  ]
};

export const initialTransactions: EarningTransaction[] = [
  {
    id: 'TXN-98214',
    date: 'اليوم، 5 نوفمبر 2026',
    time: '14:22',
    tripRef: 'TRIP-DZ-89410',
    type: 'trip_fare',
    grossFareDzd: 2200,
    commissionDzd: 220,
    adjustmentsDzd: 150, // bonus
    netAmountDzd: 2130,
    paymentMethod: 'baridimob',
    status: 'settled',
    passengerName: 'عبد القادر شريفي',
    routeSummary: 'الأبيار ➜ المطار الدولي'
  },
  {
    id: 'TXN-98213',
    date: 'اليوم، 5 نوفمبر 2026',
    time: '12:05',
    tripRef: 'TRIP-DZ-89409',
    type: 'trip_fare',
    grossFareDzd: 1500,
    commissionDzd: 150,
    adjustmentsDzd: 0,
    netAmountDzd: 1350,
    paymentMethod: 'cash',
    status: 'settled',
    passengerName: 'فاطمة الزهراء قدور',
    routeSummary: 'حيدرة ➜ ديدوش مراد'
  },
  {
    id: 'TXN-98212',
    date: 'اليوم، 5 نوفمبر 2026',
    time: '09:40',
    tripRef: 'TRIP-DZ-89408',
    type: 'trip_fare',
    grossFareDzd: 1850,
    commissionDzd: 185,
    adjustmentsDzd: 0,
    netAmountDzd: 1665,
    paymentMethod: 'wallet',
    status: 'settled',
    passengerName: 'كمال دراجي',
    routeSummary: 'باب الوادي ➜ الشراقة'
  },
  {
    id: 'TXN-98200',
    date: 'أمس، 4 نوفمبر 2026',
    time: '19:10',
    tripRef: 'PAYOUT-REQ-0041',
    type: 'withdrawal',
    grossFareDzd: 25000,
    commissionDzd: 0,
    adjustmentsDzd: 0,
    netAmountDzd: -25000,
    paymentMethod: 'baridimob',
    status: 'settled',
    routeSummary: 'تحويل أرباح لحساب بريدي موب (RIP 0079999900021489245)'
  },
  {
    id: 'TXN-98199',
    date: 'أمس، 4 نوفمبر 2026',
    time: '17:30',
    tripRef: 'TRIP-DZ-89392',
    type: 'trip_fare',
    grossFareDzd: 3400,
    commissionDzd: 340,
    adjustmentsDzd: 200,
    netAmountDzd: 3260,
    paymentMethod: 'baridimob',
    status: 'settled',
    passengerName: 'بلال بلحاج',
    routeSummary: 'الجزائر ➜ بومرداس'
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'TCK-2026-881',
    ticketNumber: 'WASLA-TCK-881',
    category: 'payment',
    subject: 'تسوية فارق في تحويل بريدي موب لمشوار المطار',
    description: 'تم تحويل المشوار ولكن العملية ظهرت معلقة في الإشعار الفوري لمدة 10 دقائق.',
    status: 'resolved',
    createdAt: 'منذ يومين',
    lastResponse: 'تمت مراجعة العملية وتثبيت قيد الرصيد في محفظتك المعتمدة.'
  },
  {
    id: 'TCK-2026-904',
    ticketNumber: 'WASLA-TCK-904',
    category: 'vehicle',
    subject: 'طلب اعتماد بطاقة تأمين جديدة للمركبة المجددة',
    description: 'أرفقت وثيقة التأمين الصادرة من الشركة الوطنية للتأمين SAA مع وصل التجديد السنوي.',
    status: 'in_review',
    createdAt: 'اليوم، 09:15',
    lastResponse: 'قيد التدقيق من قبل مصلحة الاعتماد والرقابة بوزارة النقل.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    category: 'request',
    titleAr: 'طلب مشوار فوري متاح بالقرب منك',
    titleFr: 'Nouvelle course immédiate disponible',
    titleEn: 'Instant ride request nearby',
    bodyAr: 'طلب من مطار هواري بومدين الدولي نحو فندق الأوراسي بقيمة 1,850 د.ج.',
    bodyFr: 'Course depuis Aéroport Houari Boumediene vers Hôtel El Aurassi (1 850 DZD).',
    bodyEn: 'Ride from Houari Boumediene Airport to El Aurassi Hotel (1,850 DZD).',
    timestamp: 'منذ دقيقة',
    isRead: false,
    actionTab: 'requests'
  },
  {
    id: 'NOTIF-02',
    category: 'earnings',
    titleAr: 'تم إيداع أرباح المشوار في رصيدك',
    titleFr: 'Revenu crédité sur votre solde',
    titleEn: 'Trip payout credited to your balance',
    bodyAr: 'تم إضافة صافي مبلغ 2,130 د.ج لحسابك بنجاح.',
    bodyFr: 'Le montant net de 2 130 DZD a été versé avec succès.',
    bodyEn: 'Net amount of 2,130 DZD has been credited successfully.',
    timestamp: 'منذ ساعة',
    isRead: false,
    actionTab: 'earnings'
  },
  {
    id: 'NOTIF-03',
    category: 'company',
    titleAr: 'توجيه تشغيلي من مؤسسة النقل (ETUSA)',
    titleFr: 'Directive opérationnelle ETUSA',
    titleEn: 'ETUSA Operational Directive',
    bodyAr: 'يرجى احترام خط السير الخاص بمحطات النقل الجامعي خلال فترة الذروة المسائية.',
    bodyFr: 'Veuillez respecter le couloir dédié aux navettes universitaires aux heures de pointe.',
    bodyEn: 'Please respect designated university transit lanes during evening rush hours.',
    timestamp: 'منذ 3 ساعات',
    isRead: true,
    actionTab: 'home'
  },
  {
    id: 'NOTIF-04',
    category: 'document',
    titleAr: 'تذكير: موعد تجديد الفحص التقني بعد 4 أشهر',
    titleFr: 'Rappel : Contrôle technique dans 4 mois',
    titleEn: 'Reminder: Inspection due in 4 months',
    bodyAr: 'شهادة المراقبة التقنية لمركبتك سارية المفعول حتى 10 مارس 2027.',
    bodyFr: 'Votre certificat de contrôle technique est valide jusqu\'au 10 mars 2027.',
    bodyEn: 'Your vehicle inspection certificate is valid until March 10, 2027.',
    timestamp: 'منذ يوم',
    isRead: true,
    actionTab: 'profile'
  }
];
