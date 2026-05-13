
export type Department = 'Finance' | 'IT' | 'HR' | 'Marketing' | 'Operations' | 'Legal';
export type PositionLevel = 'Staff' | 'Manager' | 'Director' | 'Guest' | 'Contractor';
export type AccessStatus = 'Scheduled' | 'In-Progress' | 'Finished' | 'Cancelled';
export type RoomCategory = 'Public' | 'Restricted';
export type AccessRequestStatus = 'Pending' | 'Upcoming' | 'Occupied' | 'Done' | 'Rejected';

export interface CommercialProfile {
  id: string;
  personId: string;
  employeeId: string;
  name: string;
  department: Department;
  position: PositionLevel;
  avatar?: string;
  faceTemplateId: string;
  nfcUid: string;
  joinedAt: string;
}

export interface MeetingRoom {
  id: string;
  name: string;
  floor: string;
  capacity?: number; // Only for Public
  deviceId: string;
  category: RoomCategory;
  picNames?: string[]; // Persons In Charge (At least 1 required for Restricted)
}

export interface AccessRequest {
  id: string;
  userId: string;
  roomId: string;
  status: AccessRequestStatus;
  startTime: string;
  endTime: string;
  purpose: string;
  requestTime: string;
  attendeeCount?: number;
  approvedBy?: string; // Staff ID
  rejectReason?: string;
}

export interface AccessZone {
  id: string;
  name: string;
  description: string;
}

export interface AccessMatrix {
  id: string;
  department: Department;
  position: PositionLevel;
  allowedZones: string[];
}

// --- MOCK DATA ---

export const ACCESS_ZONES: AccessZone[] = [
  { id: 'zone-lobby', name: 'Main Lobby', description: 'Public entrance and reception area' },
  { id: 'zone-it', name: 'IT Server Room', description: 'Restricted server and network hub' },
  { id: 'zone-finance', name: 'Finance Office', description: 'Financial records and accounting' },
  { id: 'zone-hr', name: 'HR Department', description: 'Personnel records and legal' },
  { id: 'zone-exec', name: 'Executive Suite', description: 'Director and Boardroom area' },
  { id: 'zone-general', name: 'General Office', description: 'Open workspace area' },
];

export const COMMERCIAL_PROFILES: CommercialProfile[] = [
  {
    id: 'emp-001',
    personId: 'p-101',
    employeeId: 'SA-FIN-001',
    name: 'Sarah Jenkins',
    department: 'Finance',
    position: 'Manager',
    faceTemplateId: 'face-8822',
    nfcUid: 'NFC-8822-1102',
    joinedAt: '2023-01-15',
  },
  {
    id: 'emp-002',
    personId: 'p-102',
    employeeId: 'SA-IT-042',
    name: 'David Chen',
    department: 'IT',
    position: 'Staff',
    faceTemplateId: 'face-9911',
    nfcUid: 'NFC-9911-5501',
    joinedAt: '2023-03-10',
  },
  {
    id: 'emp-003',
    personId: 'p-103',
    employeeId: 'SA-DIR-001',
    name: 'Marcus Thorne',
    department: 'Operations',
    position: 'Director',
    faceTemplateId: 'face-0001',
    nfcUid: 'NFC-0001-0001',
    joinedAt: '2022-06-01',
  }
];

export const MEETING_ROOMS: MeetingRoom[] = [
  { id: 'rm-01', name: 'Ruang Meeting Besar', floor: '02', capacity: 20, deviceId: 'dev-lock-01', category: 'Public' },
  { id: 'rm-02', name: 'Ruang Meeting Kecil', floor: '02', capacity: 6, deviceId: 'dev-lock-05', category: 'Public' },
  { id: 'rm-03', name: 'Ruangan Direktur', floor: '05', deviceId: 'dev-lock-02', category: 'Restricted', picNames: ['Marcus Thorne', 'Sarah Jenkins'] },
  { id: 'rm-04', name: 'Ruang Server', floor: '03', deviceId: 'dev-lock-03', category: 'Restricted', picNames: ['David Chen'] },
  { id: 'rm-05', name: 'Gudang Inventory', floor: '01', deviceId: 'dev-lock-04', category: 'Restricted', picNames: ['Sarah Jenkins', 'David Chen'] },
];

export const ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: 'REQ-1001',
    userId: 'emp-001',
    roomId: 'rm-01',
    status: 'Occupied',
    startTime: '2026-05-11T09:00:00Z',
    endTime: '2026-05-11T11:00:00Z',
    purpose: 'Weekly Finance Review',
    requestTime: '2026-05-10T15:00:00Z',
    approvedBy: 'SA-ADM-01'
  },
  {
    id: 'REQ-1002',
    userId: 'emp-002',
    roomId: 'rm-02',
    status: 'Upcoming',
    startTime: '2026-05-11T14:00:00Z',
    endTime: '2026-05-11T16:00:00Z',
    purpose: 'Urgent Stakeholder Pitch',
    requestTime: '2026-05-11T08:00:00Z'
  },
  {
    id: 'REQ-1003',
    userId: 'emp-003',
    roomId: 'rm-03',
    status: 'Pending',
    startTime: '2026-05-11T10:00:00Z',
    endTime: '2026-05-11T12:00:00Z',
    purpose: 'Director Sync',
    requestTime: '2026-05-11T07:30:00Z',
    approvedBy: 'SA-ADM-01'
  }
];

export const ACCESS_MATRIX: AccessMatrix[] = [
  { id: 'm-1', department: 'IT', position: 'Staff', allowedZones: ['zone-lobby', 'zone-it', 'zone-general'] },
  { id: 'm-2', department: 'Finance', position: 'Manager', allowedZones: ['zone-lobby', 'zone-finance', 'zone-general'] },
  { id: 'm-3', department: 'Operations', position: 'Director', allowedZones: ['zone-lobby', 'zone-it', 'zone-finance', 'zone-hr', 'zone-exec', 'zone-general'] },
];
