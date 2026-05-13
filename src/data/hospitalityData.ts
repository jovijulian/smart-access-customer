
export type RoomStatus = 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
export type RoomType = 'Standard' | 'Deluxe' | 'Suite';
export type BookingStatus = 'Draft' | 'Confirmed' | 'Checked-In' | 'Checked-Out' | 'Late';
export type PaymentMethod = 'Cash' | 'QRIS' | 'Card' | 'Transfer';
export type PaymentStatus = 'Pending' | 'Paid' | 'Partial' | 'Refunded';

export interface BoundDevice {
  id: string;
  name: string;
  type: 'Door Lock' | 'Access Gateway';
  protocol: 'BLE' | 'WiFi' | 'Modbus' | 'Zigbee';
  status: 'Online' | 'Offline';
}

export interface Room {
  id: string;
  number: string;
  floor: string;
  type: RoomType;
  basePrice: number; // per night
  status: RoomStatus;
  devices: BoundDevice[];
  currentGuestId?: string;
}

export interface VirtualKey {
  id: string;
  pin: string;
  issuedAt: string;
  expiresAt: string;
  status: 'Active' | 'Expired' | 'Revoked';
}

export interface AccessLogEntry {
  timestamp: string;
  event: 'Entry' | 'Exit' | 'Failed Attempt';
  method: 'PIN' | 'eKey' | 'Remote Open';
}

export interface Booking {
  id: string;
  guestName: string;
  guestContact: string;
  guestIdType: 'KTP' | 'Passport';
  guestIdNumber: string;
  roomId: string;
  checkIn: string;   // ISO date string
  checkOut: string;  // ISO date string
  actualCheckOut?: string;
  status: BookingStatus;
  adults: number;
  children: number;
  baseRate: number;     // per night
  totalNights: number;
  extraCharges: { label: string; amount: number }[];
  latePenalty: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAmount: number;
  virtualKey?: VirtualKey;
  accessLog: AccessLogEntry[];
  notes?: string;
}

export interface TransactionLog {
  id: string;
  invoiceRef: string;
  guestName: string;
  roomNumber: string;
  timestamp: string;
  type: 'Room Charge' | 'Extra Service' | 'Late Penalty' | 'Deposit' | 'Refund';
  amount: number;
  paymentMethod: PaymentMethod;
  operator: string;
  auditFlag: 'Normal' | 'Adjustment' | 'Penalty';
  bookingId: string;
}

// --- MOCK DATA ---

export const mockDevicePool: BoundDevice[] = [
  { id: 'DEV-001', name: 'Main Gate Controller', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
  { id: 'DEV-002', name: 'Smart Lock 101', type: 'Door Lock', protocol: 'BLE', status: 'Online' },
  { id: 'DEV-003', name: 'Smart Lock 102', type: 'Door Lock', protocol: 'BLE', status: 'Online' },
  { id: 'DEV-004', name: 'Smart Lock 201', type: 'Door Lock', protocol: 'WiFi', status: 'Online' },
  { id: 'DEV-005', name: 'Smart Lock 202', type: 'Door Lock', protocol: 'BLE', status: 'Offline' },
  { id: 'DEV-006', name: 'Smart Lock 301 (Suite)', type: 'Door Lock', protocol: 'BLE', status: 'Online' },
  { id: 'DEV-011', name: 'Floor 1 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
  { id: 'DEV-012', name: 'Floor 2 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
  { id: 'DEV-013', name: 'Floor 3 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
  { id: 'DEV-014', name: 'Smart Lock 103', type: 'Door Lock', protocol: 'WiFi', status: 'Online' },
];

export const mockRooms: Room[] = [
  {
    id: 'R-101', number: '101', floor: 'Floor 1', type: 'Standard', basePrice: 350000, status: 'Occupied',
    currentGuestId: '20260501001',
    devices: [
      { id: 'DEV-002', name: 'Smart Lock 101', type: 'Door Lock', protocol: 'BLE', status: 'Online' },
      { id: 'DEV-011', name: 'Floor 1 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
    ]
  },
  {
    id: 'R-102', number: '102', floor: 'Floor 1', type: 'Standard', basePrice: 350000, status: 'Cleaning',
    devices: [
      { id: 'DEV-003', name: 'Smart Lock 102', type: 'Door Lock', protocol: 'BLE', status: 'Online' },
      { id: 'DEV-011', name: 'Floor 1 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
    ]
  },
  {
    id: 'R-103', number: '103', floor: 'Floor 1', type: 'Deluxe', basePrice: 550000, status: 'Available',
    devices: [
      { id: 'DEV-014', name: 'Smart Lock 103', type: 'Door Lock', protocol: 'WiFi', status: 'Online' },
      { id: 'DEV-011', name: 'Floor 1 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
    ]
  },
  {
    id: 'R-201', number: '201', floor: 'Floor 2', type: 'Deluxe', basePrice: 550000, status: 'Occupied',
    currentGuestId: '20260502002',
    devices: [
      { id: 'DEV-004', name: 'Smart Lock 201', type: 'Door Lock', protocol: 'WiFi', status: 'Online' },
      { id: 'DEV-012', name: 'Floor 2 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
    ]
  },
  {
    id: 'R-202', number: '202', floor: 'Floor 2', type: 'Deluxe', basePrice: 550000, status: 'Maintenance',
    devices: [
      { id: 'DEV-005', name: 'Smart Lock 202', type: 'Door Lock', protocol: 'BLE', status: 'Offline' },
      { id: 'DEV-012', name: 'Floor 2 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
    ]
  },
  {
    id: 'R-301', number: '301', floor: 'Floor 3', type: 'Suite', basePrice: 1200000, status: 'Occupied',
    currentGuestId: '20260503003',
    devices: [
      { id: 'DEV-006', name: 'Smart Lock 301 (Suite)', type: 'Door Lock', protocol: 'BLE', status: 'Online' },
      { id: 'DEV-013', name: 'Floor 3 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
    ]
  },
  {
    id: 'R-302', number: '302', floor: 'Floor 3', type: 'Suite', basePrice: 1200000, status: 'Available',
    devices: [
      { id: 'DEV-006', name: 'Smart Lock 301 (Suite)', type: 'Door Lock', protocol: 'BLE', status: 'Online' },
      { id: 'DEV-013', name: 'Floor 3 Gateway', type: 'Access Gateway', protocol: 'WiFi', status: 'Online' },
    ]
  },
];

export const mockBookings: Booking[] = [
  {
    id: '20260501001',
    guestName: 'Budi Santoso',
    guestContact: '08123456789',
    guestIdType: 'KTP',
    guestIdNumber: '3175012705880002',
    roomId: 'R-101',
    checkIn: '2026-05-06',
    checkOut: '2026-05-08',
    status: 'Checked-In',
    adults: 2,
    children: 0,
    baseRate: 350000,
    totalNights: 2,
    extraCharges: [{ label: 'Breakfast Package', amount: 100000 }],
    latePenalty: 0,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    paidAmount: 800000,
    virtualKey: {
      id: 'VK-001',
      pin: '4821',
      issuedAt: '2026-05-06T14:00:00',
      expiresAt: '2026-05-08T12:00:00',
      status: 'Active'
    },
    accessLog: [
      { timestamp: '2026-05-06T14:05:00', event: 'Entry', method: 'PIN' },
      { timestamp: '2026-05-06T19:30:00', event: 'Exit', method: 'eKey' },
      { timestamp: '2026-05-06T21:15:00', event: 'Entry', method: 'PIN' },
      { timestamp: '2026-05-07T08:00:00', event: 'Exit', method: 'eKey' },
    ],
    notes: 'Requested extra pillow'
  },
  {
    id: '20260502002',
    guestName: 'Siti Rahma',
    guestContact: '08567890123',
    guestIdType: 'KTP',
    guestIdNumber: '3175045510920001',
    roomId: 'R-201',
    checkIn: '2026-05-07',
    checkOut: '2026-05-09',
    status: 'Checked-In',
    adults: 1,
    children: 1,
    baseRate: 550000,
    totalNights: 2,
    extraCharges: [],
    latePenalty: 0,
    paymentMethod: 'QRIS',
    paymentStatus: 'Paid',
    paidAmount: 1100000,
    virtualKey: {
      id: 'VK-002',
      pin: '7356',
      issuedAt: '2026-05-07T13:30:00',
      expiresAt: '2026-05-09T12:00:00',
      status: 'Active'
    },
    accessLog: [
      { timestamp: '2026-05-07T13:35:00', event: 'Entry', method: 'PIN' },
    ]
  },
  {
    id: '20260503003',
    guestName: 'Andi Wijaya',
    guestContact: '08219876543',
    guestIdType: 'Passport',
    guestIdNumber: 'A1234567',
    roomId: 'R-301',
    checkIn: '2026-05-05',
    checkOut: '2026-05-07',
    status: 'Late',
    adults: 2,
    children: 0,
    baseRate: 1200000,
    totalNights: 2,
    extraCharges: [
      { label: 'Minibar', amount: 250000 },
      { label: 'Laundry', amount: 150000 },
    ],
    latePenalty: 600000,
    paymentMethod: 'Cash',
    paymentStatus: 'Pending',
    paidAmount: 0,
    virtualKey: {
      id: 'VK-003',
      pin: '9012',
      issuedAt: '2026-05-05T15:00:00',
      expiresAt: '2026-05-07T12:00:00',
      status: 'Expired'
    },
    accessLog: [
      { timestamp: '2026-05-05T15:05:00', event: 'Entry', method: 'PIN' },
      { timestamp: '2026-05-05T20:00:00', event: 'Exit', method: 'eKey' },
      { timestamp: '2026-05-06T09:00:00', event: 'Entry', method: 'PIN' },
      { timestamp: '2026-05-07T11:45:00', event: 'Failed Attempt', method: 'PIN' },
    ]
  },
  {
    id: '20260498498',
    guestName: 'Dewi Lestari',
    guestContact: '08776543210',
    guestIdType: 'KTP',
    guestIdNumber: '3201015511890003',
    roomId: 'R-102',
    checkIn: '2026-05-04',
    checkOut: '2026-05-06',
    actualCheckOut: '2026-05-06T11:30:00',
    status: 'Checked-Out',
    adults: 2,
    children: 2,
    baseRate: 350000,
    totalNights: 2,
    extraCharges: [{ label: 'Airport Transfer', amount: 200000 }],
    latePenalty: 0,
    paymentMethod: 'Transfer',
    paymentStatus: 'Paid',
    paidAmount: 900000,
    virtualKey: {
      id: 'VK-004',
      pin: '3344',
      issuedAt: '2026-05-04T14:00:00',
      expiresAt: '2026-05-06T12:00:00',
      status: 'Revoked'
    },
    accessLog: [
      { timestamp: '2026-05-04T14:10:00', event: 'Entry', method: 'PIN' },
      { timestamp: '2026-05-06T11:25:00', event: 'Exit', method: 'Remote Open' },
    ]
  },
  {
    id: '20260510510',
    guestName: 'Rizki Pratama',
    guestContact: '08123987654',
    guestIdType: 'KTP',
    guestIdNumber: '3173010609950001',
    roomId: 'R-103',
    checkIn: '2026-05-09',
    checkOut: '2026-05-11',
    status: 'Confirmed',
    adults: 1,
    children: 0,
    baseRate: 550000,
    totalNights: 2,
    extraCharges: [],
    latePenalty: 0,
    paymentMethod: 'QRIS',
    paymentStatus: 'Partial',
    paidAmount: 550000,
    accessLog: []
  },
];

export const mockTransactionLogs: TransactionLog[] = [
  {
    id: 'TXN-001', invoiceRef: '20260501001', guestName: 'Budi Santoso', roomNumber: '101',
    timestamp: '2026-05-06T14:00:00', type: 'Room Charge', amount: 700000,
    paymentMethod: 'Card', operator: 'Front Desk (Admin)', auditFlag: 'Normal', bookingId: '20260501001'
  },
  {
    id: 'TXN-002', invoiceRef: '20260501001', guestName: 'Budi Santoso', roomNumber: '101',
    timestamp: '2026-05-06T14:05:00', type: 'Extra Service', amount: 100000,
    paymentMethod: 'Card', operator: 'Front Desk (Admin)', auditFlag: 'Normal', bookingId: '20260501001'
  },
  {
    id: 'TXN-003', invoiceRef: '20260502002', guestName: 'Siti Rahma', roomNumber: '201',
    timestamp: '2026-05-07T13:30:00', type: 'Room Charge', amount: 1100000,
    paymentMethod: 'QRIS', operator: 'System (Auto)', auditFlag: 'Normal', bookingId: '20260502002'
  },
  {
    id: 'TXN-004', invoiceRef: '20260503003', guestName: 'Andi Wijaya', roomNumber: '301',
    timestamp: '2026-05-07T12:30:00', type: 'Late Penalty', amount: 600000,
    paymentMethod: 'Cash', operator: 'System (Auto)', auditFlag: 'Penalty', bookingId: '20260503003'
  },
  {
    id: 'TXN-005', invoiceRef: '20260503003', guestName: 'Andi Wijaya', roomNumber: '301',
    timestamp: '2026-05-05T15:00:00', type: 'Room Charge', amount: 2400000,
    paymentMethod: 'Cash', operator: 'Front Desk (Admin)', auditFlag: 'Normal', bookingId: '20260503003'
  },
  {
    id: 'TXN-006', invoiceRef: '20260498498', guestName: 'Dewi Lestari', roomNumber: '102',
    timestamp: '2026-05-04T14:00:00', type: 'Room Charge', amount: 700000,
    paymentMethod: 'Transfer', operator: 'Front Desk (Admin)', auditFlag: 'Normal', bookingId: '20260498498'
  },
  {
    id: 'TXN-007', invoiceRef: '20260498498', guestName: 'Dewi Lestari', roomNumber: '102',
    timestamp: '2026-05-06T11:30:00', type: 'Extra Service', amount: 200000,
    paymentMethod: 'Transfer', operator: 'System (Auto)', auditFlag: 'Normal', bookingId: '20260498498'
  },
];
