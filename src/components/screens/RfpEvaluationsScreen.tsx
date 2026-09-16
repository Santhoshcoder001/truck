import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface RfpEvaluationsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const RfpEvaluationsScreen: React.FC<RfpEvaluationsScreenProps> = ({ onNavigate }) => {
  const [awardedBidder, setAwardedBidder] = useState<string | null>(null);

  const bids = [
    {
      id: 'b1',
      name: 'Sri Balaji Logistics',
      tag: 'L1 Lowest Bid',
      rate: 37800,
      sla: '98.2%',
      fleet: '45 Trucks',
      transit: '7.5 hrs',
    },
    {
      id: 'b2',
      name: 'KPN Freight Lines',
      tag: 'Highest SLA (99.6%)',
      rate: 38200,
      sla: '99.6%',
      fleet: '120 Trucks',
      transit: '7.0 hrs',
    },
    {
      id: 'b3',
      name: 'Salem Roadways Co.',
      tag: 'Regional Fleet',
      rate: 39000,
      sla: '96.5%',
      fleet: '28 Trucks',
      transit: '8.0 hrs',
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">RFP Evaluations</h2>
        <p className="text-[14px] text-[#475569]">
          Chennai → Bengaluru • 180 MT/month • 3 Verified Bids
        </p>
      </div>

      {/* Awarded Banner if active */}
      {awardedBidder && (
        <div className="bg-[#DCFCE7] border border-[#16A34A] rounded-2xl p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#16A34A] text-[28px]">verified</span>
          <div>
            <p className="text-[14px] font-bold text-[#0F172A]">Contract Awarded to {awardedBidder}!</p>
            <p className="text-[12px] text-[#475569]">6-month digital SLA generated and sent for signature.</p>
          </div>
        </div>
      )}

      {/* Bids List */}
      <div className="space-y-3">
        {bids.map((bid) => {
          const isAwarded = awardedBidder === bid.name;
          return (
            <div
              key={bid.id}
              className={`bg-white rounded-2xl p-4 border transition-all space-y-3.5 shadow-sm ${
                isAwarded ? 'border-[#16A34A] ring-1 ring-[#16A34A]' : 'border-[#E2E8F0]'
              }`}
            >
              {/* Top info */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F2942] text-[11px] font-bold uppercase mb-1">
                    {bid.tag}
                  </span>
                  <h3 className="text-[16px] font-bold text-[#0F172A]">{bid.name}</h3>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#64748B] block">Bid per Trip</span>
                  <span className="text-[20px] font-bold text-[#EA580C]">
                    ₹{bid.rate.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Specs row */}
              <div className="grid grid-cols-3 divide-x divide-[#F1F5F9] bg-[#F8FAFC] p-2.5 rounded-xl text-center text-[12px]">
                <div>
                  <span className="text-[#64748B] block text-[11px]">SLA</span>
                  <span className="font-bold text-[#0F172A]">{bid.sla}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Fleet Size</span>
                  <span className="font-bold text-[#0F172A]">{bid.fleet}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Avg Transit</span>
                  <span className="font-bold text-[#0F172A]">{bid.transit}</span>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => setAwardedBidder(bid.name)}
                className={`w-full h-11 rounded-lg font-semibold text-[14px] transition-colors flex items-center justify-center gap-1.5 ${
                  isAwarded
                    ? 'bg-[#16A34A] text-white'
                    : 'bg-[#0F2942] hover:bg-[#001428] text-white'
                }`}
              >
                {isAwarded ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>Contract Awarded</span>
                  </>
                ) : (
                  <>
                    <span>Award 6-Month Contract</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
