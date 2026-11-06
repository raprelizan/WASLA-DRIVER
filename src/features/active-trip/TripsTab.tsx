import React, { useState } from 'react';
import {
  Navigation,
  Calendar,
  Bus,
  GraduationCap,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Compass
} from 'lucide-react';
import {
  ActiveTrip,
  ActiveTripStage,
  ScheduledTrip,
  BusOperationState,
  BusSeat,
  UniversityTransportState,
  Language,
  DriverCategory
} from '../../types';
import { ActiveTripView } from './ActiveTripView';
import { BusOperationsView } from './BusOperationsView';
import { UniversityTransportView } from './UniversityTransportView';

interface TripsTabProps {
  activeTrip: ActiveTrip | null;
  scheduledTrips: ScheduledTrip[];
  busState: BusOperationState;
  universityState: UniversityTransportState;
  driverCategory: DriverCategory;
  onUpdateTripStage: (stage: ActiveTripStage) => void;
  onCancelTrip: (reason: string) => void;
  onOpenSos: () => void;
  onCompleteFare: () => void;
  onUpdateBusSeatStatus: (seatId: string, status: BusSeat['status']) => void;
  onAdvanceBusStop: () => void;
  onAdvanceUniversityStation: () => void;
  onAddUniversityDelay: (reason: string) => void;
  onAcceptScheduledTrip: (trip: ScheduledTrip) => void;
  lang: Language;
}

export const TripsTab: React.FC<TripsTabProps> = ({
  activeTrip,
  scheduledTrips,
  busState,
  universityState,
  driverCategory,
  onUpdateTripStage,
  onCancelTrip,
  onOpenSos,
  onCompleteFare,
  onUpdateBusSeatStatus,
  onAdvanceBusStop,
  onAdvanceUniversityStation,
  onAddUniversityDelay,
  onAcceptScheduledTrip,
  lang,
}) => {
  const isAr = lang === 'ar';

  // Sub-tabs: 'active' | 'scheduled' | 'bus' | 'university'
  const [subTab, setSubTab] = useState<'active' | 'scheduled' | 'bus' | 'university'>(
    activeTrip ? 'active' : driverCategory === 'bus' ? 'bus' : driverCategory === 'university' ? 'university' : 'active'
  );

  const [scheduledFilter, setScheduledFilter] = useState<'all' | 'confirmed' | 'upcoming'>('all');

  const filteredScheduled = scheduledTrips.filter((t) => {
    if (scheduledFilter === 'confirmed') return t.status === 'confirmed';
    if (scheduledFilter === 'upcoming') return t.status === 'upcoming';
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Sub-mode Navigation Pill Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto text-xs">
        <button
          onClick={() => setSubTab('active')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            subTab === 'active'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{isAr ? 'رحلة نشطة' : 'Active Trip'}</span>
          {activeTrip && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
        </button>

        <button
          onClick={() => setSubTab('scheduled')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            subTab === 'scheduled'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{isAr ? 'الرحلات المجدولة' : 'Scheduled'}</span>
          <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 rounded-full">
            {scheduledTrips.length}
          </span>
        </button>

        <button
          onClick={() => setSubTab('bus')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            subTab === 'bus'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Bus className="w-3.5 h-3.5" />
          <span>{isAr ? 'عمليات الحافلة' : 'Bus Mode'}</span>
        </button>

        <button
          onClick={() => setSubTab('university')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            subTab === 'university'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{isAr ? 'النقل الجامعي' : 'University Transit'}</span>
        </button>
      </div>

      {/* SUB-VIEW 1: ACTIVE TRIP */}
      {subTab === 'active' && (
        <ActiveTripView
          trip={activeTrip}
          onUpdateStage={onUpdateTripStage}
          onCancelTrip={onCancelTrip}
          onOpenSos={onOpenSos}
          onCompleteFare={onCompleteFare}
          lang={lang}
        />
      )}

      {/* SUB-VIEW 2: SCHEDULED TRIPS */}
      {subTab === 'scheduled' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
                {isAr ? 'جدول الرحلات بين الولايات والمحطات' : 'Intercity Scheduled Trips'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'رحلات مجدولة ومنسقة مسبقاً عبر محطات النقل البري' : 'Pre-booked intercity departures'}
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
              <button
                onClick={() => setScheduledFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium ${
                  scheduledFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                {isAr ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setScheduledFilter('confirmed')}
                className={`px-2.5 py-1 rounded-lg font-medium ${
                  scheduledFilter === 'confirmed'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                {isAr ? 'مؤكدة' : 'Confirmed'}
              </button>
              <button
                onClick={() => setScheduledFilter('upcoming')}
                className={`px-2.5 py-1 rounded-lg font-medium ${
                  scheduledFilter === 'upcoming'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                {isAr ? 'قادمة' : 'Upcoming'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredScheduled.map((trip) => {
              const isConfirmed = trip.status === 'confirmed';
              return (
                <div
                  key={trip.id}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isConfirmed
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
                      }`}
                    >
                      {isConfirmed ? (isAr ? 'رحلة مؤكدة الحجز' : 'Confirmed') : (isAr ? 'رحلة قادمة' : 'Upcoming')}
                    </span>

                    <span className="text-xs font-black text-slate-900 dark:text-slate-100 tabular-nums">
                      {trip.fareDzd} د.ج <span className="text-[10px] text-slate-400 font-normal">/ {isAr ? 'راكب' : 'seat'}</span>
                    </span>
                  </div>

                  {/* Route points */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>{trip.departure}</span>
                    </div>
                    <div className="h-3 border-s-2 border-dashed border-slate-300 dark:border-slate-700 ms-1" />
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span>{trip.destination}</span>
                    </div>
                  </div>

                  {/* Date, Time, Passengers */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{trip.date} · {trip.time}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{trip.passengerCount} {isAr ? 'ركاب مسجلين' : 'booked'}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-1">
                    {trip.isRecurring && (
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                        ↻ {trip.recurrenceText}
                      </span>
                    )}
                    <button
                      onClick={() => onAcceptScheduledTrip(trip)}
                      className="ms-auto px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                    >
                      {isAr ? 'تأكيد الاستعداد للمسار' : 'Confirm Readiness'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: BUS OPERATIONS */}
      {subTab === 'bus' && (
        <BusOperationsView
          busState={busState}
          onUpdateSeatStatus={onUpdateBusSeatStatus}
          onAdvanceStop={onAdvanceBusStop}
          lang={lang}
        />
      )}

      {/* SUB-VIEW 4: UNIVERSITY TRANSIT */}
      {subTab === 'university' && (
        <UniversityTransportView
          universityState={universityState}
          onAdvanceStation={onAdvanceUniversityStation}
          onAddDelay={onAddUniversityDelay}
          lang={lang}
        />
      )}
    </div>
  );
};
