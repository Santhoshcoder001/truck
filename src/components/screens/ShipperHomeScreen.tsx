import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface ShipperHomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ShipperHomeScreen: React.FC<ShipperHomeScreenProps> = ({ onNavigate }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 space-y-6">
      {/* 1. Greeting */}
      <div className="space-y-0.5">
        <p className="text-[14px] text-[#475569]">Good morning</p>
        <h2 className="text-[24px] font-bold text-[#0F172A] tracking-tight">Ashok Traders</h2>
      </div>

      {/* 2. Primary Action Hero: Move something today? */}
      <section className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="space-y-1">
          <h3 className="text-[18px] font-bold text-[#0F172A]">Move something today?</h3>
          <p className="text-[14px] text-[#475569]">
            Book verified trucks across South India corridors.
          </p>
        </div>

        {/* The single dominant Orange CTA */}
        <button
          type="button"
          onClick={() => onNavigate('loads-post')}
          className="w-full min-h-[52px] h-[52px] bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.99] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>+ Post a Load</span>
        </button>
      </section>

      {/* 3. Quick Actions */}
      <section className="space-y-2.5">
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('loads-post')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors gap-1.5 text-center min-h-[72px]"
          >
            <span className="material-symbols-outlined text-[#0F2942] text-[22px]">replay</span>
            <span className="text-[12px] font-semibold text-[#0F172A] leading-tight">Book Again</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('fleet-track')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors gap-1.5 text-center min-h-[72px]"
          >
            <span className="material-symbols-outlined text-[#0F2942] text-[22px]">near_me</span>
            <span className="text-[12px] font-semibold text-[#0F172A] leading-tight">Track Live</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Documents: e-Way Bill #8839 verified and valid.')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors gap-1.5 text-center min-h-[72px]"
          >
            <span className="material-symbols-outlined text-[#0F2942] text-[22px]">description</span>
            <span className="text-[12px] font-semibold text-[#0F172A] leading-tight">Documents</span>
          </button>
        </div>
      </section>

      {/* 4. Active Trip */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight uppercase tracking-wider text-[12px] text-[#475569]">
            Active Trip
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
            In Transit
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-3.5">
          {/* Route */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#0F172A]">Chennai</span>
                <span className="material-symbols-outlined text-[#94A3B8] text-[16px]">arrow_forward</span>
                <span className="text-[16px] font-bold text-[#0F172A]">Bengaluru</span>
              </div>
              <p className="text-[13px] text-[#475569]">18 MT · 32 FT Multi-Axle</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[#94A3B8] uppercase">ETA</p>
              <p className="text-[15px] font-bold text-[#0F172A]">6:40 PM</p>
            </div>
          </div>

          {/* Secondary Action to track */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => onNavigate('fleet-track')}
              className="w-full min-h-[44px] h-[44px] bg-[#F1F5F9] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] text-[#0F2942] rounded-lg font-semibold text-[14px] flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">near_me</span>
              <span>Track Live</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Recent Loads (Only 2 records, clean and uncrowded) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#475569]">
            Recent Loads
          </h3>
          <button
            type="button"
            onClick={() => onNavigate('loads-post')}
            className="text-[12px] font-semibold text-[#0F2942] hover:underline"
          >
            Post New
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Load Card 1 */}
          <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#64748B]">LOAD #NL-7042</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#16A34A] text-[11px] font-semibold">
                ● Confirmed
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-bold text-[#0F172A]">Chennai → Hosur</p>
                <p className="text-[12px] text-[#64748B]">18 MT · 32 FT</p>
              </div>
              <span className="text-[16px] font-bold text-[#0F172A]">₹42,000</span>
            </div>
          </div>

          {/* Load Card 2 */}
          <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#64748B]">LOAD #NL-6821</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] text-[11px] font-semibold">
                ✓ Delivered
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-bold text-[#0F172A]">Salem → Bengaluru</p>
                <p className="text-[12px] text-[#64748B]">24 MT · Taurus</p>
              </div>
              <span className="text-[16px] font-bold text-[#0F172A]">₹34,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto bg-[#0F2942] text-white p-3.5 rounded-xl shadow-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[#EA580C] text-[20px] shrink-0">check_circle</span>
          <p className="text-[13px] font-medium leading-tight flex-1">{toastMessage}</p>
        </div>
      )}
    </div>
  );
};
