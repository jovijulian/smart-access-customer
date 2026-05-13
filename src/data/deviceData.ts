
export type DeviceType = 'ANPR' | 'Controller' | 'Smart Lock' | 'Camera' | 'RFID Reader' | 'QR Scanner' | 'Kiosk';
export type DeviceStatus = 'Active' | 'Idle' | 'Offline';
export type DeviceModule = 'Parking' | 'Residential' | 'Hospitality' | 'Commercial' | 'None';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ip: string;
  mac: string;
  status: DeviceStatus;
  assignedTo: DeviceModule;
  usageSummary: string;
  firmware: string;
  lastError?: string;
  ports?: { id: number, label: string, status: 'Connected' | 'Disconnected' | 'Error' }[];
}

export const MOCK_DEVICES: Device[] = [
  {
    id: 'DEV-001',
    name: 'Main Gate Controller',
    type: 'Controller',
    ip: '192.168.1.101',
    mac: '00:1A:2B:3C:4D:5E',
    status: 'Active',
    assignedTo: 'Residential',
    usageSummary: 'Main Entrance (Gate A)',
    firmware: 'v2.4.5',
    ports: [
      { id: 1, label: 'Relay 1 (Gate)', status: 'Connected' },
      { id: 2, label: 'Sensor A (Loop)', status: 'Connected' },
      { id: 3, label: 'Reader 1 (RFID)', status: 'Connected' },
      { id: 4, label: 'Reader 2 (Exit)', status: 'Disconnected' },
    ]
  },
  {
    id: 'DEV-002',
    name: 'Parking ANPR Cam 01',
    type: 'ANPR',
    ip: '192.168.1.102',
    mac: 'AA:BB:CC:DD:EE:FF',
    status: 'Active',
    assignedTo: 'Parking',
    usageSummary: 'Entrance Lane 1',
    firmware: 'v1.12.0',
    lastError: 'Focus Drift Detected'
  },
  {
    id: 'DEV-003',
    name: 'Lobby Smart Lock',
    type: 'Smart Lock',
    ip: '192.168.1.105',
    mac: '11:22:33:44:55:66',
    status: 'Idle',
    assignedTo: 'Hospitality',
    usageSummary: 'Executive Suite 402',
    firmware: 'v3.0.1'
  },
  {
    id: 'DEV-004',
    name: 'Exit RFID Reader',
    type: 'RFID Reader',
    ip: '192.168.1.108',
    mac: '99:88:77:66:55:44',
    status: 'Offline',
    assignedTo: 'Parking',
    usageSummary: 'Exit Lane 2',
    firmware: 'v1.0.4',
    lastError: 'Network Timeout'
  },
  {
    id: 'DEV-005',
    name: 'Visitor QR Scanner',
    type: 'QR Scanner',
    ip: '192.168.1.110',
    mac: 'CC:DD:EE:FF:00:11',
    status: 'Offline',
    assignedTo: 'Commercial',
    usageSummary: 'West Lobby Pedestrian',
    firmware: 'v2.2.1',
    lastError: 'Glass Surface Dirty'
  },
  {
    id: 'DEV-006',
    name: 'Guest Self-Checkin Kiosk',
    type: 'Kiosk',
    ip: '192.168.1.120',
    mac: 'AA:BB:CC:DD:EE:FF',
    status: 'Active',
    assignedTo: 'Hospitality',
    usageSummary: 'Main Lobby (Guest Access)',
    firmware: 'v4.0.2'
  },
  // Added Smart Locks for Commercial Module
  {
    id: 'DEV-COM-001',
    name: 'Boardroom Smart Lock',
    type: 'Smart Lock',
    ip: '192.168.1.131',
    mac: 'A1:B2:C3:D4:E5:F6',
    status: 'Active',
    assignedTo: 'Commercial',
    usageSummary: 'Main Boardroom (Lvl 5)',
    firmware: 'v3.1.0'
  },
  {
    id: 'DEV-COM-002',
    name: 'Inventory Room Lock',
    type: 'Smart Lock',
    ip: '192.168.1.132',
    mac: 'F1:E2:D3:C4:B5:A6',
    status: 'Active',
    assignedTo: 'Commercial',
    usageSummary: 'Basement Inventory Area',
    firmware: 'v3.1.0'
  },
  {
    id: 'DEV-COM-003',
    name: 'Server Room Secure Lock',
    type: 'Smart Lock',
    ip: '192.168.1.133',
    mac: '12:34:56:78:90:AB',
    status: 'Active',
    assignedTo: 'Commercial',
    usageSummary: 'Data Center Lvl 2',
    firmware: 'v3.1.2'
  }
];
