import React, { useState } from 'react';
import { ScreenId, AppRole } from './types';
import { AppHeader } from './components/AppHeader';
import { BottomNav } from './components/BottomNav';
import { ShipperHomeScreen } from './components/screens/ShipperHomeScreen';
import { PostLoadScreen } from './components/screens/PostLoadScreen';
import { FleetLiveTrackScreen } from './components/screens/FleetLiveTrackScreen';
import { ActiveTripsScreen } from './components/screens/ActiveTripsScreen';
import { DriverCockpitScreen } from './components/screens/DriverCockpitScreen';
import { LoadEpodScreen } from './components/screens/LoadEpodScreen';
import { EnterpriseRfpScreen } from './components/screens/EnterpriseRfpScreen';
import { RfpEvaluationsScreen } from './components/screens/RfpEvaluationsScreen';
import { ExceptionEngineScreen } from './components/screens/ExceptionEngineScreen';
import { IncidentResolutionScreen } from './components/screens/IncidentResolutionScreen';
import { OperatorProfileScreen } from './components/screens/OperatorProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('shipper-home');
  const [currentRole, setCurrentRole] = useState<AppRole>('shipper');

  const handleRoleChange = (newRole: AppRole) => {
    setCurrentRole(newRole);
    if (newRole === 'driver') {
      setCurrentScreen('driver-home');
    } else if (newRole === 'ops') {
      setCurrentScreen('exception-engine');
    } else {
      setCurrentScreen('shipper-home');
    }
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    // Automatically keep role aligned with screen domain
    if (screen === 'driver-home' || screen === 'active-trips' || screen === 'load-epod') {
      setCurrentRole('driver');
    } else if (screen === 'exception-engine' || screen === 'incident-resolution') {
      setCurrentRole('ops');
    } else if (
      screen === 'shipper-home' ||
      screen === 'loads-post' ||
      screen === 'enterprise-rfp' ||
      screen === 'rfp-evaluations'
    ) {
      setCurrentRole('shipper');
    }
  };

  return (
    <div className="min-h-screen bg-[#001428] flex justify-center">
      {/* Mobile Shell Frame: max-w-md (390px - 428px), clean background */}
      <div className="w-full max-w-md min-h-screen bg-[#F8FAFC] flex flex-col relative shadow-2xl overflow-x-hidden border-x border-[#0F2942]/30">
        {/* Universal Top Header with Screen Switcher & Notifications */}
        <AppHeader
          currentScreen={currentScreen}
          currentRole={currentRole}
          onNavigate={handleNavigate}
          onSelectRole={handleRoleChange}
        />

        {/* Screen Viewport */}
        <main className="flex-1 flex flex-col w-full">
          {currentScreen === 'shipper-home' && (
            <ShipperHomeScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'loads-post' && (
            <PostLoadScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'fleet-track' && (
            <FleetLiveTrackScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'active-trips' && (
            <ActiveTripsScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'driver-home' && (
            <DriverCockpitScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'load-epod' && (
            <LoadEpodScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'enterprise-rfp' && (
            <EnterpriseRfpScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'rfp-evaluations' && (
            <RfpEvaluationsScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'exception-engine' && (
            <ExceptionEngineScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'incident-resolution' && (
            <IncidentResolutionScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === 'operator-profile' && (
            <OperatorProfileScreen
              currentRole={currentRole}
              onSelectRole={handleRoleChange}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Global Bottom Navigation Bar */}
        <BottomNav
          currentScreen={currentScreen}
          currentRole={currentRole}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
