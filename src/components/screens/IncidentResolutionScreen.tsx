import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface IncidentResolutionScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const IncidentResolutionScreen: React.FC<IncidentResolutionScreenProps> = ({ onNavigate }) => {
  const [selectedPlan, setSelectedPlan] = useState<'transship' | 'repair'>('transship');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsExecuted(true);
    }, 1300);
  };

  if (isExecuted) {
    return (
      <div className="flex flex-col w-full px-4 pt-10 pb-28 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[36px]">local_shipping</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Rescue Truck Dispatched!</h2>
            <p className="text-[14px] text-[#475569]">
              Standby 32 FT Taurus (TN-24-K-8812) en route from Ambur Hub (14 km away).
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-4 text-left border border-[#E2E8F0] space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Relief Pilot</span>
              <span className="font-bold text-[#0F172A]">K. Venkatesh (+91 98410 44921)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">ETA to Incident Site</span>
              <span className="font-bold text-[#16A34A]">18 Minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Consignee Notification</span>
              <span className="font-semibold text-[#0F172A]">SLA Delay revised to +35m</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('exception-engine')}
              className="w-full h-[50px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-bold text-[15px] transition-colors"
            >
              Back to Exception Radar
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
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FEE2E2] text-[#DC2626] text-[11px] font-bold">
            P1 HIGH
          </span>
          <span className="text-[12px] font-mono text-[#64748B]">#EX-9021</span>
        </div>
        <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">Resolve Incident</h2>
        <p className="text-[14px] text-[#475569]">
          Mechanical Breakdown • Vaniyambadi Bypass (NH-48)
        </p>
      </div>

      {/* Incident Summary Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
          Stranded Consignment Details
        </h3>

        <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] space-y-1.5 text-[13px]">
          <div className="flex justify-between">
            <span className="text-[#64748B]">Truck</span>
            <span className="font-bold text-[#0F172A]">TN-04-NL-482 (32 FT)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#64748B]">Pilot</span>
            <span className="font-semibold text-[#0F172A]">Murugan S.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#64748B]">Cargo</span>
            <span className="font-semibold text-[#0F172A]">18 MT Industrial Equipment</span>
          </div>
          <div className="flex justify-between border-t border-[#E2E8F0] pt-1.5">
            <span className="text-[#64748B]">SLA Impact</span>
            <span className="font-bold text-[#DC2626]">+2h 15m delay risk</span>
          </div>
        </div>
      </div>

      {/* Protocol Options */}
      <div className="space-y-3">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
          Select Resolution Protocol
        </h3>

        {/* Option A: Transshipment (Recommended) */}
        <div
          onClick={() => setSelectedPlan('transship')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
            selectedPlan === 'transship'
              ? 'border-[#EA580C] bg-[#FFF7ED] ring-1 ring-[#EA580C]'
              : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-[#0F172A]">
                  Option A: Standby Transshipment
                </span>
                <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold">
                  Recommended
                </span>
              </div>
              <p className="text-[13px] text-[#475569]">
                Dispatch empty 32 FT Taurus from Ambur Depot (14 km away).
              </p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                selectedPlan === 'transship'
                  ? 'border-[#EA580C] bg-[#EA580C] text-white'
                  : 'border-[#CBD5E1]'
              }`}
            >
              {selectedPlan === 'transship' && (
                <span className="material-symbols-outlined text-[14px]">check</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[12px] font-semibold text-[#16A34A] pt-1 border-t border-[#FDBA74]/30">
            <span>Transfer Time: ~45 mins</span>
            <span>•</span>
            <span>SLA Preserved (98.4%)</span>
          </div>
        </div>

        {/* Option B: On-Site Repair */}
        <div
          onClick={() => setSelectedPlan('repair')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
            selectedPlan === 'repair'
              ? 'border-[#EA580C] bg-[#FFF7ED] ring-1 ring-[#EA580C]'
              : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-[15px] font-bold text-[#0F172A]">
                Option B: Roadside Mobile Workshop
              </span>
              <p className="text-[13px] text-[#475569]">
                Dispatch mobile mechanic van for on-shoulder axle welding.
              </p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                selectedPlan === 'repair'
                  ? 'border-[#EA580C] bg-[#EA580C] text-white'
                  : 'border-[#CBD5E1]'
              }`}
            >
              {selectedPlan === 'repair' && (
                <span className="material-symbols-outlined text-[14px]">check</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[12px] font-semibold text-[#DC2626] pt-1 border-t border-[#E2E8F0]">
            <span>Repair Time: ~3h 20m</span>
            <span>•</span>
            <span>SLA Breach Risk</span>
          </div>
        </div>
      </div>

      {/* Primary Execution CTA */}
      <div className="pt-2">
        <button
          type="button"
          disabled={isExecuting}
          onClick={handleExecute}
          className="w-full h-[52px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
        >
          {isExecuting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">
                progress_activity
              </span>
              <span>Dispatching Standby Vehicle...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>
                {selectedPlan === 'transship'
                  ? 'Execute Transshipment Protocol'
                  : 'Dispatch Roadside Mechanic'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
