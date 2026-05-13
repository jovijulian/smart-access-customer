import { HeaderUser } from '@/components/layout/HeaderUser';
import { User, Bell, Home as HomeIcon, Maximize, Car, CreditCard, ChevronRight, ShieldAlert, XCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();
    const [pendingApprovals, setPendingApprovals] = useState([
        {
            id: 'REQ-9921',
            name: 'Bpk. Supriyanto',
            role: 'Kurir Paket',
            location: 'Main Gate',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100&q=80'
        },
    ]);
    const unitData = {
        unit_id: 'UID-001',
        address: 'Blok A 01',
        land: 120,
        building: 90,
        status: 'Occupied'
    };

    const residentsData = [
        {
            id: 'RES-001',
            name: 'Alice Cooper',
            phone: '+62 812-3456-7890',
            role: 'Owner',
            assets: { rfids: 1, vehicles: 1 },
            status: 'Active'
        },
        {
            id: 'RES-002',
            name: 'Bob Cooper',
            phone: '+62 812-9876-5432',
            role: 'Member',
            assets: { rfids: 1, vehicles: 1 },
            status: 'Active'
        }
    ];

    const handleResidentClick = (role: string, id: string) => {
        if (role === 'Member') {
            navigate(`/resident/${id}`);
        }
    };

    const handleQuickApprove = (id: string, name: string) => {
        if (confirm(`Izinkan tamu "${name}" masuk?`)) {
            // Hapus item dari list pending setelah di-approve
            setPendingApprovals(prev => prev.filter(req => req.id !== id));
            alert('Akses diberikan. Gate dibuka.');
        }
    };

    const handleQuickReject = (id: string, name: string) => {
        if (confirm(`Tolak akses tamu "${name}"?`)) {
            // Hapus item dari list pending setelah di-reject
            setPendingApprovals(prev => prev.filter(req => req.id !== id));
        }
    };


    return (
        <div className="p-6 space-y-8">
            <HeaderUser />
            {pendingApprovals.length > 0 && (
                <section className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4">
                    {/* Header Approval dengan Counter & See All */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">
                              Guest Requests
                            </h3>

                        </div>
                        <button
                            onClick={() => navigate('/notification')}
                            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center"
                        >
                            See All <ChevronRight className="w-3 h-3 ml-0.5" />
                        </button>
                    </div>

                    {/* Menampilkan maksimal 2 request teratas */}
                    <div className="space-y-3">
                        {pendingApprovals.slice(0, 2).map((request) => (
                            <div key={request.id} className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-2xl flex flex-col gap-4 relative overflow-hidden transition-all hover:border-blue-500/50">

                                <div className="flex items-center justify-between z-10">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={request.image}
                                            className="w-12 h-12 rounded-xl object-cover border border-white/10 bg-background/50"
                                            alt={request.name}
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-white">{request.name}</p>
                                            <p className="text-xs text-textSecondary mt-0.5">{request.role} • {request.location}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/notification/${request.id}`)}
                                        className="text-[10px] font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
                                    >
                                        Detail
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 z-10">
                                    <button
                                        onClick={() => handleQuickReject(request.id, request.name)}
                                        className="flex-1 py-2.5 bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500/10 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleQuickApprove(request.id, request.name)}
                                        className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(0,230,118,0.15)] flex items-center justify-center gap-2"
                                    >
                                        Approve
                                    </button>
                                </div>

                                <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            <section className="space-y-3">
                <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Unit Information</h3>
                <div className="bg-surface border border-border p-5 rounded-2xl relative overflow-hidden">

                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <HomeIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">{unitData.address}</p>
                                <p className="text-xs text-textSecondary font-mono">{unitData.unit_id}</p>
                            </div>
                        </div>
                        <span className="px-2.5 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-bold uppercase">
                            {unitData.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                            <p className="text-xs text-textSecondary mb-1 flex items-center">
                                <Maximize className="w-3 h-3 mr-1" /> Land (m²)
                            </p>
                            <p className="text-sm font-semibold text-white">{unitData.land} m²</p>
                        </div>
                        <div>
                            <p className="text-xs text-textSecondary mb-1 flex items-center">
                                <HomeIcon className="w-3 h-3 mr-1" /> Building (m²)
                            </p>
                            <p className="text-sm font-semibold text-white">{unitData.building} m²</p>
                        </div>
                    </div>

                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
                </div>
            </section>

            <section className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Resident</h3>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {residentsData.length} People
                    </span>
                </div>

                <div className="space-y-3">
                    {residentsData.map((resident) => {
                        const isClickable = resident.role === 'Member';

                        return (
                            <div
                                key={resident.id}
                                onClick={() => handleResidentClick(resident.role, resident.id)}
                                className={`bg-surface border border-border p-4 rounded-xl flex items-center justify-between transition-all ${isClickable ? 'cursor-pointer hover:border-primary/50 active:scale-[0.98]' : 'opacity-90'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                                        <User className="w-5 h-5 text-textSecondary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{resident.name}</h4>
                                        <div className="flex items-center space-x-2 text-textSecondary">
                                            <div className="flex items-center text-xs">
                                                <CreditCard className="w-3 h-3 mr-1" /> {resident.assets.rfids} RFIDs
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-textSecondary">
                                            <div className="flex items-center text-xs">
                                                <Car className="w-3 h-3 mr-1" /> {resident.assets.vehicles} Vehicles
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col items-end space-y-1">
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${resident.role === 'Owner'
                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {resident.role}
                                            </span>
                                        </div>

                                        <span className="text-[10px] text-green-500">{resident.status}</span>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}