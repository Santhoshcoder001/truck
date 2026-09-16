import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface ExceptionEngineScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ExceptionEngineScreen: React.FC<ExceptionEngineScreenProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'deviation' | 'toll'>('all');
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const exceptions = [
    {
      id: 'ex-1',
      category: 'critical',
      tag: 'Critical Breakdown',
      tagColor: 'bg-[#FEE2E2] text-[#DC2626]',
      truck: 'TN-04-NL-482 (32 FT Multi-Axle)',
      pilot: 'Murugan S.',
      location: 'Vaniyambadi Bypass (NH-48, KM 182)',
      problem: 'Axle bearing failure detected via IoT sensor. Truck stationary for 42 minutes.',
      impact: 'ETA delayed by +2h 15m. Requires urgent transshipment.',
      actionLabel: 'Resolve Incident',
      actionRoute: 'incident-resolution' as ScreenId,
    },
    {
      id: 'ex-2',
      category: 'deviation',
      tag: 'Route Deviation',
      tagColor: 'bg-[#FEF3C7] text-[#D97706]',
      truck: 'KA-01-MJ-8819 (24 FT Container)',
      pilot: 'Senthil K.',
      location: 'Ranipet Industrial Bypass',
      problem: 'Driver took non-SLA district road to bypass toll congestion.',
      impact: 'Higher road roughness. Geo-fence alert triggered.',
      actionLabel: 'Send Route Correction',
      actionRoute: null,
    },
    {
      id: 'ex-3',
      category: 'toll',
      tag: 'FASTag Blacklist',
      tagColor: 'bg-[#F1F5F9] text-[#0F2942]',
      truck: 'TN-28-AB-4012 (Taurus 16T)',
      pilot: 'Dhanapal R.',
      location: 'Pallikonda Toll Plaza',
      problem: 'Insufficient FASTag balance (₹180 remaining, ₹340 toll required).',
      impact: 'Vehicle held at lane 4.',
      actionLabel: 'Auto Top-up FASTag (₹500)',
      actionRoute: null,
    },
  ];

  const filtered = exceptions.filter(
    (e) => activeFilter === 'all' || e.category === activeFilter
  );

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse"></span>
            <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">Exception Radar</h2>
          </div>
          <p className="text-[13px] text-[#475569]">Highway Control Room • NH-48 South Corridor</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[12px] font-bold">
          3 Alerts
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All (3)' },
          { id: 'critical', label: 'Breakdown (1)' },
          { id: 'deviation', label: 'Deviation (1)' },
          { id: 'toll', label: 'Toll (1)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-colors ${
              activeFilter === tab.id
                ? 'bg-[#0F2942] text-white shadow-xs'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exception Cards */}
      <div className="space-y-3.5">
        {filtered.map((item) => {
          const isResolved = resolvedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 border transition-all space-y-3 shadow-sm ${
                isResolved ? 'border-[#16A34A] opacity-75' : 'border-[#E2E8F0]'
              }`}
            >
              {/* Header with tag */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase mb-1 ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <h3 className="text-[15px] font-bold text-[#0F172A]">{item.truck}</h3>
                  <p className="text-[12px] text-[#64748B]">Pilot: {item.pilot}</p>
                </div>
                <span className="text-[11px] text-[#64748B] font-mono">42m ago</span>
              </div>

              {/* Location & Problem */}
              <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] space-y-1 text-[13px]">
                <div className="flex items-center gap-1 text-[#0F172A] font-semibold text-[12px]">
                  <span className="material-symbols-outlined text-[16px] text-[#EA580C]">location_on</span>
                  <span>{item.location}</span>
                </div>
                <p className="text-[#475569] text-[12px]">{item.problem}</p>
                <p className="text-[#DC2626] text-[11px] font-semibold">{item.impact}</p>
              </div>

              {/* Action Button */}
              {item.actionRoute ? (
                <button
                  type="button"
                  onClick={() => onNavigate(item.actionRoute)}
                  className="w-full h-11 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg font-bold text-[14px] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>{item.actionLabel}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (isResolved) setResolvedIds(resolvedIds.filter((id) => id !== item.id));
                    else setResolvedIds([...resolvedIds, item.id]);
                  }}
                  className={`w-full h-11 rounded-lg font-semibold text-[14px] transition-colors flex items-center justify-center gap-1.5 ${
                    isResolved
                      ? 'bg-[#DCFCE7] text-[#16A34A]'
                      : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F2942]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isResolved ? 'check' : 'build'}
                  </span>
                  <span>{isResolved ? 'Resolved' : item.actionLabel}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
