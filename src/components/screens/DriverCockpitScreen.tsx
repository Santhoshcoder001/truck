import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface DriverCockpitScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DriverCockpitScreen: React.FC<DriverCockpitScreenProps> = ({ onNavigate }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [tripStatus, setTripStatus] = useState<'available' | 'accepted' | 'declined'>('available');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAccept = () => {
    setTripStatus('accepted');
    showToast('Trip Accepted! Navigating to Active Trip...');
    setTimeout(() => {
      onNavigate('active-trips');
    }, 1200);
  };

  const handleDecline = () => {
    setTripStatus('declined');
    showToast('Trip declined. Searching next match...');
    setTimeout(() => {
      setTripStatus('available');
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 space-y-5">
      {/* 1. Header Greeting & Driver Identity */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[13px] text-[#64748B]">Driver Partner</p>
          <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">Murugan S.</h2>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF7ED] text-[#EA580C] text-[12px] font-bold">
            ★ 4.9 • 32 FT Multi-Axle
          </span>
        </div>
      </div>

      {/* 2. Availability Switch: Giant, readable in 2 seconds */}
      <div
        onClick={() => setIsOnline(!isOnline)}
        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
          isOnline
            ? 'bg-[#0F2942] border-[#0F2942] text-white shadow-md'
            : 'bg-white border-[#CBD5E1] text-[#0F172A]'
        }`}
      >
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? 'bg-[#16A34A] animate-pulse' : 'bg-[#94A3B8]'
              }`}
            />
            <span className="text-[16px] font-bold">
              {isOnline ? 'ONLINE — READY FOR TRIPS' : 'OFFLINE — REST MODE'}
            </span>
          </div>
          <p className={`text-[12px] ${isOnline ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            {isOnline ? 'Receiving verified loads near Chennai-NH48' : 'Tap to go online'}
          </p>
        </div>

        <div
          className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
            isOnline ? 'bg-[#EA580C]' : 'bg-[#CBD5E1]'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white transition-transform ${
              isOnline ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      </div>

      {/* 3. Today's Summary (3 key stats, uncluttered) */}
      <section className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B] mb-3">
          Today's Summary
        </h3>
        <div className="grid grid-cols-3 divide-x divide-[#F1F5F9] text-center">
          <div className="px-2">
            <p className="text-[12px] text-[#64748B]">Trips</p>
            <p className="text-[20px] font-bold text-[#0F172A] mt-0.5">3</p>
          </div>
          <div className="px-2">
            <p className="text-[12px] text-[#64748B]">Earnings</p>
            <p className="text-[20px] font-bold text-[#16A34A] mt-0.5">₹5,840</p>
          </div>
          <div className="px-2">
            <p className="text-[12px] text-[#64748B]">Distance</p>
            <p className="text-[20px] font-bold text-[#0F172A] mt-0.5">278 km</p>
          </div>
        </div>
      </section>

      {/* 4. Nearby Load Opportunity (One Clear Card) */}
      <section className="space-y-2">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
          Nearby Load Opportunity
        </h3>

        {tripStatus === 'available' && isOnline ? (
          <div className="bg-white rounded-2xl p-4 border-2 border-[#EA580C] shadow-md space-y-4">
            {/* Route & Price */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[17px] font-bold text-[#0F172A]">
                  <span>Chennai</span>
                  <span className="material-symbols-outlined text-[#94A3B8] text-[18px]">arrow_forward</span>
                  <span>Bengaluru</span>
                </div>
                <p className="text-[13px] text-[#64748B] mt-0.5">18 MT · 32 FT Multi-Axle</p>
                <p className="text-[12px] text-[#475569] mt-0.5">Pickup: Today • 4:00 PM</p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-[#64748B] block">Guaranteed Payout</span>
                <span className="text-[22px] font-bold text-[#EA580C]">₹42,000</span>
              </div>
            </div>

            {/* Quick Trip Details */}
            <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] flex items-center justify-between text-[12px] text-[#475569]">
              <span>Distance: 318 km</span>
              <span>•</span>
              <span>Est. Transit: ~6h 20m</span>
              <span>•</span>
              <span>Advance: 50% UPI</span>
            </div>

            {/* Actions: [ Accept Trip ] [ Decline ] */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleDecline}
                className="h-12 rounded-lg border border-[#CBD5E1] bg-white text-[#475569] font-semibold text-[14px] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors"
              >
                Decline
              </button>

              <button
                type="button"
                onClick={handleAccept}
                className="h-12 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-1 transition-colors"
              >
                <span>Accept Trip</span>
                <span className="material-symbols-outlined text-[18px]">check</span>
              </button>
            </div>
          </div>
        ) : tripStatus === 'accepted' ? (
          <div className="bg-white rounded-2xl p-5 border border-[#16A34A] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
            <h4 className="text-[16px] font-bold text-[#0F172A]">Trip Confirmed!</h4>
            <p className="text-[13px] text-[#475569]">Proceeding to loading bay at Ambattur IE.</p>
            <button
              type="button"
              onClick={() => onNavigate('active-trips')}
              className="w-full h-11 rounded-lg bg-[#0F2942] text-white font-semibold text-[14px]"
            >
              Open In-Cab Navigation
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] text-center text-[#64748B] space-y-2">
            <span className="material-symbols-outlined text-[28px] text-[#94A3B8]">search</span>
            <p className="text-[14px] font-medium">
              {isOnline ? 'Searching for next load match along your route...' : 'Go online to view new loads'}
            </p>
          </div>
        )}
      </section>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto bg-[#0F2942] text-white p-3.5 rounded-xl shadow-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[#EA580C] text-[20px] shrink-0">info</span>
          <p className="text-[13px] font-medium leading-tight flex-1">{toastMessage}</p>
        </div>
      )}
    </div>
  );
};
