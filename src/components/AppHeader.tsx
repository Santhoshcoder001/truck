import React, { useState } from 'react';
import { ScreenId, AppRole } from '../types';

interface AppHeaderProps {
  currentScreen: ScreenId;
  currentRole: AppRole;
  onNavigate: (screen: ScreenId) => void;
  onSelectRole: (role: AppRole) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentScreen,
  currentRole,
  onNavigate,
  onSelectRole,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'shipper-home':
        return 'Namma Lorry';
      case 'loads-post':
        return 'Post a Load';
      case 'fleet-track':
        return 'Live Tracking';
      case 'active-trips':
        return 'Active Trip';
      case 'driver-home':
        return 'Driver Cockpit';
      case 'load-epod':
        return 'e-POD Delivery';
      case 'enterprise-rfp':
        return 'Create RFP';
      case 'rfp-evaluations':
        return 'RFP Evaluations';
      case 'exception-engine':
        return 'Exception Radar';
      case 'incident-resolution':
        return 'Resolve Incident';
      case 'operator-profile':
        return 'Profile & Fleet';
      default:
        return 'Namma Lorry';
    }
  };

  const screens: { id: ScreenId; title: string; subtitle: string; role: AppRole; icon: string }[] = [
    { id: 'shipper-home', title: 'Shipper Home', subtitle: 'Ashok Traders dispatch hub', role: 'shipper', icon: 'home' },
    { id: 'loads-post', title: 'Post a Load', subtitle: 'Step-by-step freight wizard', role: 'shipper', icon: 'add_circle' },
    { id: 'fleet-track', title: 'Live Tracking', subtitle: 'Real-time NH-48 telemetry', role: 'shipper', icon: 'near_me' },
    { id: 'enterprise-rfp', title: 'Enterprise RFP', subtitle: 'Volume contract builder', role: 'shipper', icon: 'description' },
    { id: 'rfp-evaluations', title: 'RFP Evaluations', subtitle: 'Compare competitive fleet bids', role: 'shipper', icon: 'fact_check' },
    { id: 'driver-home', title: 'Driver Cockpit', subtitle: 'Online status & trip matching', role: 'driver', icon: 'speed' },
    { id: 'active-trips', title: 'In-Cab Active Trip', subtitle: 'Roadside HUD & navigation', role: 'driver', icon: 'navigation' },
    { id: 'load-epod', title: 'e-POD Delivery', subtitle: 'Challan photo & settlement', role: 'driver', icon: 'task_alt' },
    { id: 'exception-engine', title: 'Exception Radar', subtitle: 'Highway control room', role: 'ops', icon: 'warning' },
    { id: 'incident-resolution', title: 'Resolve Incident', subtitle: 'Transshipment protocol', role: 'ops', icon: 'build' },
    { id: 'operator-profile', title: 'Profile & Documents', subtitle: 'KYC, RC & FASTag wallet', role: currentRole, icon: 'account_circle' },
  ];

  const handleNotificationClick = () => {
    setHasNotification(false);
    setToastMessage('FASTag Toll Cleared: Krishnagiri Plaza (₹340 debited)');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isSubScreen = currentScreen !== 'shipper-home' && currentScreen !== 'driver-home' && currentScreen !== 'exception-engine';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] pt-safe">
        <div className="h-14 px-4 flex items-center justify-between gap-2 max-w-md mx-auto w-full">
          {/* Left: Navigation or Brand */}
          <div className="flex items-center gap-2.5 min-w-0">
            {isSubScreen ? (
              <button
                type="button"
                aria-label="Back"
                onClick={() => {
                  if (currentRole === 'driver') onNavigate('driver-home');
                  else if (currentRole === 'ops') onNavigate('exception-engine');
                  else onNavigate('shipper-home');
                }}
                className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#0F172A] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#0F2942] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <h1 className="text-[17px] font-bold text-[#0F172A] leading-tight truncate">
                {getScreenTitle()}
              </h1>
              <span className="text-[11px] font-medium text-[#475569] leading-none capitalize">
                {currentRole} Mode
              </span>
            </div>
          </div>

          {/* Right: Screen Switcher + Notifications + Profile */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Quick Screen Switcher Sheet Button */}
            <button
              type="button"
              onClick={() => setShowMenu(true)}
              className="h-8 px-2.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F2942] text-[12px] font-semibold flex items-center gap-1 transition-colors"
              title="Switch screen or persona"
            >
              <span className="material-symbols-outlined text-[16px]">menu</span>
              <span>Screens</span>
            </button>

            {/* Notifications */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={handleNotificationClick}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] relative transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {hasNotification && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EA580C]"></span>
              )}
            </button>

            {/* Profile Avatar */}
            <button
              type="button"
              aria-label="Profile"
              onClick={() => onNavigate('operator-profile')}
              className="w-8 h-8 rounded-full bg-[#0F2942] text-white flex items-center justify-center font-bold text-[12px] hover:ring-2 hover:ring-[#EA580C] transition-all"
            >
              {currentRole === 'driver' ? 'MS' : currentRole === 'ops' ? 'OP' : 'AT'}
            </button>
          </div>
        </div>
      </header>

      {/* Screen Selection Modal / Bottom Sheet */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Header */}
            <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-bold text-[#0F172A]">Switch Screen & Role</h2>
                <p className="text-[12px] text-[#475569]">Select any view to test full application flow</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#475569] flex items-center justify-center hover:bg-[#E2E8F0]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Persona Switcher Buttons */}
            <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider mb-2">
                Active Role
              </div>
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
                      setShowMenu(false);
                    }}
                    className={`py-2 px-3 rounded-lg text-[13px] font-semibold capitalize transition-all ${
                      currentRole === role
                        ? 'bg-[#0F2942] text-white shadow-sm'
                        : 'bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Screens List */}
            <div className="overflow-y-auto p-2 divide-y divide-[#F1F5F9]">
              {screens.map((screen) => {
                const isActive = currentScreen === screen.id;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => {
                      onSelectRole(screen.role);
                      onNavigate(screen.id);
                      setShowMenu(false);
                    }}
                    className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-colors ${
                      isActive ? 'bg-[#FFF7ED] text-[#EA580C]' : 'hover:bg-[#F8FAFC] text-[#0F172A]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-[#EA580C] text-white' : 'bg-[#F1F5F9] text-[#0F2942]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{screen.icon}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-semibold truncate leading-snug">{screen.title}</span>
                        <span className="text-[12px] text-[#475569] truncate">{screen.subtitle}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[#94A3B8] shrink-0 ml-2">
                      chevron_right
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 max-w-md mx-auto bg-[#0F2942] text-white p-3.5 rounded-xl shadow-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#EA580C] text-[20px] shrink-0">info</span>
          <p className="text-[13px] font-medium leading-tight flex-1">{toastMessage}</p>
        </div>
      )}
    </>
  );
};
