import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface PostLoadScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const PostLoadScreen: React.FC<PostLoadScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [pickup, setPickup] = useState('Chennai (Ambattur IE)');
  const [drop, setDrop] = useState('Bengaluru (Peenya Phase 2)');
  const [cargoType, setCargoType] = useState('Industrial Equipment');
  const [weight, setWeight] = useState<number>(18);
  const [vehicle, setVehicle] = useState('32 FT Multi-Axle');
  const [pickupDate, setPickupDate] = useState('Today');
  const [pickupWindow, setPickupWindow] = useState('4:00 PM');
  const [offeredRate, setOfferedRate] = useState<number>(42000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  const cargoOptions = [
    'Industrial Equipment',
    'Steel & TMT',
    'Automotive Parts',
    'Cement',
    'Electronics',
    'FMCG Goods',
  ];

  const weightChips = [5, 10, 15, 18, 25];

  const vehicleOptions = [
    { name: '19 FT Open', cap: '7 MT', tag: 'Light Commercial' },
    { name: '24 FT Container', cap: '14 MT', tag: 'Medium Freight' },
    { name: '32 FT Multi-Axle', cap: '21 MT', tag: 'Recommended' },
    { name: '40 FT Trailer', cap: '35 MT', tag: 'Heavy Haul' },
  ];

  const handlePostLoad = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsPosted(true);
    }, 1200);
  };

  if (isPosted) {
    return (
      <div className="flex flex-col w-full px-4 pt-10 pb-28 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[32px]">check_circle</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Load Broadcast Live!</h2>
            <p className="text-[14px] text-[#475569]">
              Sent to 4,200+ verified fleet pilots on NH-48 corridor.
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-4 text-left border border-[#E2E8F0] space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Route</span>
              <span className="font-semibold text-[#0F172A]">{pickup.split(' ')[0]} → {drop.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Cargo & Weight</span>
              <span className="font-semibold text-[#0F172A]">{cargoType} • {weight} MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Vehicle</span>
              <span className="font-semibold text-[#0F172A]">{vehicle}</span>
            </div>
            <div className="flex justify-between border-t border-[#E2E8F0] pt-2">
              <span className="text-[#64748B]">Offered Rate</span>
              <span className="font-bold text-[#EA580C] text-[15px]">₹{offeredRate.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('fleet-track')}
              className="w-full h-[50px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">near_me</span>
              <span>Track Live on Map</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('shipper-home')}
              className="w-full h-[46px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F2942] rounded-lg font-semibold text-[14px] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-28 space-y-5">
      {/* Step Header Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (step > 1) setStep((prev) => (prev - 1) as any);
              else onNavigate('shipper-home');
            }}
            className="text-[13px] font-semibold text-[#64748B] flex items-center gap-1 hover:text-[#0F172A]"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>{step === 1 ? 'Cancel' : 'Back'}</span>
          </button>
          <span className="text-[12px] font-bold text-[#EA580C] uppercase tracking-wider">
            Step {step} of 5
          </span>
        </div>

        {/* 5-segment Progress Bar */}
        <div className="flex gap-1.5 h-1.5 w-full">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 rounded-full transition-all duration-300 ${
                step >= s ? 'bg-[#EA580C]' : 'bg-[#E2E8F0]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: ROUTE */}
      {step === 1 && (
        <section className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Where is the load going?</h2>
            <p className="text-[14px] text-[#475569]">Enter pickup and destination terminals</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[12px] font-semibold text-[#475569] block mb-1">
                Pickup Location
              </label>
              <div className="flex items-center gap-2 h-12 px-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] focus-within:border-[#EA580C] focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[#16A34A] text-[20px]">trip_origin</span>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#0F172A] font-medium focus:outline-none"
                  placeholder="City or Industrial Area"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#475569] block mb-1">
                Drop Point
              </label>
              <div className="flex items-center gap-2 h-12 px-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] focus-within:border-[#EA580C] focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[#EA580C] text-[20px]">location_on</span>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#0F172A] font-medium focus:outline-none"
                  placeholder="Destination Hub"
                />
              </div>
            </div>
          </div>

          {/* Corridor Info */}
          <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0] flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F2942] text-[20px]">alt_route</span>
              <span className="font-semibold text-[#0F172A]">NH-48 Corridor</span>
            </div>
            <span className="text-[#475569]">318 km • ~6h 20m</span>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full h-[50px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </section>
      )}

      {/* STEP 2: CARGO */}
      {step === 2 && (
        <section className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">What are you moving?</h2>
            <p className="text-[14px] text-[#475569]">Specify cargo commodity and tonnage</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[12px] font-semibold text-[#475569] block mb-1">
                Cargo Commodity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cargoOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setCargoType(opt)}
                    className={`p-2.5 rounded-lg border text-left text-[13px] font-medium transition-all ${
                      cargoType === opt
                        ? 'border-[#EA580C] bg-[#FFF7ED] text-[#EA580C] font-semibold'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:bg-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#475569] block mb-1">
                Gross Weight (Metric Tons)
              </label>
              <div className="flex gap-2">
                {weightChips.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => {
                      setWeight(w);
                      if (w > 20) setVehicle('40 FT Trailer');
                      else if (w > 14) setVehicle('32 FT Multi-Axle');
                      else if (w > 8) setVehicle('24 FT Container');
                      else setVehicle('19 FT Open');
                    }}
                    className={`flex-1 h-11 rounded-lg border text-[13px] font-bold transition-all ${
                      weight === w
                        ? 'border-[#EA580C] bg-[#EA580C] text-white shadow-xs'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:bg-white'
                    }`}
                  >
                    {w} MT
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full h-[50px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </section>
      )}

      {/* STEP 3: VEHICLE */}
      {step === 3 && (
        <section className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">What truck do you need?</h2>
            <p className="text-[14px] text-[#475569]">
              Suggested vehicle matched for {weight} MT {cargoType}
            </p>
          </div>

          <div className="space-y-2.5">
            {vehicleOptions.map((v) => {
              const isSelected = vehicle === v.name;
              return (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setVehicle(v.name)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-[#EA580C] bg-[#FFF7ED] ring-1 ring-[#EA580C]'
                      : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-[#0F172A]">{v.name}</span>
                      {v.tag === 'Recommended' && (
                        <span className="px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold">
                          Best Fit
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#64748B]">Payload Capacity up to {v.cap}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#EA580C] bg-[#EA580C] text-white' : 'border-[#CBD5E1]'
                    }`}
                  >
                    {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setStep(4)}
            className="w-full h-[50px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </section>
      )}

      {/* STEP 4: DATE & PRICE */}
      {step === 4 && (
        <section className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Pickup & Freight Rate</h2>
            <p className="text-[14px] text-[#475569]">Set dispatch schedule and offered payout</p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[12px] font-semibold text-[#475569] block mb-1">
                  Pickup Date
                </label>
                <div className="flex gap-1.5">
                  {['Today', 'Tomorrow'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPickupDate(d)}
                      className={`flex-1 h-11 rounded-lg border text-[13px] font-semibold transition-all ${
                        pickupDate === d
                          ? 'border-[#EA580C] bg-[#FFF7ED] text-[#EA580C]'
                          : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#475569] block mb-1">
                  Window
                </label>
                <select
                  value={pickupWindow}
                  onChange={(e) => setPickupWindow(e.target.value)}
                  className="w-full h-11 px-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-[13px] font-medium text-[#0F172A] focus:outline-none"
                >
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="Night (10 PM)">Night (10 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[12px] font-semibold text-[#475569]">
                  Offered Freight Rate
                </label>
                <span className="text-[11px] text-[#16A34A] font-semibold">
                  Market Avg: ₹40,000 - ₹44,000
                </span>
              </div>
              <div className="flex items-center gap-2 h-12 px-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] focus-within:border-[#EA580C] focus-within:bg-white transition-all">
                <span className="text-[16px] font-bold text-[#0F172A]">₹</span>
                <input
                  type="number"
                  step="500"
                  value={offeredRate}
                  onChange={(e) => setOfferedRate(Number(e.target.value))}
                  className="w-full bg-transparent text-[16px] text-[#0F172A] font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(5)}
            className="w-full h-[50px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <span>Review Load</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </section>
      )}

      {/* STEP 5: REVIEW */}
      {step === 5 && (
        <section className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Review your load</h2>
            <p className="text-[14px] text-[#475569]">Confirm details before broadcasting</p>
          </div>

          <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-[13px]">
            <div className="flex justify-between items-center pt-1">
              <span className="text-[#64748B]">Route</span>
              <span className="font-semibold text-[#0F172A] text-right">
                {pickup} → {drop}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#64748B]">Cargo Commodity</span>
              <span className="font-semibold text-[#0F172A]">{cargoType}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#64748B]">Gross Weight</span>
              <span className="font-semibold text-[#0F172A]">{weight} Metric Tons</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#64748B]">Required Truck</span>
              <span className="font-semibold text-[#0F172A]">{vehicle}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#64748B]">Pickup Window</span>
              <span className="font-semibold text-[#0F172A]">
                {pickupDate} • {pickupWindow}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 text-[15px]">
              <span className="font-semibold text-[#0F172A]">Offered Payout</span>
              <span className="font-bold text-[#EA580C] text-[18px]">
                ₹{offeredRate.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handlePostLoad}
            className="w-full h-[52px] bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.99] disabled:opacity-75 text-white rounded-lg font-semibold text-[15px] flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>Broadcasting to Fleets...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Post Load</span>
              </>
            )}
          </button>
        </section>
      )}
    </div>
  );
};
