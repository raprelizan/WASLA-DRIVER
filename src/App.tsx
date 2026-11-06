import React, { useState, useEffect } from 'react';
import {
  DriverStatus,
  DriverCategory,
  Language,
  DriverProfile,
  Vehicle,
  DriverDocument,
  TripRequest,
  ActiveTrip,
  ActiveTripStage,
  ScheduledTrip,
  BusSeat,
  NotificationItem,
  SupportTicket,
  EarningTransaction
} from './types';
import {
  initialDriverProfile,
  initialVehicles,
  initialDocuments,
  initialRequests,
  initialActiveTrip,
  initialScheduledTrips,
  initialBusState,
  initialUniversityState,
  initialTransactions,
  initialSupportTickets,
  initialNotifications
} from './data/mockData';
import { translations } from './services/i18n';
import { Header } from './components/common/Header';
import { BottomNav, TabType } from './components/common/BottomNav';
import { SosModal } from './components/common/SosModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { OnboardingModal } from './features/onboarding/OnboardingModal';
import { DashboardTab } from './features/dashboard/DashboardTab';
import { RequestsTab } from './features/requests/RequestsTab';
import { TripsTab } from './features/active-trip/TripsTab';
import { EarningsTab } from './features/earnings/EarningsTab';
import { ProfileTab } from './features/profile/ProfileTab';
import { AddVehicleModal } from './features/vehicles/AddVehicleModal';
import { UploadDocumentModal } from './features/documents/UploadDocumentModal';
import { SupportModal } from './features/support/SupportModal';

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [profileActiveSection, setProfileActiveSection] = useState<'vehicles' | 'documents' | 'performance' | 'settings'>('vehicles');
  const [lang, setLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Core Data States
  const [profile, setProfile] = useState<DriverProfile>(initialDriverProfile);
  const [status, setStatus] = useState<DriverStatus>('online');
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [activeVehicleId, setActiveVehicleId] = useState<string>('VEH-01');
  const [documents, setDocuments] = useState<DriverDocument[]>(initialDocuments);
  const [requests, setRequests] = useState<TripRequest[]>(initialRequests);
  const [activeTrip, setActiveTrip] = useState<ActiveTrip | null>(initialActiveTrip);
  const [scheduledTrips, setScheduledTrips] = useState<ScheduledTrip[]>(initialScheduledTrips);
  const [busState, setBusState] = useState(initialBusState);
  const [universityState, setUniversityState] = useState(initialUniversityState);
  const [transactions, setTransactions] = useState<EarningTransaction[]>(initialTransactions);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Modals
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [selectedDocForUpload, setSelectedDocForUpload] = useState<DriverDocument | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Active Vehicle lookup
  const activeVehicle =
    vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

  // Sync RTL / LTR on html root
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Sync Dark / Light theme class on html root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Request countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRequests((prev) =>
        prev.map((req) => {
          if ((req.status === 'new' || req.status === 'awaiting') && req.expiresInSeconds > 0) {
            const nextSec = req.expiresInSeconds - 1;
            return {
              ...req,
              expiresInSeconds: nextSec,
              status: nextSec === 0 ? 'expired' : req.status,
            };
          }
          return req;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Online / Offline toggle
  const handleToggleOnline = () => {
    if (status === 'online') {
      setStatus('offline');
    } else {
      setStatus('online');
    }
  };

  // Simulate new incoming ride request
  const handleSimulateRequest = () => {
    const sampleLocations = [
      {
        pickup: 'مطار هواري بومدين الدولي - صالة 2 الوطنية',
        dropoff: 'فندق الجزائر (سانت جورج) - الأبيار',
        distance: 21.2,
        time: 30,
        fare: 2100,
        passenger: 'مهدي بلقاضي',
        type: 'private' as DriverCategory,
        method: 'baridimob' as const,
      },
      {
        pickup: 'القطب الجامعي دالي إبراهيم - جامعة الجزائر 3',
        dropoff: 'محطة المترو عين النعجة، جسر قسنطينة',
        distance: 18.0,
        time: 26,
        fare: 1250,
        passenger: 'أمينة بن عيسى (طالبة WASLA TALIB)',
        type: 'university' as DriverCategory,
        method: 'wallet' as const,
      },
      {
        pickup: 'محطة الحافلات خروبة لنقل المسافرين',
        dropoff: 'المنطقة الصناعية الرويبة - الجزائر',
        distance: 22.4,
        time: 32,
        fare: 2350,
        passenger: 'سمير طواهرية',
        type: 'taxi' as DriverCategory,
        method: 'cash' as const,
      },
    ];

    const pick = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    const newReqId = `REQ-${Date.now().toString().slice(-3)}`;

    const newReq: TripRequest = {
      id: newReqId,
      passengerName: pick.passenger,
      passengerPhone: '0552 14 77 90',
      passengerRating: 4.95,
      passengerCount: 1,
      serviceType: pick.type,
      pickupAddress: pick.pickup,
      dropoffAddress: pick.dropoff,
      pickupWilaya: 'الجزائر',
      distanceKm: pick.distance,
      estimatedMinutes: pick.time,
      fareDzd: pick.fare,
      commissionDzd: Math.round(pick.fare * 0.1),
      paymentMethod: pick.method,
      expiresInSeconds: 30,
      status: 'new',
      createdAt: 'الآن',
    };

    setRequests((prev) => [newReq, ...prev]);

    // Add alert notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      category: 'request',
      titleAr: 'طلب مشوار جديد متاح بالقرب منك',
      titleFr: 'Nouvelle course disponible',
      titleEn: 'New Ride Request Available',
      bodyAr: `طلب نقل بقيمة ${pick.fare} د.ج نحو ${pick.dropoff}.`,
      bodyFr: `Course de ${pick.fare} DZD vers ${pick.dropoff}.`,
      bodyEn: `Trip of ${pick.fare} DZD towards ${pick.dropoff}.`,
      timestamp: 'الآن',
      isRead: false,
      actionTab: 'requests',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Accept request & activate trip
  const handleAcceptRequest = (req: TripRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: 'accepted' } : r))
    );

    const newActiveTrip: ActiveTrip = {
      id: `TRIP-DZ-${Date.now().toString().slice(-5)}`,
      request: req,
      stage: 'accepted',
      driverLocation: { lat: 36.7538, lng: 3.0588 },
      pickupLocation: { lat: 36.7621, lng: 3.0543 },
      dropoffLocation: { lat: 36.7215, lng: 3.1872 },
      startTime: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
      currentStepIndex: 0,
      notes: 'المسار جاهز للملاحة الفورية.',
    };

    setActiveTrip(newActiveTrip);
    setStatus('busy');
    setActiveTab('trips');
  };

  // Reject request
  const handleRejectRequest = (req: TripRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: 'rejected' } : r))
    );
  };

  // Advance active trip stage
  const handleUpdateTripStage = (stage: ActiveTripStage) => {
    if (!activeTrip) return;
    setActiveTrip({
      ...activeTrip,
      stage,
      currentStepIndex: activeTrip.currentStepIndex + 1,
    });
  };

  // Complete fare collection & finish trip
  const handleCompleteFare = () => {
    if (!activeTrip) return;
    const req = activeTrip.request;

    // Add transaction
    const newTxn: EarningTransaction = {
      id: `TXN-${Date.now().toString().slice(-5)}`,
      date: 'اليوم، 5 نوفمبر 2026',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      tripRef: activeTrip.id,
      type: 'trip_fare',
      grossFareDzd: req.fareDzd,
      commissionDzd: req.commissionDzd,
      adjustmentsDzd: 0,
      netAmountDzd: req.fareDzd - req.commissionDzd,
      paymentMethod: req.paymentMethod,
      status: 'settled',
      passengerName: req.passengerName,
      routeSummary: `${req.pickupAddress.split('-')[0]} ➜ ${req.dropoffAddress.split('-')[0]}`,
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Update profile trips count
    setProfile((prev) => ({
      ...prev,
      totalTrips: prev.totalTrips + 1,
    }));

    // Reset active trip and go back to online
    setActiveTrip(null);
    setStatus('online');
    setActiveTab('home');
  };

  // Cancel trip with reason
  const handleCancelTrip = (reason: string) => {
    if (!activeTrip) return;
    setActiveTrip(null);
    setStatus('online');
    setActiveTab('home');
  };

  // Add vehicle
  const handleAddVehicle = (newVeh: Vehicle) => {
    setVehicles((prev) => [...prev, newVeh]);
  };

  // Select active vehicle
  const handleSelectActiveVehicle = (vehId: string) => {
    setActiveVehicleId(vehId);
    setVehicles((prev) =>
      prev.map((v) => ({ ...v, isActive: v.id === vehId }))
    );
  };

  // Update document
  const handleSaveDocument = (docId: string, docNumber: string, expiryDate: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              documentNumber: docNumber,
              expiryDate,
              status: 'approved',
            }
          : d
      )
    );
  };

  // Update bus seat
  const handleUpdateBusSeatStatus = (seatId: string, seatStatus: BusSeat['status']) => {
    setBusState((prev) => ({
      ...prev,
      seats: prev.seats.map((s) => (s.id === seatId ? { ...s, status: seatStatus } : s)),
    }));
  };

  // Advance bus stop
  const handleAdvanceBusStop = () => {
    setBusState((prev) => {
      const nextIdx = (prev.currentStopIndex + 1) % prev.stops.length;
      return {
        ...prev,
        currentStopIndex: nextIdx,
        stops: prev.stops.map((stp, i) => ({
          ...stp,
          isCompleted: i < nextIdx,
          isCurrent: i === nextIdx,
        })),
      };
    });
  };

  // Advance university station
  const handleAdvanceUniversityStation = () => {
    setUniversityState((prev) => {
      const nextIdx = (prev.currentStopIndex + 1) % prev.stops.length;
      return {
        ...prev,
        currentStopIndex: nextIdx,
        stops: prev.stops.map((stp, i) => ({
          ...stp,
          isCompleted: i < nextIdx,
        })),
      };
    });
  };

  // Add university delay notice
  const handleAddUniversityDelay = (reason: string) => {
    setUniversityState((prev) => ({
      ...prev,
      delaysReported: [
        {
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          reason,
        },
        ...prev.delaysReported,
      ],
    }));
  };

  // Withdrawal request
  const handleRequestWithdrawal = (amount: number, method: string, accountDetails: string) => {
    const newTxn: EarningTransaction = {
      id: `TXN-${Date.now().toString().slice(-5)}`,
      date: 'اليوم، 5 نوفمبر 2026',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      tripRef: `PAYOUT-REQ-${Date.now().toString().slice(-4)}`,
      type: 'withdrawal',
      grossFareDzd: amount,
      commissionDzd: 0,
      adjustmentsDzd: 0,
      netAmountDzd: -amount,
      paymentMethod: method === 'baridimob' ? 'baridimob' : 'wallet',
      status: 'pending',
      routeSummary: `طلب تحويل رصيد لحساب (${accountDetails.slice(0, 10)}...)`,
    };

    setTransactions((prev) => [newTxn, ...prev]);
  };

  // Create support ticket
  const handleCreateSupportTicket = (
    category: SupportTicket['category'],
    subject: string,
    description: string
  ) => {
    const newTicket: SupportTicket = {
      id: `TCK-${Date.now().toString().slice(-4)}`,
      ticketNumber: `WASLA-TCK-${Date.now().toString().slice(-4)}`,
      category,
      subject,
      description,
      status: 'open',
      createdAt: 'الآن',
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleSelectNotification = (item: NotificationItem) => {
    if (item.actionTab) {
      setActiveTab(item.actionTab as TabType);
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;
  const pendingRequestsCount = requests.filter(
    (r) => r.status === 'new' || r.status === 'awaiting'
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Container wrapper: either phone frame or full wide desktop */}
      <div
        className={
          isPhoneFrame
            ? 'max-w-md mx-auto my-0 sm:my-6 min-h-screen sm:min-h-[840px] sm:max-h-[920px] bg-slate-50 dark:bg-slate-950 sm:rounded-[40px] shadow-2xl border-0 sm:border-8 sm:border-slate-800 overflow-hidden flex flex-col relative'
            : 'max-w-4xl mx-auto min-h-screen flex flex-col relative'
        }
      >
        {/* Top Header */}
        <Header
          driverStatus={status}
          unreadCount={unreadNotificationsCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSos={() => setIsSosOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          lang={lang}
          onChangeLang={setLang}
          isPhoneFrame={isPhoneFrame}
          onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          onSimulateRequest={handleSimulateRequest}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'home' && (
            <DashboardTab
              profile={profile}
              status={status}
              onToggleOnline={handleToggleOnline}
              activeVehicle={activeVehicle}
              documents={documents}
              activeTrip={activeTrip}
              scheduledTrips={scheduledTrips}
              pendingRequests={requests.filter((r) => r.status === 'new' || r.status === 'awaiting')}
              onChangeTab={setActiveTab}
              onOpenVehicles={() => {
                setProfileActiveSection('vehicles');
                setActiveTab('profile');
              }}
              onOpenDocuments={() => {
                setProfileActiveSection('documents');
                setActiveTab('profile');
              }}
              onOpenSupport={() => setIsSupportOpen(true)}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
              lang={lang}
            />
          )}

          {activeTab === 'requests' && (
            <RequestsTab
              requests={requests}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
              onSimulateRequest={handleSimulateRequest}
              lang={lang}
            />
          )}

          {activeTab === 'trips' && (
            <TripsTab
              activeTrip={activeTrip}
              scheduledTrips={scheduledTrips}
              busState={busState}
              universityState={universityState}
              driverCategory={profile.driverCategory}
              onUpdateTripStage={handleUpdateTripStage}
              onCancelTrip={handleCancelTrip}
              onOpenSos={() => setIsSosOpen(true)}
              onCompleteFare={handleCompleteFare}
              onUpdateBusSeatStatus={handleUpdateBusSeatStatus}
              onAdvanceBusStop={handleAdvanceBusStop}
              onAdvanceUniversityStation={handleAdvanceUniversityStation}
              onAddUniversityDelay={handleAddUniversityDelay}
              onAcceptScheduledTrip={(tr) => {
                // Confirm scheduled trip
                setScheduledTrips((prev) =>
                  prev.map((s) => (s.id === tr.id ? { ...s, status: 'confirmed' } : s))
                );
              }}
              lang={lang}
            />
          )}

          {activeTab === 'earnings' && (
            <EarningsTab
              transactions={transactions}
              onRequestWithdrawal={handleRequestWithdrawal}
              lang={lang}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              profile={profile}
              vehicles={vehicles}
              activeVehicle={activeVehicle}
              documents={documents}
              onSelectActiveVehicle={handleSelectActiveVehicle}
              onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
              onOpenUploadDoc={(doc) => {
                setSelectedDocForUpload(doc);
              }}
              onChangeCategory={(cat) => {
                setProfile((prev) => ({
                  ...prev,
                  driverCategory: cat,
                  categoryLabelAr:
                    cat === 'private'
                      ? 'سائق نقل خاص (VTC)'
                      : cat === 'taxi'
                      ? 'سائق تاكسي نظامي'
                      : cat === 'university'
                      ? 'سائق نقل جامعي (WASLA TALIB)'
                      : cat === 'intercity'
                      ? 'سائق نقل بين الولايات'
                      : cat === 'bus'
                      ? 'سائق حافلة مسافرين'
                      : 'سائق مؤسسة نقل (ETUSA)',
                }));

                // Adapt active vehicle based on category
                if (cat === 'bus' || cat === 'university') {
                  handleSelectActiveVehicle('VEH-03');
                } else if (cat === 'taxi') {
                  handleSelectActiveVehicle('VEH-02');
                } else if (cat === 'private') {
                  handleSelectActiveVehicle('VEH-01');
                }
              }}
              onOpenSupport={() => setIsSupportOpen(true)}
              onOpenSos={() => setIsSosOpen(true)}
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode(!isDarkMode)}
              lang={lang}
              onChangeLang={setLang}
              activeSection={profileActiveSection}
              onSectionChange={setProfileActiveSection}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          pendingRequestsCount={pendingRequestsCount}
          hasActiveTrip={activeTrip !== null}
          lang={lang}
        />
      </div>

      {/* MODALS */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        lang={lang}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
        lang={lang}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(data) => {
          setProfile((prev) => ({
            ...prev,
            fullName: data.fullName,
            phone: data.phone,
            wilaya: data.wilaya,
            driverCategory: data.category,
          }));
        }}
        lang={lang}
      />

      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onAddVehicle={handleAddVehicle}
        lang={lang}
      />

      <UploadDocumentModal
        document={selectedDocForUpload}
        isOpen={selectedDocForUpload !== null}
        onClose={() => setSelectedDocForUpload(null)}
        onSaveDocument={handleSaveDocument}
        lang={lang}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        tickets={supportTickets}
        onCreateTicket={handleCreateSupportTicket}
        lang={lang}
      />
    </div>
  );
}
