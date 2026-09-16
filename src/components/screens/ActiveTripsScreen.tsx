import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface ActiveTripsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ActiveTripsScreen: React.FC<ActiveTripsScreenProps> = ({ onNavigate }) => {
  const [tripState, setTripState] = useState<'docked' | 'driving' | 'arrived'>('driving');
  const [showSosDialog, setShowSosDialog] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [speed, setSpeed] = useState(58);

  const handleSos = () => {
    setSosSent(true);
    setTimeout(() => {
      setSosSent(false);
      setShowSosDialog(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-28 space-y-4">
      {/* 1. Trip Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[12px] font-bold text-[#64748B]">TRIP #NL-TR-1042</span>
          <h2 className="text-[18px] font-bold text-[#0F172A]">Chennai → Bengaluru</h2>
        </div>

        {/* SOS Button */}
        <button
          type="button"
          onClick={() => setShowSosDialog(true)}
          className="h-10 px-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg text-[13px] font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">emergency</span>
          <span>SOS</span>
        </button>
      </div>

      {/* 2. Primary Road Navigation Canvas */}
      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-sm bg-[#0F2942] border border-[#E2E8F0]">
        <div
          className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZLaSBSUlhpKnAUBh5sZBV84o0tObrjRygvvMd_duy-8Lst2z3epCRXrpnOISlblD5Ei1vvk6nxI1EcH86UXcHCZFiZFC0j8uf1hUYXV_R3EuuL80-982fZkbMajm39jkn00p4GomANTh6kKIBtkG4DyC_r8ZtgF63_Wp8x2JxrMCMZVIgfihnViOYVPLMDOmHfMxOu-hztj7u33COqk2Tpqm57ZnYzxSQLrkmfGkGSLtWpJGUxepIrA')`,
          }}
        />

        {/* HUD Overlay */}
        <div className="absolute inset-0 p-3.5 flex flex-col justify-between text-white pointer-events-none">
          {/* Top telemetry tag */}
          <div className="flex items-center justify-between">
            <div className="bg-[#001428]/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[12px] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
              <span>NH-48 Expressway</span>
            </div>
            <div className="bg-[#001428]/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[12px] font-bold">
              {speed} km/h
            </div>
          </div>

          {/* Bottom Waypoint Indicator */}
          <div className="bg-[#001428]/90 backdrop-blur-xs p-3 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#94A3B8] uppercase font-semibold">Next Waypoint</p>
              <p className="text-[14px] font-bold text-white">Krishnagiri Toll Plaza • 24 km</p>
            </div>
            <span className="text-[13px] font-bold text-[#EA580C]">FASTag Ready</span>
          </div>
        </div>
      </div>

      {/* 3. In-Cab Trip Metrics Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="grid grid-cols-3 divide-x divide-[#F1F5F9] text-center">
          <div>
            <span className="text-[11px] text-[#64748B]">Remaining</span>
            <p className="text-[18px] font-bold text-[#0F172A] mt-0.5">82 km</p>
          </div>
          <div>
            <span className="text-[11px] text-[#64748B]">Target ETA</span>
            <p className="text-[18px] font-bold text-[#0F172A] mt-0.5">6:40 PM</p>
          </div>
          <div>
            <span className="text-[11px] text-[#64748B]">Payload</span>
            <p className="text-[18px] font-bold text-[#0F172A] mt-0.5">18 MT</p>
          </div>
        </div>

        <div className="border-t border-[#F1F5F9] pt-3 flex items-center justify-between text-[13px]">
          <div>
            <p className="text-[#64748B]">Consignee</p>
            <p className="font-bold text-[#0F172A]">Peenya Industrial Bay 4</p>
          </div>
          <a
            href="tel:+919840012345"
            className="h-9 px-3 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F2942] font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>Manager</span>
          </a>
        </div>
      </div>

      {/* 4. Action: State Progression */}
      <div className="space-y-2.5 pt-2">
        {tripState === 'driving' ? (
          <button
            type="button"
            onClick={() => setTripState('arrived')}
            className="w-full h-[52px] bg-[#0F2942] hover:bg-[#001428] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            <span>Arrived at Unloading Bay</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onNavigate('load-epod')}
            className="w-full h-[52px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
            <span>Start e-POD Verification</span>
          </button>
        )}
      </div>

      {/* SOS Emergency Modal */}
      {showSosDialog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">emergency</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-[18px] font-bold text-[#0F172A]">Highway Emergency SOS</h3>
              <p className="text-[13px] text-[#475569]">
                Broadcast immediate breakdown or highway assistance alert to Highway Patrol and NHAI Control Room.
              </p>
            </div>

            {sosSent ? (
              <div className="p-3 bg-[#DCFCE7] text-[#16A34A] rounded-xl text-[13px] font-bold">
                ✓ SOS Alert Dispatched! Nearest Patrol Dispatched.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSosDialog(false)}
                  className="h-11 rounded-lg border border-[#CBD5E1] text-[#475569] font-semibold text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSos}
                  className="h-11 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-[14px] shadow-sm"
                >
                  Trigger Alert
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
