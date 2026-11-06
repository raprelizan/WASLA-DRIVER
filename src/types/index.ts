export type DriverCategory =
  | 'private'     // سائق نقل خاص (VTC)
  | 'taxi'        // سائق تاكسي
  | 'intercity'   // سائق نقل بين الولايات
  | 'university'  // سائق نقل جامعي (WASLA TALIB)
  | 'bus'         // سائق حافلة
  | 'company';    // سائق تابع لمؤسسة نقل

export type DriverStatus = 'offline' | 'online' | 'busy' | 'break' | 'suspended';

export type Language = 'ar' | 'fr' | 'en';

export interface DriverProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl: string;
  driverCategory: DriverCategory;
  categoryLabelAr: string;
  wilaya: string;
  wilayaCode: string;
  municipality: string;
  rating: number;
  totalTrips: number;
  acceptanceRate: number; // e.g. 96%
  cancellationRate: number; // e.g. 1.8%
  onTimeRate: number; // e.g. 98%
  todayWorkingMinutes: number;
  isVerified: boolean;
  companyAffiliation?: {
    companyName: string;
    fleetId: string;
    contractType: string;
    dispatchNotice?: string;
  };
}

export type DocumentType =
  | 'national_id'
  | 'driving_license'
  | 'carte_grise'
  | 'assurance'
  | 'controle_technique'
  | 'professional_card'
  | 'company_contract';

export type VerificationStatus =
  | 'approved'
  | 'pending'
  | 'rejected'
  | 'expired'
  | 'requires_renewal';

export interface DriverDocument {
  id: string;
  type: DocumentType;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  status: VerificationStatus;
  rejectionReason?: string;
  filePreviewUrl?: string;
  isRequired: boolean;
  applicableCategories: DriverCategory[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  colorNameAr: string;
  plateNumber: string;
  category: DriverCategory;
  seatsCount: number;
  luggageCapacityKg: number;
  hasAirConditioning: boolean;
  hasAccessibilityRamp: boolean;
  photoUrl: string;
  status: 'approved' | 'pending' | 'rejected' | 'expired_docs';
  isActive: boolean;
  documents: {
    carteGrise: boolean;
    assuranceValidUntil: string;
    controleValidUntil: string;
  };
}

export interface TripRequest {
  id: string;
  passengerName: string;
  passengerPhone: string;
  passengerRating: number;
  passengerCount: number;
  serviceType: DriverCategory;
  pickupAddress: string;
  dropoffAddress: string;
  pickupWilaya: string;
  distanceKm: number;
  estimatedMinutes: number;
  fareDzd: number;
  commissionDzd: number;
  paymentMethod: 'cash' | 'baridimob' | 'wallet';
  specialRequirements?: string;
  expiresInSeconds: number;
  status: 'new' | 'awaiting' | 'accepted' | 'rejected' | 'expired' | 'cancelled';
  createdAt: string;
}

export type ActiveTripStage =
  | 'accepted'            // تم قبول الطلب
  | 'en_route_pickup'     // التوجه إلى نقطة الانطلاق
  | 'arrived_pickup'      // وصلت إلى الراكب
  | 'trip_started'        // بدأت الرحلة
  | 'arrived_destination' // وصلت إلى الوجهة
  | 'completed';          // اكتملت الرحلة

export interface ActiveTrip {
  id: string;
  request: TripRequest;
  stage: ActiveTripStage;
  driverLocation: { lat: number; lng: number };
  pickupLocation: { lat: number; lng: number };
  dropoffLocation: { lat: number; lng: number };
  startTime?: string;
  currentStepIndex: number;
  notes?: string;
}

export interface ScheduledTrip {
  id: string;
  departure: string;
  destination: string;
  departureWilaya: string;
  destinationWilaya: string;
  date: string;
  time: string;
  passengerCount: number;
  serviceType: DriverCategory;
  fareDzd: number;
  status: 'upcoming' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
  isRecurring: boolean;
  recurrenceText?: string;
}

export interface BusSeat {
  id: string;
  seatNumber: number;
  row: number;
  position: 'window_left' | 'aisle_left' | 'aisle_right' | 'window_right';
  status: 'available' | 'reserved' | 'occupied' | 'no_show';
  passengerName?: string;
  ticketCode?: string;
  destinationStop?: string;
}

export interface BusRouteStop {
  id: string;
  stationName: string;
  wilaya: string;
  scheduledTime: string;
  isCompleted: boolean;
  isCurrent: boolean;
  passengersBoarding: number;
  passengersAlighting: number;
}

export interface BusOperationState {
  routeNumber: string;
  routeName: string;
  busPlate: string;
  capacity: number;
  stops: BusRouteStop[];
  seats: BusSeat[];
  currentStopIndex: number;
  totalBoarded: number;
}

export interface UniversityStop {
  id: string;
  campusName: string;
  arrivalTime: string;
  departureTime: string;
  isCompleted: boolean;
  waitingStudentsCount: number;
}

export interface UniversityTransportState {
  institution: string;
  campusName: string;
  routeCode: string;
  direction: 'to_campus' | 'to_residence';
  busNumber: string;
  stops: UniversityStop[];
  currentStopIndex: number;
  totalBoardedStudents: number;
  delaysReported: { time: string; reason: string }[];
}

export interface EarningTransaction {
  id: string;
  date: string;
  time: string;
  tripRef: string;
  type: 'trip_fare' | 'bonus' | 'withdrawal' | 'commission';
  grossFareDzd: number;
  commissionDzd: number;
  adjustmentsDzd: number;
  netAmountDzd: number;
  paymentMethod: 'cash' | 'baridimob' | 'wallet' | 'bank_transfer';
  status: 'settled' | 'pending' | 'processing';
  passengerName?: string;
  routeSummary?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  category: 'trip' | 'payment' | 'account' | 'vehicle' | 'technical' | 'passenger';
  subject: string;
  description: string;
  status: 'open' | 'in_review' | 'resolved';
  createdAt: string;
  lastResponse?: string;
}

export interface NotificationItem {
  id: string;
  category: 'request' | 'trip' | 'document' | 'earnings' | 'company' | 'safety';
  titleAr: string;
  titleFr: string;
  titleEn: string;
  bodyAr: string;
  bodyFr: string;
  bodyEn: string;
  timestamp: string;
  isRead: boolean;
  actionTab?: string;
}
