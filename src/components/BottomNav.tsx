import React from 'react';
import { ScreenId, AppRole } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  currentRole: AppRole;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  currentRole,
  onNavigate,
}) => {
  const isHomeActive =
    currentScreen === 'shipper-home' ||
    currentScreen === 'driver-home' ||
    currentScreen === 'exception-engine';

  const isLoadsActive =
    currentScreen === 'loads-post' ||
    currentScreen === 'enterprise-rfp' ||
    currentScreen === 'rfp-evaluations';

  const isTripsActive =
    currentScreen === 'active-trips' ||
    currentScreen === 'load-epod' ||
    currentScreen === 'incident-resolution';

  const isTrackActive = currentScreen === 'fleet-track';
  const isProfileActive = currentScreen === 'operator-profile';

  const handleHomeClick = () => {
    if (currentRole === 'driver') onNavigate('driver-home');
    else if (currentRole === 'ops') onNavigate('exception-engine');
    else onNavigate('shipper-home');
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      active: isHomeActive,
      onClick: handleHomeClick,
    },
    {
      id: 'loads',
      label: 'Loads',
      icon: 'inventory_2',
      active: isLoadsActive,
      onClick: () => onNavigate('loads-post'),
    },
    {
      id: 'trips',
      label: 'Trips',
      icon: 'navigation',
      active: isTripsActive,
      onClick: () => onNavigate('active-trips'),
    },
    {
      id: 'track',
      label: 'Track',
      icon: 'near_me',
      active: isTrackActive,
      onClick: () => onNavigate('fleet-track'),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'account_circle',
      active: isProfileActive,
      onClick: () => onNavigate('operator-profile'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-15 max-w-md mx-auto w-full px-1">
        {navItems.map((item) => {
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
                item.active ? 'text-[#EA580C]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div
                className={`w-9 h-7 rounded-full flex items-center justify-center transition-colors ${
                  item.active ? 'bg-[#FFF7ED]' : 'bg-transparent'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
              </div>
              <span className={`text-[11px] font-medium leading-tight mt-0.5 ${item.active ? 'font-semibold text-[#EA580C]' : 'text-[#64748B]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
