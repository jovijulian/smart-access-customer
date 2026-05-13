
export interface ParkingArea {
  id: string;
  name: string;
  floor: string;
  status: 'Active' | 'Maintenance' | 'Emergency Block';
  carCapacity: number;
  motorCapacity: number;
  truckCapacity: number;
}

export interface ParkingSlot {
  id: string;
  areaId: string;
  type: 'Car' | 'Motorcycle' | 'Truck';
  status: 'Available' | 'Occupied' | 'Reserved' | 'Blocked';
  plateNumber?: string;
}

export interface Lane {
  id: string;
  name: string;
  type: 'Entry' | 'Exit';
  areaId: string;
  status: 'Active' | 'Closed' | 'Maintenance';
  trafficCount24h: number;
  hardware: {
    reader: { id: string, name: string, status: 'Online' | 'Offline', type: 'ANPR' | 'RFID' };
    dispenser?: { id: string, name: string, status: 'Online' | 'Offline' };
    validator?: { id: string, name: string, status: 'Online' | 'Offline' };
    controller: { id: string, name: string, status: 'Online' | 'Offline', relayPort: number };
  };
}

export const parkingAreasData: ParkingArea[] = [
  {
    id: 'A1',
    name: 'Main Building',
    floor: 'B1',
    status: 'Active',
    carCapacity: 20,
    motorCapacity: 50,
    truckCapacity: 0
  },
  {
    id: 'A2',
    name: 'Outdoor P1',
    floor: 'L1',
    status: 'Active',
    carCapacity: 100,
    motorCapacity: 0,
    truckCapacity: 10
  },
  {
    id: 'A3',
    name: 'Main Building',
    floor: 'L2',
    status: 'Maintenance',
    carCapacity: 40,
    motorCapacity: 0,
    truckCapacity: 0
  },
];

// Helper to generate specific number of occupied slots
const generateOccupied = (areaId: string, prefix: string, count: number, type: 'Car' | 'Motorcycle' | 'Truck', start: number = 1): ParkingSlot[] => {
  const plates = ['B 1234 ABC', 'D 9988 XYZ', 'L 4422 RS', 'B 777 VMS', 'F 1029 KK', 'B 8821 UI', 'D 4556 OP', 'L 9002 WA'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `${areaId}-${prefix}-${String(start + i).padStart(2, '0')}`,
    areaId,
    type,
    status: 'Occupied',
    plateNumber: plates[Math.floor(Math.random() * plates.length)]
  }));
};

export const parkingSlotsData: ParkingSlot[] = [
  // A1 - 80% Occupancy (Total 70 slots, need 56 occupied)
  // 16 Cars + 40 Motors = 56
  ...generateOccupied('A1', 'C', 16, 'Car'),
  ...generateOccupied('A1', 'M', 40, 'Motorcycle'),
  
  // A2 - 72% Occupancy (Total 110 slots, 72% of 110 ≈ 79 slots)
  // 72 Cars + 7 Trucks = 79
  ...generateOccupied('A2', 'C', 72, 'Car'),
  ...generateOccupied('A2', 'T', 7, 'Truck'),

  // A3 - 0% Occupancy (Maintenance)
  // No occupied slots
  { id: 'A3-C-01', areaId: 'A3', type: 'Car', status: 'Blocked' },
  { id: 'A3-C-02', areaId: 'A3', type: 'Car', status: 'Blocked' },
];

export const parkingLanesData: Lane[] = [
  {
    id: 'L-01',
    name: 'Entrance 01',
    type: 'Entry',
    areaId: 'A1',
    status: 'Active',
    trafficCount24h: 142,
    hardware: {
      reader: { id: 'CAM-01', name: 'ANPR Main Entry', status: 'Online', type: 'ANPR' },
      dispenser: { id: 'TD-01', name: 'Ticket Dispenser A', status: 'Online' },
      controller: { id: 'CTRL-01', name: 'Master Controller 01', status: 'Online', relayPort: 1 }
    }
  },
  {
    id: 'L-02',
    name: 'Entrance 02',
    type: 'Entry',
    areaId: 'A1',
    status: 'Maintenance',
    trafficCount24h: 0,
    hardware: {
      reader: { id: 'RFID-01', name: 'RFID Reader B', status: 'Offline', type: 'RFID' },
      dispenser: { id: 'TD-02', name: 'Ticket Dispenser B', status: 'Online' },
      controller: { id: 'CTRL-01', name: 'Master Controller 01', status: 'Online', relayPort: 2 }
    }
  },
  {
    id: 'L-03',
    name: 'Main Exit 01',
    type: 'Exit',
    areaId: 'A1',
    status: 'Active',
    trafficCount24h: 128,
    hardware: {
      reader: { id: 'CAM-02', name: 'ANPR Main Exit', status: 'Online', type: 'ANPR' },
      validator: { id: 'PT-01', name: 'Payment Terminal 01', status: 'Online' },
      controller: { id: 'CTRL-02', name: 'Master Controller 02', status: 'Online', relayPort: 1 }
    }
  }
];
