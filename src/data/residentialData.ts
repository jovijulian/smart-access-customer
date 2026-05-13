export interface Unit {
  unit_id: string;
  block: string;
  house_number: string;
  land_area: number;
  building_area: number;
  status: 'Vacant' | 'Occupied' | 'Maintenance';
  legal_owner_name: string;
  owner_contact: string;
  email: string;
}

export const unitsData: Unit[] = [
  { unit_id: 'UID-001', block: 'Blok A', house_number: '01', land_area: 120, building_area: 90, status: 'Occupied', legal_owner_name: 'Alice Cooper', owner_contact: '+62 812-3456-7890', email: 'alice@example.com' },
  { unit_id: 'UID-002', block: 'Blok A', house_number: '05', land_area: 120, building_area: 90, status: 'Occupied', legal_owner_name: 'Mr. Smith', owner_contact: '+62 812-9876-0000', email: 'smith@example.com' },
  { unit_id: 'UID-003', block: 'Blok A', house_number: '06', land_area: 150, building_area: 120, status: 'Vacant', legal_owner_name: 'Property Corp', owner_contact: '+62 800-1234', email: 'contact@propertycorp.com' },
  { unit_id: 'UID-004', block: 'Blok B', house_number: '12', land_area: 200, building_area: 150, status: 'Occupied', legal_owner_name: 'Bob Builder', owner_contact: '+62 813-1122-3344', email: 'bob@example.com' },
  { unit_id: 'UID-005', block: 'Blok C', house_number: '01', land_area: 100, building_area: 80, status: 'Occupied', legal_owner_name: 'Charlie Davis', owner_contact: '+62 811-5566-7788', email: 'charlie@example.com' },
  { unit_id: 'UID-006', block: 'Blok C', house_number: '05', land_area: 100, building_area: 80, status: 'Occupied', legal_owner_name: 'Diana Prince', owner_contact: '+62 815-9988-7766', email: 'diana@example.com' },
  { unit_id: 'UID-007', block: 'Blok D', house_number: '09', land_area: 300, building_area: 250, status: 'Occupied', legal_owner_name: 'Bruce Wayne', owner_contact: '+62 818-4433-2211', email: 'bruce@wayne.com' },
  { unit_id: 'UID-008', block: 'Blok D', house_number: '10', land_area: 300, building_area: 250, status: 'Maintenance', legal_owner_name: 'Bruce Wayne', owner_contact: '+62 818-4433-2211', email: 'bruce@wayne.com' },
];

export interface Vehicle {
  plate_number: string;
  vehicle_type: 'Car' | 'Motorcycle';
  uhf_sticker?: string;
}

export interface Resident {
  resident_id: string;
  unit_id: string;
  resident_name: string;
  contact_number: string;
  email: string;
  resident_type: 'Owner' | 'Tenant' | 'Member';
  primary_member_id?: string;
  rfids: string[];
  vehicles: Vehicle[];
  access_status: 'Active' | 'Inactive' | 'Suspend';
}

export const residentsData: Resident[] = [
  {
    resident_id: 'RES-001',
    unit_id: "UID-001",
    resident_name: "Alice Cooper",
    contact_number: "+62 812-3456-7890",
    email: "alice@example.com",
    resident_type: "Owner",
    rfids: ["RF-987654321A"],
    vehicles: [
      { plate_number: "B 1234 ABC", vehicle_type: "Car", uhf_sticker: "UHF-1111" }
    ],
    access_status: "Active"
  },
  {
    resident_id: 'RES-002',
    unit_id: "UID-002",
    resident_name: "John Smith",
    contact_number: "+62 812-9876-5432",
    email: "john@example.com",
    resident_type: "Tenant",
    rfids: ["RF-123456789B"],
    vehicles: [
      { plate_number: "B 5678 XYZ", vehicle_type: "Motorcycle" }
    ],
    access_status: "Active"
  },
  {
    resident_id: 'RES-003',
    unit_id: "UID-004",
    resident_name: "Bob Builder",
    contact_number: "+62 813-1122-3344",
    email: "bob@example.com",
    resident_type: "Owner",
    rfids: ["RF-112233445C"],
    vehicles: [
      { plate_number: "D 9999 DEF", vehicle_type: "Car", uhf_sticker: "UHF-2222" },
      { plate_number: "D 8888 MTR", vehicle_type: "Motorcycle" }
    ],
    access_status: "Suspend"
  },
  {
    resident_id: 'RES-004',
    unit_id: "UID-005",
    resident_name: "Charlie Davis",
    contact_number: "+62 811-5566-7788",
    email: "charlie@example.com",
    resident_type: "Tenant",
    rfids: ["RF-556677889D"],
    vehicles: [
      { plate_number: "B 7777 GHI", vehicle_type: "Motorcycle" }
    ],
    access_status: "Active"
  },
  {
    resident_id: 'RES-005',
    unit_id: "UID-006",
    resident_name: "Diana Prince",
    contact_number: "+62 815-9988-7766",
    email: "diana@example.com",
    resident_type: "Owner",
    rfids: ["RF-998877665E"],
    vehicles: [
      { plate_number: "F 1010 JKL", vehicle_type: "Car", uhf_sticker: "UHF-3333" }
    ],
    access_status: "Inactive"
  },
  {
    resident_id: 'RES-006',
    unit_id: "UID-007",
    resident_name: "Bruce Wayne",
    contact_number: "+62 818-4433-2211",
    email: "bruce@wayne.com",
    resident_type: "Owner",
    rfids: ["RF-443322110F"],
    vehicles: [
      { plate_number: "B 0000 MNO", vehicle_type: "Car", uhf_sticker: "UHF-4444" },
      { plate_number: "B 0001 PQR", vehicle_type: "Car", uhf_sticker: "UHF-5555" }
    ],
    access_status: "Active"
  }
];

const d = new Date();
const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const accessLogsData = [
  { id: 1, timestamp: `${todayStr} 10:15:22`, gate_name: 'Main Gate - In', event_status: 'Granted', entity_name: 'Muhammad Abdul Zaelani', entity_type: 'Resident', access_method: 'RFID Card' },
  { id: 2, timestamp: `${todayStr} 10:20:05`, gate_name: 'Main Gate - In', event_status: 'Denied', entity_name: 'Unknown', entity_type: 'Unknown', access_method: 'RFID Card' },
  { id: 3, timestamp: `${todayStr} 10:22:15`, gate_name: 'Main Gate - In', event_status: 'Granted', entity_name: 'Supri', entity_type: 'Guard', access_method: 'Gate Controller' },
  { id: 4, timestamp: `${todayStr} 10:45:30`, gate_name: 'Sector B - Out', event_status: 'Granted', entity_name: 'Zaskia Maharani', entity_type: 'Guest', access_method: 'QR Code' },
  { id: 5, timestamp: `${todayStr} 11:05:12`, gate_name: 'Sector A - In', event_status: 'Denied', entity_name: 'John Doe', entity_type: 'Guest', access_method: 'QR Code' },
  { id: 6, timestamp: `${todayStr} 11:10:00`, gate_name: 'Main Gate - Out', event_status: 'Granted', entity_name: 'Muhammad Abdul Zaelani', entity_type: 'Resident', access_method: 'RFID Card' },
  { id: 7, timestamp: `${todayStr} 11:15:45`, gate_name: 'Sector B - In', event_status: 'Granted', entity_name: 'Ahmad', entity_type: 'Guard', access_method: 'Gate Controller' },
];

export interface Gate {
  name: string;
  isOnline: boolean;
  lastAction: string;
}

export const gatesData: Gate[] = [
  { name: 'Main Gate - Entrance', isOnline: true, lastAction: 'Opened by Alice Cooper - 14:20 PM' },
  { name: 'Main Gate - Exit', isOnline: true, lastAction: 'Opened by Delivery (Amazon) - 13:15 PM' },
  { name: 'Sector B Gate', isOnline: false, lastAction: 'Connection lost - 02:30 AM' },
];
