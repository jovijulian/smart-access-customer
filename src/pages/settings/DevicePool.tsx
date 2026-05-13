
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsLayout } from '../../components/layout/SettingsLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Cpu, Plus, Activity, Camera, Scan, Lock, Nfc, QrCode, Wifi, Database, RotateCcw, Upload, HardDrive, Search, X, ChevronRight, ShieldCheck, AlertCircle, Globe, Settings, Monitor } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { cn } from '../../lib/utils';

import { MOCK_DEVICES, type Device, type DeviceType, type DeviceStatus } from '../../data/deviceData';

export function DevicePool() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [moduleFilter, setModuleFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isScanning, setIsScanning] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const navigate = useNavigate();

  const filteredDevices = useMemo(() => {
    return MOCK_DEVICES.filter(device => {
      const matchesModule = moduleFilter === 'All' || device.assignedTo === moduleFilter;
      const matchesType = typeFilter === 'All' || device.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || device.status === statusFilter;
      return matchesModule && matchesType && matchesStatus;
    });
  }, [moduleFilter, typeFilter, statusFilter]);

  const handleAutoDiscovery = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert('Network scan complete. 2 new devices found.');
    }, 2000);
  };

  const handleGlobalSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Global whitelist synchronization complete.');
    }, 1500);
  };

  return (
    <SettingsLayout>
      <div className="p-8 max-w-[1600px] mx-auto w-full relative">
        <div className="space-y-6">
          <PageHeader
            title="Device Pool"
            // description="Global hardware registry for centralized monitoring, logical assignment, and remote diagnostics."
            onBack={() => navigate(-1)}
            actions={
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleGlobalSync}
                  className="flex items-center gap-2 border-border text-textSecondary hover:text-white"
                  disabled={isSyncing}
                >
                  <Globe className={cn("w-4 h-4", isSyncing && "animate-spin")} />
                  <span>{isSyncing ? "Syncing" : "Global Sync"}</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAutoDiscovery}
                  className="flex items-center gap-2 border-border text-textSecondary hover:text-white"
                  disabled={isScanning}
                >
                  <Search className={cn("w-4 h-4", isScanning && "animate-pulse")} />
                  <span>{isScanning ? "Scanning..." : "Auto-Discovery"}</span>
                </Button>
                <Button
                  onClick={() => { }}
                  className="flex items-center gap-2 bg-primary text-black hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Device</span>
                </Button>
              </div>
            }
          />

          <div className="flex items-center justify-between gap-4 bg-surface/50 p-4 rounded-xl border border-border shrink-0">
            <div className="flex items-center gap-4">

              <div className="flex items-center gap-2">
                <select
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary min-w-[140px]"
                >
                  <option value="All">All Modules</option>
                  <option value="Parking">Parking</option>
                  <option value="Residential">Residential</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary min-w-[140px]"
                >
                  <option value="All">All Types</option>
                  <option value="ANPR">ANPR</option>
                  <option value="Controller">Controller</option>
                  <option value="Smart Lock">Smart Lock</option>
                  <option value="Camera">Camera</option>
                  <option value="RFID Reader">RFID Reader</option>
                  <option value="QR Scanner">QR Scanner</option>
                  <option value="Kiosk">Kiosk</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary min-w-[140px]"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Idle">Idle</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 py-1.5 bg-background/50 rounded-full border border-border/50">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                <span className="text-[10px] font-bold text-textSecondary uppercase">3 Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                <span className="text-[10px] font-bold text-textSecondary uppercase">1 Idle</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                <span className="text-[10px] font-bold text-textSecondary uppercase">2 Offline</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device Name</TableHead>
                  <TableHead>Hardware Type</TableHead>
                  <TableHead>Connection (IP/MAC)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Logical Binding</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow
                    key={device.id}
                    className={cn(
                      "cursor-pointer group",
                      selectedDevice?.id === device.id && "bg-primary/5"
                    )}
                    onClick={() => setSelectedDevice(device)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg bg-surface border transition-colors",
                          selectedDevice?.id === device.id ? "border-primary/50 text-primary" : "border-border text-textSecondary group-hover:text-white"
                        )}>
                          {getTypeIcon(device.type)}
                        </div>
                        <div>
                          <p className="font-bold text-white leading-tight">{device.name}</p>
                          <p className="text-[10px] text-textSecondary uppercase tracking-widest mt-0.5">{device.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-textSecondary">{device.type}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                          <Wifi className="w-3 h-3 text-primary" /> {device.ip}
                        </div>
                        <div className="text-[10px] text-textSecondary font-mono">{device.mac}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={device.status} />
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider",
                        getModuleColor(device.assignedTo)
                      )}>
                        {device.assignedTo}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <p className="text-xs text-textSecondary truncate italic">"{device.usageSummary}"</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="w-4 h-4 text-border group-hover:text-primary transition-all" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Right Slide-over Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-[450px] bg-surface border-l border-border shadow-2xl z-[60] transition-transform duration-300 ease-in-out transform flex flex-col",
        selectedDevice ? "translate-x-0" : "translate-x-full"
      )}>
        {selectedDevice && (
          <>
            <div className="p-6 border-b border-border shrink-0 flex items-center justify-between bg-background/30">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  {getTypeIcon(selectedDevice.type, 'w-6 h-6')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedDevice.name}</h3>
                  <p className="text-xs text-textSecondary uppercase tracking-widest">{selectedDevice.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDevice(null)}
                className="p-2 rounded-lg hover:bg-surfaceHover text-textSecondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Hardware Config Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                  <Settings className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hardware Configuration</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-background border border-border">
                    <p className="text-[10px] font-bold text-textSecondary uppercase mb-1">Network Identity</p>
                    <p className="text-sm font-bold text-white">{selectedDevice.ip}</p>
                    <p className="text-[10px] text-textSecondary font-mono mt-0.5">{selectedDevice.mac}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border">
                    <p className="text-[10px] font-bold text-textSecondary uppercase mb-1">System Version</p>
                    <p className="text-sm font-bold text-white">Firmware {selectedDevice.firmware}</p>
                    <p className="text-[10px] text-green-500 font-bold mt-0.5 uppercase tracking-widest">Stable Release</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 text-xs gap-2 border-border h-9">
                    <Upload className="w-3.5 h-3.5" />
                    Update Firmware
                  </Button>
                  <Button variant="outline" className="flex-1 text-xs gap-2 border-red-500/30 text-red-500 hover:bg-red-500/10 h-9">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Hard Reboot
                  </Button>
                </div>
              </section>

              {/* Logical Assignment Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                  <Database className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Logical Binding</h4>
                </div>

                <div className="p-4 rounded-xl bg-background/50 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textSecondary">Active Assignment:</span>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded border uppercase",
                      getModuleColor(selectedDevice.assignedTo)
                    )}>
                      {selectedDevice.assignedTo} Module
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-border">
                    <p className="text-xs text-white font-medium italic">"{selectedDevice.usageSummary}"</p>
                  </div>

                  {selectedDevice.type === 'Controller' && selectedDevice.ports && (
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-textSecondary uppercase mb-3 tracking-widest">IO Port Mapping Visualization</p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDevice.ports.map((port) => (
                          <div key={port.id} className="flex items-center justify-between p-2 rounded-lg bg-background border border-border/50">
                            <span className="text-[10px] font-bold text-white">P{port.id}</span>
                            <span className="text-[9px] text-textSecondary truncate px-2">{port.label}</span>
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
                              port.status === 'Connected' ? "bg-green-500 shadow-green-500/50" : "bg-border shadow-none"
                            )} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Health Diagnostics Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Health Diagnostics</h4>
                </div>

                <div className="space-y-3">
                  <div className={cn(
                    "p-4 rounded-xl border flex gap-3",
                    selectedDevice.lastError
                      ? "bg-red-500/5 border-red-500/20"
                      : "bg-green-500/5 border-green-500/20"
                  )}>
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      selectedDevice.lastError ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
                    )}>
                      {selectedDevice.lastError ? <AlertCircle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className={cn("text-sm font-bold", selectedDevice.lastError ? "text-red-500" : "text-green-500")}>
                        {selectedDevice.lastError ? "System Alert Detected" : "Operational Status: Nominal"}
                      </p>
                      <p className="text-xs text-textSecondary mt-1 leading-relaxed">
                        {selectedDevice.lastError
                          ? `Self-diagnostic report: ${selectedDevice.lastError}. Recommended action: Physical inspection and power cycle.`
                          : "No anomalies detected in the last 72 hours. All heartbeat signals are within threshold limits."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest px-1">Hardware Event Logs</p>
                    <div className="p-3 rounded-xl bg-background/30 border border-border/50 text-[10px] text-textSecondary font-mono leading-relaxed">
                      [2026-05-07 08:32] HEARTBEAT_OK <br />
                      [2026-05-07 09:15] CONFIG_SYNC_SUCCESS <br />
                      {selectedDevice.lastError && <span className="text-red-500">[2026-05-07 10:04] ERROR: {selectedDevice.lastError}</span>}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-6 pb-10 border-t border-border shrink-0 bg-background/30">
              <Button className="w-full h-11 bg-primary text-black font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                Apply Configuration
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Backdrop for panel */}
      {selectedDevice && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity"
          onClick={() => setSelectedDevice(null)}
        />
      )}
    </SettingsLayout>
  );
}

function getTypeIcon(type: DeviceType, className = "w-4 h-4") {
  switch (type) {
    case 'ANPR': return <Scan className={className} />;
    case 'Controller': return <Cpu className={className} />;
    case 'Smart Lock': return <Lock className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'RFID Reader': return <Nfc className={className} />;
    case 'QR Scanner': return <QrCode className={className} />;
    case 'Kiosk': return <Monitor className={className} />;
    default: return <HardDrive className={className} />;
  }
}

function StatusBadge({ status }: { status: DeviceStatus }) {
  const styles = {
    Active: "bg-green-500/10 text-green-500 border-green-500/20",
    Idle: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Offline: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border w-fit shadow-sm",
      styles[status]
    )}>
      <div className={cn("w-1.5 h-1.5 rounded-full", status === 'Offline' ? "bg-slate-400" : "bg-current")} />
      {status}
    </div>
  );
}

function getModuleColor(assignedTo: Device['assignedTo']) {
  switch (assignedTo) {
    case 'Parking': return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case 'Residential': return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case 'Hospitality': return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case 'Commercial': return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
}
