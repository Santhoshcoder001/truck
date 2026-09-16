export type AppRole = 'shipper' | 'driver' | 'ops';

export type ScreenId =
  | 'shipper-home'
  | 'loads-post'
  | 'fleet-track'
  | 'active-trips'
  | 'driver-home'
  | 'load-epod'
  | 'incident-resolution'
  | 'exception-engine'
  | 'enterprise-rfp'
  | 'rfp-evaluations'
  | 'operator-profile';

export interface Consignment {
  id: string;
  orderNumber: string;
  origin: string;
  destination: string;
  commodity: string;
  tonnage: number;
  vehicleClass: string;
  driverName: string;
  driverRating: number;
  driverVehicle: string;
  confirmedRate: number;
  advancePaid: number;
  status: 'IN TRANSIT' | 'DOCKED' | 'UNLOADING' | 'COMPLETED' | 'DELAYED';
  progressPercent: number;
  eta: string;
}
