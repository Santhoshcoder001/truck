import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface FleetLiveTrackScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const FleetLiveTrackScreen: React.FC<FleetLiveTrackScreenProps> = ({ onNavigate }) => {
  // Simulate progress step: 0 (Ambattur), 1 (Kanchipuram), 2 (Krishnagiri/Hosur), 3 (Arrived Bengaluru)
  const [progressIndex, setProgressIndex] = useState<number>(2);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stages = [
    { name: 'Ambattur, Chennai', eta: 'Dispatched', kmLeft: '318 km', status: 'Departed', percent: 5, truckX: 300, truckY: 260 },
    { name: 'Vellore Bypass', eta: '8:15 PM', kmLeft: '185 km', status: 'In Transit', percent: 45, truckX: 210, truckY: 190 },
    { name: 'Near Hosur (NH-48)', eta: '6:40 PM', kmLeft: '82 km', status: 'In Transit', percent: 74, truckX: 130, truckY: 120 },
    { name: 'Peenya Hub, Bengaluru', eta: 'Arrived', kmLeft: '0 km', status: 'Delivered', percent: 100, truckX: 70, truckY: 60 },
  ];

  const currentStage = stages[progressIndex];

  const handleSimulate = () => {
    const next = (progressIndex + 1) % stages.length;
    setProgressIndex(next);
    setToastMessage(`Telemetry updated: Truck now at ${stages[next].name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-56px)] pb-18 overflow-hidden bg-[#F8FAFC]">
      {/* 1. Map Section (Occupies ~55% of height) */}
      <div className="relative w-full h-[55%] bg-[#0F2942] overflow-hidden select-none">
        {/* Map Background Satellite/Road */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-45 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA59bsD2_hkMv1Vtnjm8o8gP5a_m-Oi6XnvyfA--CnvL3-_d-30MDi_Z-UprTYkQ4FalfyUKOYxpTF9Yk8IB6XALqyaksLgJLb8byzGQvC14UJXrmmeQXj1847iVw5dVApZYbEys60U48Z3ZCVUnJo7Q5EZLZRnoRoNcu9594uUHRkOgK-N7Hzy9D1VC-Khcd7fzXIQS0PRXHvdU7D4sekDtUZvqBeLNNnVncIPOj3YULl94-gZHB-6fA')`,
          }}
        />

        {/* Highway Vector Line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
          viewBox="0 0 360 320"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Route path */}
          <path
            d="M 300 260 C 240 210 180 160 70 60"
            stroke="#EA580C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="6 4"
            opacity="0.9"
          />

          {/* Origin & Destination Nodes */}
          <circle cx="300" cy="260" r="6" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="70" cy="60" r="6" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />

          {/* Animated Vehicle Node on Route */}
          <circle
            cx={currentStage.truckX}
            cy={currentStage.truckY}
            r="10"
            fill="#EA580C"
            className="animate-pulse"
          />
          <circle
            cx={currentStage.truckX}
            cy={currentStage.truckY}
            r="5"
            fill="#FFFFFF"
          />
        </svg>

        {/* Minimal Corridor Badge & Simulation Control */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="bg-[#001428]/85 backdrop-blur-xs text-white px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span>NH-48 Live GPS Active</span>
          </div>

          <button
            type="button"
            onClick={handleSimulate}
            className="h-8 px-3 rounded-full bg-white text-[#0F2942] text-[12px] font-bold shadow-md hover:bg-[#F1F5F9] active:scale-95 flex items-center gap-1 transition-all"
            title="Advance simulated vehicle telemetry"
          >
            <span className="material-symbols-outlined text-[16px] text-[#EA580C]">refresh</span>
            <span>Simulate Progress</span>
          </button>
        </div>

        {/* Current Highway Location Tag */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs rounded-lg px-3 py-1.5 shadow-md border border-[#E2E8F0]">
          <p className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Current Position</p>
          <p className="text-[13px] font-bold text-[#0F172A]">{currentStage.name}</p>
        </div>
      </div>

      {/* 2. Bottom Operational Panel (Occupies ~45% of height, clean and uncluttered) */}
      <div className="flex-1 bg-white border-t border-[#E2E8F0] p-4 flex flex-col justify-between overflow-y-auto">
        {/* ETA & Distance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Estimated Arrival
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] font-bold text-[#0F172A] leading-none">
                  {currentStage.eta}
                </span>
                <span className="text-[13px] font-semibold text-[#16A34A]">
                  {currentStage.kmLeft} left
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[12px] font-bold">
              ● {currentStage.status}
            </span>
          </div>

          {/* Compact Timeline Stepper */}
          <div className="bg-[#F8FAFC] rounded-xl p-2.5 border border-[#E2E8F0]">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B] mb-1.5">
              <span className={progressIndex >= 0 ? 'text-[#16A34A] font-bold' : ''}>Loaded</span>
              <span className={progressIndex >= 1 ? 'text-[#16A34A] font-bold' : ''}>Departed</span>
              <span className={progressIndex >= 2 ? 'text-[#EA580C] font-bold' : ''}>In Transit</span>
              <span className={progressIndex >= 3 ? 'text-[#16A34A] font-bold' : ''}>Delivered</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#EA580C] h-full rounded-full transition-all duration-500"
                style={{ width: `${currentStage.percent}%` }}
              />
            </div>
          </div>

          {/* Driver & Truck Info */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0F2942] text-white flex items-center justify-center font-bold text-[14px]">
                AK
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0F172A]">Arun Kumar</p>
                <p className="text-[12px] text-[#64748B]">TN 38 XX 1234 • 32 FT</p>
              </div>
            </div>

            <span className="px-2 py-1 rounded-md bg-[#FFF7ED] text-[#EA580C] text-[12px] font-bold">
              ★ 4.9 Verified
            </span>
          </div>
        </div>

        {/* Single Action Row: [ Call ] [ Message ] [ Share Trip ] */}
        <div className="grid grid-cols-3 gap-2 pt-3">
          <a
            href="tel:+919840012345"
            className="h-11 rounded-lg bg-[#0F2942] hover:bg-[#001428] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setToastMessage('Message sent to Driver: "Please update gate arrival time."');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            className="h-11 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F2942] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Message</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="h-11 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F2942] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedLink ? 'check' : 'share'}
            </span>
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed top-18 left-4 right-4 z-50 max-w-md mx-auto bg-[#0F2942] text-white p-3 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#EA580C] text-[18px] shrink-0">info</span>
          <p className="text-[12px] font-medium leading-tight flex-1">{toastMessage}</p>
        </div>
      )}
    </div>
  );
};
