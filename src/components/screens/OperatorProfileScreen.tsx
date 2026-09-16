import React, { useState } from 'react';
import { ScreenId, AppRole } from '../../types';

interface OperatorProfileScreenProps {
  currentRole: AppRole;
  onSelectRole: (role: AppRole) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const OperatorProfileScreen: React.FC<OperatorProfileScreenProps> = ({
  currentRole,
  onSelectRole,
  onNavigate,
}) => {
  const [fastagBalance, setFastagBalance] = useState(8420);
  const [isRecharging, setIsRecharging] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleRecharge = () => {
    setIsRecharging(true);
    setTimeout(() => {
      setFastagBalance((prev) => prev + 1000);
      setIsRecharging(false);
      setToastMsg('FASTag wallet topped up by ₹1,000 via UPI.');
      setTimeout(() => setToastMsg(null), 3000);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 space-y-5">
      {/* 1. Profile Identity Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-14 h-14 rounded-full bg-[#0F2942] text-white flex items-center justify-center font-bold text-[18px] shrink-0">
            {currentRole === 'driver' ? 'MS' : currentRole === 'ops' ? 'OP' : 'AT'}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[17px] font-bold text-[#0F172A] truncate">
                {currentRole === 'driver'
                  ? 'Murugan S.'
                  : currentRole === 'ops'
                  ? 'Ops Control'
                  : 'Ashok Traders'}
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold uppercase">
                Verified
              </span>
            </div>
            <p className="text-[12px] text-[#64748B]">
              {currentRole === 'driver'
                ? 'TN-04-NL-482 • 32 FT Taurus'
                : currentRole === 'ops'
                ? 'Highway Traffic Controller'
                : 'Enterprise Shipper Account'}
            </p>
            <p className="text-[12px] font-semibold text-[#EA580C] mt-0.5">
              ★ 4.9 • 142 Corridor Trips
            </p>
          </div>
        </div>
      </div>

      {/* 2. Switch Role Persona */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-2.5">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
          Switch Operating Persona
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {(['shipper', 'driver', 'ops'] as AppRole[]).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                onSelectRole(role);
                if (role === 'shipper') onNavigate('shipper-home');
                else if (role === 'driver') onNavigate('driver-home');
                else onNavigate('exception-engine');
              }}
              className={`py-2 px-3 rounded-lg text-[13px] font-semibold capitalize transition-all ${
                currentRole === role
                  ? 'bg-[#0F2942] text-white shadow-xs'
                  : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:bg-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* 3. FASTag Toll Wallet */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#EA580C] text-[22px]">toll</span>
            <div>
              <h3 className="text-[15px] font-bold text-[#0F172A]">NHAI FASTag Balance</h3>
              <p className="text-[12px] text-[#64748B]">Linked to TN-04-NL-482</p>
            </div>
          </div>
          <span className="text-[20px] font-bold text-[#0F172A]">
            ₹{fastagBalance.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          disabled={isRecharging}
          onClick={handleRecharge}
          className="w-full h-11 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F2942] rounded-lg font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>{isRecharging ? 'Processing UPI Top-up...' : 'Quick Top-Up ₹1,000'}</span>
        </button>
      </div>

      {/* 4. Compliance Documents & Permits */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
          Permits & Verification
        </h3>

        <div className="space-y-2 text-[13px]">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#16A34A] text-[18px]">verified</span>
              <span className="font-semibold text-[#0F172A]">All India Tourist/Goods Permit</span>
            </div>
            <span className="text-[12px] text-[#16A34A] font-bold">Active</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#16A34A] text-[18px]">verified</span>
              <span className="font-semibold text-[#0F172A]">Commercial Vehicle Fitness</span>
            </div>
            <span className="text-[12px] text-[#16A34A] font-bold">Valid 2027</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#16A34A] text-[18px]">verified</span>
              <span className="font-semibold text-[#0F172A]">Comprehensive Insurance</span>
            </div>
            <span className="text-[12px] text-[#16A34A] font-bold">Verified</span>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto bg-[#0F2942] text-white p-3.5 rounded-xl shadow-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-[#EA580C] text-[20px] shrink-0">check_circle</span>
          <p className="text-[13px] font-medium leading-tight flex-1">{toastMsg}</p>
        </div>
      )}
    </div>
  );
};
