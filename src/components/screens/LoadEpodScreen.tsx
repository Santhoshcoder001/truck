import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface LoadEpodScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LoadEpodScreen: React.FC<LoadEpodScreenProps> = ({ onNavigate }) => {
  const [hasPhoto, setHasPhoto] = useState(true);
  const [hasSigned, setHasSigned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteDelivery = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 1200);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col w-full px-4 pt-10 pb-28 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[36px]">verified</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Delivery Completed!</h2>
            <p className="text-[14px] text-[#475569]">
              Signed challan verified. Consignment marked as delivered.
            </p>
          </div>

          {/* Instant Settlement Badge */}
          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] space-y-1 text-center">
            <span className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
              Instant Payout Settled
            </span>
            <p className="text-[24px] font-bold text-[#16A34A]">₹42,000</p>
            <p className="text-[12px] text-[#475569]">Credited to Pilot Murugan S via IMPS/UPI</p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('driver-home')}
              className="w-full h-[50px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-semibold text-[15px] transition-colors"
            >
              Return to Cockpit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">Complete Delivery</h2>
        <p className="text-[14px] text-[#475569]">
          Bengaluru (Peenya Hub) • 18 MT Equipment
        </p>
      </div>

      {/* Step 1: Take Photo */}
      <section className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#0F172A]">1. Delivery Challan Photo</span>
          <span className="text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
            {hasPhoto ? 'Photo Uploaded' : 'Required'}
          </span>
        </div>

        {/* Large Camera / Document Preview Area */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#F1F5F9] border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center">
          {hasPhoto ? (
            <div className="relative w-full h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdc42VTtCMygYU1RKElyUI1IfnksP91Io-eBhs3eqTfqVBxyOgim8n4Y1nEROjt_g1rmEr_7EOABM4gsy7xZv4_dft4UrwIfESb_brBvQ0Uwx0Z9LaT_Art-qh81yGS8oyFDtjAXv062p0tVCbBxOqPaYIwEVxbzF0SQ1iEEvv3H0SWs8STAnbzoHCIIo9d42FAXg9yNnU9lTzES0-SRQ0y6KZu_7IofSnrY3_w24OgwaF3LGrHDflZQ"
                alt="Delivery Slip"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setHasPhoto(false)}
                className="absolute top-2 right-2 px-2.5 py-1 bg-black/70 text-white rounded-md text-[11px] font-medium"
              >
                Retake
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setHasPhoto(true)}
              className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#0F172A]"
            >
              <span className="material-symbols-outlined text-[32px] text-[#EA580C]">add_a_photo</span>
              <span className="text-[13px] font-medium">Tap to snap physical challan</span>
            </button>
          )}
        </div>
      </section>

      {/* Step 2: Capture Acknowledgement / Signature */}
      <section className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#0F172A]">2. Receiver Acknowledgement</span>
          {hasSigned && (
            <button
              type="button"
              onClick={() => setHasSigned(false)}
              className="text-[12px] font-semibold text-[#EA580C]"
            >
              Clear
            </button>
          )}
        </div>

        <div
          onClick={() => setHasSigned(true)}
          className={`w-full h-28 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-colors ${
            hasSigned
              ? 'border-[#16A34A] bg-[#F0FDF4]'
              : 'border-dashed border-[#CBD5E1] bg-[#F8FAFC] hover:bg-white'
          }`}
        >
          {hasSigned ? (
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[24px] text-[#16A34A]">draw</span>
              <span className="text-[13px] font-bold text-[#16A34A] mt-1">
                K. Raman (Warehouse Supervisor) Signed
              </span>
              <span className="text-[11px] text-[#64748B]">Recorded at 6:42 PM</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-[#64748B]">
              <span className="material-symbols-outlined text-[24px]">edit</span>
              <span className="text-[13px] font-medium mt-1">Tap to sign electronically</span>
            </div>
          )}
        </div>
      </section>

      {/* Step 3: Confirm & Complete Delivery (Primary Orange) */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!hasPhoto || !hasSigned || isSubmitting}
          onClick={handleCompleteDelivery}
          className="w-full h-[52px] bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">
                progress_activity
              </span>
              <span>Releasing Settlement...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Complete Delivery</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
