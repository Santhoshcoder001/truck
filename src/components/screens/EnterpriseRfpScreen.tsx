import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface EnterpriseRfpScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const EnterpriseRfpScreen: React.FC<EnterpriseRfpScreenProps> = ({ onNavigate }) => {
  const [duration, setDuration] = useState<'3' | '6' | '12'>('6');
  const [volume, setVolume] = useState<number>(180);
  const [targetRate, setTargetRate] = useState<number>(41000);
  const [isPublishing, setIsPublishing] = useState(false);

  const tripsPerMonth = Math.round(volume / 18);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onNavigate('rfp-evaluations');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">Create Enterprise RFP</h2>
        <p className="text-[14px] text-[#475569]">
          Lock 6-month dedicated capacity with vetted South India fleet operators.
        </p>
      </div>

      {/* Corridor Specification */}
      <section className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
          Corridor & Volume
        </h3>

        <div className="space-y-3">
          {/* Route Display */}
          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#EA580C] text-[20px]">alt_route</span>
              <div>
                <p className="text-[14px] font-bold text-[#0F172A]">Chennai → Bengaluru</p>
                <p className="text-[12px] text-[#64748B]">NH-48 Golden Quadrilateral • 318 km</p>
              </div>
            </div>
          </div>

          {/* Monthly Volume Chips */}
          <div>
            <label className="text-[12px] font-semibold text-[#475569] block mb-1.5">
              Monthly Commitment Volume
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[90, 180, 360].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVolume(v)}
                  className={`py-2.5 px-3 rounded-lg border text-center transition-all ${
                    volume === v
                      ? 'border-[#EA580C] bg-[#FFF7ED] text-[#EA580C] font-bold'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]'
                  }`}
                >
                  <span className="text-[14px] block font-bold">{v} MT</span>
                  <span className="text-[10px] text-[#64748B] block mt-0.5">
                    ~{Math.round(v / 18)} trips/mo
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Chips */}
          <div>
            <label className="text-[12px] font-semibold text-[#475569] block mb-1.5">
              Contract Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['3', '6', '12'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`py-2 px-3 rounded-lg border text-center text-[13px] font-semibold transition-all ${
                    duration === d
                      ? 'border-[#EA580C] bg-[#EA580C] text-white shadow-xs'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]'
                  }`}
                >
                  {d} Months
                </button>
              ))}
            </div>
          </div>

          {/* Target Rate */}
          <div>
            <label className="text-[12px] font-semibold text-[#475569] block mb-1">
              Target Rate per Trip
            </label>
            <div className="flex items-center gap-2 h-12 px-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] focus-within:border-[#EA580C] focus-within:bg-white transition-all">
              <span className="text-[16px] font-bold text-[#0F172A]">₹</span>
              <input
                type="number"
                step="500"
                value={targetRate}
                onChange={(e) => setTargetRate(Number(e.target.value))}
                className="w-full bg-transparent text-[16px] font-bold text-[#0F172A] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Summary Box */}
      <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0] space-y-1.5 text-[13px]">
        <div className="flex justify-between">
          <span className="text-[#64748B]">Estimated Trips</span>
          <span className="font-semibold text-[#0F172A]">{tripsPerMonth * Number(duration)} total trips</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#64748B]">Required Fleet Capacity</span>
          <span className="font-semibold text-[#0F172A]">32 FT Multi-Axle Trucks</span>
        </div>
        <div className="flex justify-between border-t border-[#E2E8F0] pt-1.5">
          <span className="text-[#64748B]">Monthly Budget</span>
          <span className="font-bold text-[#0F172A]">
            ₹{(tripsPerMonth * targetRate).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        disabled={isPublishing}
        onClick={handlePublish}
        className="w-full h-[52px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
      >
        {isPublishing ? (
          <>
            <span className="material-symbols-outlined animate-spin text-[20px]">
              progress_activity
            </span>
            <span>Publishing Tender to Fleet Operators...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">campaign</span>
            <span>Publish Enterprise RFP</span>
          </>
        )}
      </button>
    </div>
  );
};
