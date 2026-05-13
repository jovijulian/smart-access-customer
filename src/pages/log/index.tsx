import { useState } from 'react';
import {
  Search,
  MapPin,
  CreditCard,
  QrCode,
  Smartphone,
  CheckCircle2,
  XCircle,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessLog {
  id: string;
  timestamp: string;
  gate: string;
  entityName: string;
  entityType: 'Resident' | 'Guest' | 'Guard' | 'Unknown';
  method: 'RFID Card' | 'QR Code' | 'Gate Controller' | 'Face Recognition';
  status: 'Granted' | 'Denied';
}

export function Log() {
  const [searchQuery, setSearchQuery] = useState('');

  const logs: AccessLog[] = [
    {
      id: 'L1',
      timestamp: '2026-05-13 14:20:05',
      gate: 'Main Gate - In',
      entityName: 'James Wilson',
      entityType: 'Guest',
      method: 'QR Code',
      status: 'Granted'
    },
    {
      id: 'L2',
      timestamp: '2026-05-13 11:10:00',
      gate: 'Main Gate - Out',
      entityName: 'Alice Cooper',
      entityType: 'Resident',
      method: 'RFID Card',
      status: 'Granted'
    },
    {
      id: 'L3',
      timestamp: '2026-05-13 11:05:12',
      gate: 'Sector A - In',
      entityName: 'John Doe',
      entityType: 'Guest',
      method: 'QR Code',
      status: 'Denied'
    },
    {
      id: 'L4',
      timestamp: '2026-05-13 10:45:30',
      gate: 'Sector B - Out',
      entityName: 'Zaskia Maharani',
      entityType: 'Guest',
      method: 'QR Code',
      status: 'Granted'
    },
    {
      id: 'L5',
      timestamp: '2026-05-13 10:20:05',
      gate: 'Main Gate - In',
      entityName: 'Unknown',
      entityType: 'Unknown',
      method: 'RFID Card',
      status: 'Denied'
    },
    {
      id: 'L6',
      timestamp: '2026-05-13 10:15:22',
      gate: 'Main Gate - In',
      entityName: 'Alice Cooper',
      entityType: 'Resident',
      method: 'RFID Card',
      status: 'Granted'
    }
  ];

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'RFID Card': return <CreditCard className="w-3.5 h-3.5" />;
      case 'QR Code': return <QrCode className="w-3.5 h-3.5" />;
      case 'Gate Controller': return <Smartphone className="w-3.5 h-3.5" />;
      default: return <CreditCard className="w-3.5 h-3.5" />;
    }
  };

  const filteredLogs = logs.filter(log =>
    log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.gate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedLogs = filteredLogs.reduce((acc, log) => {
    const date = log.timestamp.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {} as Record<string, AccessLog[]>);

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Access Logs</h1>
          <button className="p-2 bg-surface border border-border text-textSecondary rounded-full hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            placeholder="Search name or gate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {Object.keys(groupedLogs).length > 0 ? (
          Object.entries(groupedLogs).map(([date, dayLogs]) => (
            <div key={date} className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-xs font-bold text-textSecondary tracking-widest uppercase">
                  {date === new Date().toISOString().split('T')[0] ? 'Today' : date}
                </h2>
                <div className="flex-1 h-px bg-border opacity-50" />
              </div>
              <div className="space-y-3">
                {dayLogs.map((log) => {
                  const isGranted = log.status === 'Granted';

                  return (
                    <div
                      key={log.id}
                      className="bg-surface border border-border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">

                          {isGranted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                          )}

                          <p className="text-base font-bold text-white truncate">
                            {log.entityName}
                          </p>



                        </div>

                        <p className="text-sm font-bold text-white font-mono shrink-0">
                          {log.timestamp.split(' ')[1]}
                        </p>
                      </div>
                      <div className="ml-8 space-y-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] uppercase font-bold border shrink-0",
                          log.entityType === 'Resident'
                            ? "text-blue-400 border-blue-400/30 bg-blue-400/10"
                            : log.entityType === 'Guest'
                              ? "text-purple-400 border-purple-400/30 bg-purple-400/10"
                              : "text-gray-400 border-gray-400/30 bg-gray-400/10"
                        )}>
                          {log.entityType}
                        </span>
                      </div>
                      <div className="mt-3 ml-8 border-l border-border pl-4 space-y-2">
                        <div className="flex items-center text-xs text-textSecondary">
                          <MapPin className="w-3.5 h-3.5 mr-1 opacity-70" />
                          <span className="truncate">{log.gate}</span>
                        </div>
                        <div className="flex items-center text-xs text-textSecondary">
                          <div className="opacity-70 mr-1">
                            {getMethodIcon(log.method)}
                          </div>
                          <span>{log.method}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-textSecondary text-sm">
              No logs found.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}