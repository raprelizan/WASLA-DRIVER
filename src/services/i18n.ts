import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  parentEcosystem: string;
  online: string;
  offline: string;
  busy: string;
  breakMode: string;
  suspended: string;
  goOnline: string;
  goOffline: string;
  locationActive: string;
  selectedVehicle: string;
  vehicleStatusApproved: string;
  eligibleServices: string;
  documentsVerified: string;
  documentsExpiredAlert: string;
  cannotGoOnlineReason: string;
  tabs: {
    home: string;
    requests: string;
    trips: string;
    earnings: string;
    profile: string;
  };
  stats: {
    todayEarnings: string;
    completedTrips: string;
    acceptanceRate: string;
    rating: string;
    workingHours: string;
    dzd: string;
    tripsCount: string;
    hoursUnit: string;
  };
  quickActions: {
    viewRequests: string;
    activeTrip: string;
    vehicles: string;
    complianceDocs: string;
    support: string;
    safetyCenter: string;
  };
  requests: {
    incomingTitle: string;
    newRideRequest: string;
    expiresIn: string;
    seconds: string;
    acceptRide: string;
    rejectRide: string;
    simulateNewRequest: string;
    distance: string;
    duration: string;
    passenger: string;
    fare: string;
    paymentMethod: string;
    specialNeeds: string;
    noActiveRequests: string;
    noActiveRequestsDesc: string;
    history: string;
    allFilter: string;
    acceptedFilter: string;
    rejectedFilter: string;
  };
  activeTrip: {
    title: string;
    steps: {
      accepted: string;
      en_route_pickup: string;
      arrived_pickup: string;
      trip_started: string;
      arrived_destination: string;
      completed: string;
    };
    nextStepAction: {
      headToPickup: string;
      confirmArrival: string;
      startTripWithPassenger: string;
      reachDestination: string;
      completeAndReceiveFare: string;
      finished: string;
    };
    passengerDetails: string;
    callPassenger: string;
    messagePassenger: string;
    cancelRide: string;
    safetyHelp: string;
    navigationDirections: string;
    pickupAt: string;
    dropoffAt: string;
    tripSummaryTitle: string;
    grossReceived: string;
    netReceived: string;
    backToDashboard: string;
  };
  busMode: {
    title: string;
    routeDetails: string;
    stationProgression: string;
    seatMap: string;
    seatAvailable: string;
    seatReserved: string;
    seatOccupied: string;
    seatNoShow: string;
    scanTicketQr: string;
    scannerTitle: string;
    scanInstruction: string;
    validateSampleCode: string;
    validationResults: {
      valid: string;
      alreadyUsed: string;
      invalid: string;
      wrongRoute: string;
    };
    reportDelay: string;
    confirmDeparture: string;
    universityBus: string;
  };
  universityMode: {
    title: string;
    institution: string;
    campusRoute: string;
    directionLabel: string;
    studentsOnboard: string;
    reportTrafficDelay: string;
    arriveStation: string;
    departStation: string;
  };
  earnings: {
    title: string;
    today: string;
    thisWeek: string;
    thisMonth: string;
    grossFares: string;
    platformCommission: string;
    adjustments: string;
    netBalance: string;
    withdrawableBalance: string;
    requestPayout: string;
    payoutModalTitle: string;
    payoutMethodCcp: string;
    payoutMethodBaridimob: string;
    payoutMethodBank: string;
    amountToWithdraw: string;
    confirmWithdrawal: string;
    demoNotice: string;
    historyTitle: string;
    receiptTitle: string;
  };
  profile: {
    title: string;
    driverCategory: string;
    activeVehicle: string;
    changeVehicle: string;
    addVehicle: string;
    companyAffiliation: string;
    documentsCompliance: string;
    reviewsAndRatings: string;
    settings: string;
    language: string;
    darkMode: string;
    emergencySos: string;
    faq: string;
    supportTicket: string;
  };
  demoBanner: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: "وصلة السائق",
    appSubtitle: "المنظومة الوطنية للنقل WASLA TALIB",
    parentEcosystem: "WASLA TALIB الجزائر",
    online: "متصل للخدمة",
    offline: "غير متصل",
    busy: "مشغول في رحلة",
    breakMode: "استراحة مؤقتة",
    suspended: "حساب موقوف للمراجعة",
    goOnline: "بدء استقبال الطلبات",
    goOffline: "إيقاف الاستقبال",
    locationActive: "الموقع الجغرافي نشط ودقيق",
    selectedVehicle: "المركبة الحالية",
    vehicleStatusApproved: "معتمدة ونظامية",
    eligibleServices: "الخدمات المؤهلة",
    documentsVerified: "الوثائق سارية ومكتملة",
    documentsExpiredAlert: "تنبيه: وثيقة تتطلب التجديد",
    cannotGoOnlineReason: "يرجى فحص سريان التأمين أو الفحص التقني للتمكن من العمل",
    tabs: {
      home: "الرئيسية",
      requests: "الطلبات",
      trips: "الرحلات",
      earnings: "الأرباح",
      profile: "حسابي",
    },
    stats: {
      todayEarnings: "أرباح اليوم الصافية",
      completedTrips: "الرحلات المكتملة",
      acceptanceRate: "نسبة قبول الطلبات",
      rating: "التقييم العام",
      workingHours: "ساعات العمل اليوم",
      dzd: "د.ج",
      tripsCount: "رحلة",
      hoursUnit: "سا",
    },
    quickActions: {
      viewRequests: "الطلبات الواردة",
      activeTrip: "الرحلة الجارية",
      vehicles: "إدارة المركبات",
      complianceDocs: "مركز الوثائق",
      support: "الدعم والمساعدة",
      safetyCenter: "طوارئ وسلامة",
    },
    requests: {
      incomingTitle: "طلب نقل جديد متاح",
      newRideRequest: "طلب مشوار فوري",
      expiresIn: "ينتهي بعد",
      seconds: "ثانية",
      acceptRide: "قبول المشوار",
      rejectRide: "رفض الطلب",
      simulateNewRequest: "محاكاة طلب جديد",
      distance: "المسافة المقدرة",
      duration: "الوقت المقدر",
      passenger: "الراكب",
      fare: "السعر الصافي المقدر",
      paymentMethod: "طريقة الدفع",
      specialNeeds: "ملاحظات إضافية",
      noActiveRequests: "لا توجد طلبات واردة حالياً",
      noActiveRequestsDesc: "أنت متصل وفي نطاق الخدمة. ستظهر الطلبات القريبة هنا فور إرسالها من الركاب.",
      history: "سجل الطلبات السابقة",
      allFilter: "الكل",
      acceptedFilter: "المقبولة",
      rejectedFilter: "المرفوضة",
    },
    activeTrip: {
      title: "إدارة الرحلة المباشرة",
      steps: {
        accepted: "تم قبول الطلب",
        en_route_pickup: "التوجه إلى نقطة الانطلاق",
        arrived_pickup: "وصلت إلى الراكب",
        trip_started: "بدأت الرحلة",
        arrived_destination: "وصلت إلى الوجهة",
        completed: "اكتملت الرحلة بنجاح",
      },
      nextStepAction: {
        headToPickup: "الانطلاق نحو موقع الركوب",
        confirmArrival: "تأكيد الوصول إلى الراكب",
        startTripWithPassenger: "بدء الرحلة بعد صعود الراكب",
        reachDestination: "تأكيد الوصول لنقطة النزول",
        completeAndReceiveFare: "إنهاء المشوار وتحصيل الأجرة",
        finished: "تم إنهاء الرحلة",
      },
      passengerDetails: "بيانات الراكب",
      callPassenger: "اتصال هاتفي",
      messagePassenger: "محادثة سريعة",
      cancelRide: "إلغاء الرحلة بطلب مبرر",
      safetyHelp: "زر الأمان والحماية",
      navigationDirections: "توجيه المسار",
      pickupAt: "نقطة الانطلاق",
      dropoffAt: "نقطة الوصول",
      tripSummaryTitle: "ملخص الحساب للرحلة",
      grossReceived: "الأجرة الإجمالية",
      netReceived: "الصافي المستحق للسائق",
      backToDashboard: "العودة للرئيسية واستقبال طلبات جديدة",
    },
    busMode: {
      title: "عمليات تشغيل الحافلة",
      routeDetails: "بيانات الخط والمحطات",
      stationProgression: "مسار المحطات",
      seatMap: "مخطط المقاعد وتوزيع الركاب",
      seatAvailable: "شاغر",
      seatReserved: "محجوز",
      seatOccupied: "صعد الحافلة",
      seatNoShow: "تغيب",
      scanTicketQr: "فحص تذاكر الركاب (QR)",
      scannerTitle: "التحقق الفوري من التذكرة",
      scanInstruction: "امسح رمز التذكرة الرقمية للطالب أو المسافر للتأكيد والتثبيت",
      validateSampleCode: "فحص تجريبي لتذكرة",
      validationResults: {
        valid: "تذكرة نظامية صالحة - تم تأكيد الصعود",
        alreadyUsed: "تنبيه: التذكرة مستخدمة مسبقاً!",
        invalid: "رمز التذكرة غير صالح في النظام",
        wrongRoute: "تذكرة تخص خط سير آخر",
      },
      reportDelay: "إبلاغ عن تأخير في المحطة",
      confirmDeparture: "تأكيد مغادرة المحطة",
      universityBus: "نقل الطلبة الجامعي",
    },
    universityMode: {
      title: "نظام النقل الجامعي - WASLA TALIB",
      institution: "المؤسسة الجامعية",
      campusRoute: "خط النقل الجامعي",
      directionLabel: "الاتجاه",
      studentsOnboard: "الطلبة المصرح لهم بالصعود",
      reportTrafficDelay: "إبلاغ عن ازدحام مروري",
      arriveStation: "الوصول لمحطة الإقامة / الحرم",
      departStation: "تأكيد مغادرة المحطة",
    },
    earnings: {
      title: "المحفظة والأرباح المالية",
      today: "اليوم",
      thisWeek: "هذا الأسبوع",
      thisMonth: "هذا الشهر",
      grossFares: "إجمالي المشاوير",
      platformCommission: "عمولة منصة وصلة",
      adjustments: "المكافآت والحوافز",
      netBalance: "الأرباح الصافية",
      withdrawableBalance: "الرصيد المتاح للسحب",
      requestPayout: "طلب تحويل الأرباح",
      payoutModalTitle: "تحويل الأرباح إلى حسابك المالي",
      payoutMethodCcp: "الحساب البريدي الجاري (CCP)",
      payoutMethodBaridimob: "تطبيق بريدي موب (BaridiMob RIP)",
      payoutMethodBank: "حساب بنكي جزائري (RIB)",
      amountToWithdraw: "المبلغ المطلوب سحبه (د.ج)",
      confirmWithdrawal: "تأكيد طلب السحب",
      demoNotice: "بيانات مالية وتجريبية لأغراض العرض التشغيلي المعتمد",
      historyTitle: "سجل المعاملات والتحويلات",
      receiptTitle: "إشعار تفصيلي للرحلة",
    },
    profile: {
      title: "الملف المهني والإعدادات",
      driverCategory: "فئة السائق المصرح بها",
      activeVehicle: "المركبة المعتمدة",
      changeVehicle: "تبديل المركبة",
      addVehicle: "تسجيل مركبة جديدة",
      companyAffiliation: "التبعية لمؤسسة النقل",
      documentsCompliance: "ملف الوثائق والتراخيص القانونية",
      reviewsAndRatings: "تقييمات الركاب والأداء",
      settings: "إعدادات التطبيق",
      language: "لغة العرض",
      darkMode: "الوضع الليلي",
      emergencySos: "طوارئ النجدة المباشرة",
      faq: "الأسئلة الشائعة",
      supportTicket: "فتح تذكرة مساعدة",
    },
    demoBanner: "منصة تشغيلية تجريبية معتمدة لمنظومة WASLA TALIB في الجزائر",
  },
  fr: {
    appName: "WASLA DRIVER",
    appSubtitle: "Écosystème National de Transport WASLA TALIB",
    parentEcosystem: "WASLA TALIB Algérie",
    online: "En ligne & Disponible",
    offline: "Hors ligne",
    busy: "En course active",
    breakMode: "En pause",
    suspended: "Compte suspendu pour examen",
    goOnline: "Passer en ligne",
    goOffline: "Se déconnecter",
    locationActive: "GPS actif et précis",
    selectedVehicle: "Véhicule actif",
    vehicleStatusApproved: "Homologué & Conforme",
    eligibleServices: "Services éligibles",
    documentsVerified: "Dossier légal à jour",
    documentsExpiredAlert: "Alerte : Document à renouveler",
    cannotGoOnlineReason: "Veuillez vérifier la validité de l'assurance ou du contrôle technique",
    tabs: {
      home: "Accueil",
      requests: "Commandes",
      trips: "Courses",
      earnings: "Revenus",
      profile: "Mon Profil",
    },
    stats: {
      todayEarnings: "Revenu net du jour",
      completedTrips: "Courses terminées",
      acceptanceRate: "Taux d'acceptation",
      rating: "Note moyenne",
      workingHours: "Temps de service",
      dzd: "DZD",
      tripsCount: "courses",
      hoursUnit: "h",
    },
    quickActions: {
      viewRequests: "Demandes en attente",
      activeTrip: "Course active",
      vehicles: "Flotte de véhicules",
      complianceDocs: "Centre de conformité",
      support: "Support d'assistance",
      safetyCenter: "Sécurité & Urgences",
    },
    requests: {
      incomingTitle: "Nouvelle course disponible",
      newRideRequest: "Demande immédiate",
      expiresIn: "Expire dans",
      seconds: "s",
      acceptRide: "Accepter la course",
      rejectRide: "Refuser",
      simulateNewRequest: "Simuler une nouvelle demande",
      distance: "Distance estimée",
      duration: "Durée estimée",
      passenger: "Passager",
      fare: "Montant net estimé",
      paymentMethod: "Mode de règlement",
      specialNeeds: "Instructions spéciales",
      noActiveRequests: "Aucune demande en cours",
      noActiveRequestsDesc: "Vous êtes en ligne dans votre zone d'affectation. Les demandes apparaîtront ici.",
      history: "Historique des demandes",
      allFilter: "Toutes",
      acceptedFilter: "Acceptées",
      rejectedFilter: "Refusées",
    },
    activeTrip: {
      title: "Supervision de la Course",
      steps: {
        accepted: "Course acceptée",
        en_route_pickup: "En route vers la prise en charge",
        arrived_pickup: "Arrivé au point de rendez-vous",
        trip_started: "Course démarrée",
        arrived_destination: "Arrivé à destination",
        completed: "Course terminée avec succès",
      },
      nextStepAction: {
        headToPickup: "Se diriger vers le passager",
        confirmArrival: "Confirmer l'arrivée",
        startTripWithPassenger: "Démarrer la course avec le passager",
        reachDestination: "Confirmer l'arrivée à destination",
        completeAndReceiveFare: "Finaliser et encaisser la course",
        finished: "Terminée",
      },
      passengerDetails: "Fiche passager",
      callPassenger: "Appeler",
      messagePassenger: "Message",
      cancelRide: "Annuler avec motif",
      safetyHelp: "Bouton Sécurité SOS",
      navigationDirections: "Itinéraire GPS",
      pickupAt: "Départ",
      dropoffAt: "Destination",
      tripSummaryTitle: "Détail financier de la course",
      grossReceived: "Prix total de la course",
      netReceived: "Net chauffeur perçu",
      backToDashboard: "Retour au tableau de bord",
    },
    busMode: {
      title: "Opérations de Ligne d'Autobus",
      routeDetails: "Détails de la ligne & arrêts",
      stationProgression: "Parcours des stations",
      seatMap: "Plan des sièges & occupation",
      seatAvailable: "Disponible",
      seatReserved: "Réservé",
      seatOccupied: "À bord",
      seatNoShow: "Absent",
      scanTicketQr: "Scanner billets (QR)",
      scannerTitle: "Validation de billet",
      scanInstruction: "Scannez le QR code de l'étudiant pour valider l'embarquement",
      validateSampleCode: "Test de validation",
      validationResults: {
        valid: "Billet valide - Embarquement validé",
        alreadyUsed: "Attention : Billet déjà composté !",
        invalid: "Code de billet inexistant",
        wrongRoute: "Billet d'une autre ligne",
      },
      reportDelay: "Signaler un retard",
      confirmDeparture: "Confirmer le départ",
      universityBus: "Navette universitaire",
    },
    universityMode: {
      title: "Transport Universitaire - WASLA TALIB",
      institution: "Pôle universitaire",
      campusRoute: "Circuit campus & cités",
      directionLabel: "Sens",
      studentsOnboard: "Étudiants autorisés",
      reportTrafficDelay: "Signaler un bouchon",
      arriveStation: "Arrivée station campus",
      departStation: "Départ station",
    },
    earnings: {
      title: "Revenus & Portefeuille Chauffeur",
      today: "Aujourd'hui",
      thisWeek: "Cette Semaine",
      thisMonth: "Ce Mois",
      grossFares: "Courses brutes",
      platformCommission: "Commission WASLA",
      adjustments: "Bonus & Incitations",
      netBalance: "Gains nets",
      withdrawableBalance: "Solde disponible pour virement",
      requestPayout: "Demander un virement",
      payoutModalTitle: "Demande de retrait vers votre compte",
      payoutMethodCcp: "Compte Postal CCP Algérie",
      payoutMethodBaridimob: "Application BaridiMob (RIP)",
      payoutMethodBank: "Compte Bancaire (RIB)",
      amountToWithdraw: "Montant à retirer (DZD)",
      confirmWithdrawal: "Valider la demande de retrait",
      demoNotice: "Données financières de simulation opérationnelle certifiée",
      historyTitle: "Historique des transactions",
      receiptTitle: "Bordereau de course",
    },
    profile: {
      title: "Profil & Paramètres",
      driverCategory: "Catégorie de chauffeur",
      activeVehicle: "Véhicule en service",
      changeVehicle: "Changer de véhicule",
      addVehicle: "Ajouter un véhicule",
      companyAffiliation: "Affiliation d'entreprise",
      documentsCompliance: "Dossier réglementaire & permis",
      reviewsAndRatings: "Avis & Performance",
      settings: "Configuration",
      language: "Langue",
      darkMode: "Mode Sombre",
      emergencySos: "Assistance d'urgence",
      faq: "Foire aux questions",
      supportTicket: "Ouvrir un ticket",
    },
    demoBanner: "Plateforme de démonstration certifiée de l'écosystème WASLA TALIB Algérie",
  },
  en: {
    appName: "WASLA DRIVER",
    appSubtitle: "WASLA TALIB National Transport Ecosystem",
    parentEcosystem: "WASLA TALIB Algeria",
    online: "Online & Available",
    offline: "Offline",
    busy: "In active trip",
    breakMode: "On break",
    suspended: "Account under compliance review",
    goOnline: "Go Online",
    goOffline: "Go Offline",
    locationActive: "GPS active & high accuracy",
    selectedVehicle: "Active Vehicle",
    vehicleStatusApproved: "Approved & Compliant",
    eligibleServices: "Eligible Services",
    documentsVerified: "All documents valid",
    documentsExpiredAlert: "Warning: Document needs renewal",
    cannotGoOnlineReason: "Please check vehicle insurance or technical inspection status",
    tabs: {
      home: "Home",
      requests: "Requests",
      trips: "Trips",
      earnings: "Earnings",
      profile: "Profile",
    },
    stats: {
      todayEarnings: "Today's Net Earnings",
      completedTrips: "Completed Trips",
      acceptanceRate: "Acceptance Rate",
      rating: "Average Rating",
      workingHours: "Working Time Today",
      dzd: "DZD",
      tripsCount: "trips",
      hoursUnit: "hrs",
    },
    quickActions: {
      viewRequests: "Incoming Requests",
      activeTrip: "Current Trip",
      vehicles: "Vehicle Fleet",
      complianceDocs: "Compliance Center",
      support: "Support & Help",
      safetyCenter: "Safety & Emergency",
    },
    requests: {
      incomingTitle: "New Trip Request Available",
      newRideRequest: "Instant Ride Request",
      expiresIn: "Expires in",
      seconds: "s",
      acceptRide: "Accept Ride",
      rejectRide: "Decline",
      simulateNewRequest: "Simulate New Request",
      distance: "Estimated Distance",
      duration: "Estimated Duration",
      passenger: "Passenger",
      fare: "Estimated Net Fare",
      paymentMethod: "Payment Method",
      specialNeeds: "Special Notes",
      noActiveRequests: "No pending requests",
      noActiveRequestsDesc: "You are online in your assigned zone. Nearby requests will appear here instantly.",
      history: "Request History",
      allFilter: "All",
      acceptedFilter: "Accepted",
      rejectedFilter: "Declined",
    },
    activeTrip: {
      title: "Active Trip Management",
      steps: {
        accepted: "Request accepted",
        en_route_pickup: "Heading to pickup point",
        arrived_pickup: "Arrived at pickup",
        trip_started: "Trip started",
        arrived_destination: "Arrived at destination",
        completed: "Trip successfully completed",
      },
      nextStepAction: {
        headToPickup: "Navigate to pickup location",
        confirmArrival: "Confirm arrival at passenger",
        startTripWithPassenger: "Start trip after passenger boards",
        reachDestination: "Confirm arrival at destination",
        completeAndReceiveFare: "Complete trip & collect fare",
        finished: "Trip finished",
      },
      passengerDetails: "Passenger Profile",
      callPassenger: "Call Passenger",
      messagePassenger: "Message",
      cancelRide: "Cancel Ride (with reason)",
      safetyHelp: "Safety SOS",
      navigationDirections: "GPS Directions",
      pickupAt: "Pickup Location",
      dropoffAt: "Destination",
      tripSummaryTitle: "Trip Financial Breakdown",
      grossReceived: "Gross Ride Fare",
      netReceived: "Driver Net Earnings",
      backToDashboard: "Return to Dashboard",
    },
    busMode: {
      title: "Bus Route Operations",
      routeDetails: "Route & Stop Timetable",
      stationProgression: "Stop Progress",
      seatMap: "Seat Map & Passenger Manifest",
      seatAvailable: "Available",
      seatReserved: "Reserved",
      seatOccupied: "Boarded",
      seatNoShow: "No Show",
      scanTicketQr: "Scan Ticket (QR)",
      scannerTitle: "Ticket QR Verification",
      scanInstruction: "Scan passenger or student digital ticket QR code to confirm boarding",
      validateSampleCode: "Sample Validation",
      validationResults: {
        valid: "Valid ticket - Boarding approved",
        alreadyUsed: "Warning: Ticket already used!",
        invalid: "Ticket code not recognized",
        wrongRoute: "Ticket belongs to different route",
      },
      reportDelay: "Report Stop Delay",
      confirmDeparture: "Confirm Stop Departure",
      universityBus: "University Shuttle",
    },
    universityMode: {
      title: "University Transit - WASLA TALIB",
      institution: "University Institution",
      campusRoute: "Campus Transit Route",
      directionLabel: "Direction",
      studentsOnboard: "Verified Students",
      reportTrafficDelay: "Report Traffic Congestion",
      arriveStation: "Arrive at Campus Stop",
      departStation: "Depart Stop",
    },
    earnings: {
      title: "Earnings & Financial Hub",
      today: "Today",
      thisWeek: "This Week",
      thisMonth: "This Month",
      grossFares: "Gross Fares",
      platformCommission: "WASLA Commission",
      adjustments: "Incentives & Bonuses",
      netBalance: "Net Earnings",
      withdrawableBalance: "Available Balance for Payout",
      requestPayout: "Request Payout",
      payoutModalTitle: "Withdraw Earnings to Bank/Postal Account",
      payoutMethodCcp: "Algerian Postal Account (CCP)",
      payoutMethodBaridimob: "BaridiMob App (RIP)",
      payoutMethodBank: "Algerian Bank Account (RIB)",
      amountToWithdraw: "Withdrawal Amount (DZD)",
      confirmWithdrawal: "Confirm Payout Request",
      demoNotice: "Simulated operational financial data for certified demonstration",
      historyTitle: "Transaction History",
      receiptTitle: "Trip Receipt",
    },
    profile: {
      title: "Professional Profile & Fleet",
      driverCategory: "Authorized Driver Category",
      activeVehicle: "Assigned Vehicle",
      changeVehicle: "Switch Vehicle",
      addVehicle: "Register New Vehicle",
      companyAffiliation: "Fleet / Company Affiliation",
      documentsCompliance: "Legal Compliance & Licenses",
      reviewsAndRatings: "Passenger Reviews & Score",
      settings: "Preferences",
      language: "Language",
      darkMode: "Dark Mode",
      emergencySos: "Emergency Assistance",
      faq: "Frequently Asked Questions",
      supportTicket: "Submit Support Ticket",
    },
    demoBanner: "Official demonstration platform for WASLA TALIB national ecosystem in Algeria",
  },
};
