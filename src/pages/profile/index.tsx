import { useNavigate } from 'react-router-dom';
import {
    User,
    CreditCard,
    Car,
    Users,
    Receipt,
    MapPin,
    Phone,
    Mail,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Profile() {
    const navigate = useNavigate();
    const profileData = {
        name: 'Alice Cooper',
        role: 'Owner',
        status: 'Active',
        unit: 'Blok A 01',
        phone: '+62 812-3456-7890',
        email: 'alice@example.com',
        assets: {
            rfids: ['RF-987654321A', 'RF-987654321B'],
            vehicles: [
                { plate: 'B 1234 ABC', type: 'Car', uhf: 'UHF-1111' },
                { plate: 'D 5678 XYZ', type: 'Motorcycle', uhf: '-' }
            ]
        },
        members: [
            { id: 'RES-002', name: 'Bob Cooper', phone: '+62 812-9876-5432', relation: 'Member', status: 'Active', assets: { rfids: 1, vehicles: 1 }, },
        ]
    };

    const handleLogout = () => {
        if (confirm('Apakah Anda yakin ingin keluar?')) {
            navigate('/login');
        }
    };


    const handleResidentClick = (role: string, id: string) => {
        if (role === 'Member') {
            navigate(`/resident/${id}`);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-6 py-3 border-b border-border flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white tracking-tight">My Profile</h1>
                <button
                    onClick={() => navigate('/billing')}
                    className="group flex items-center gap-2 px-5 py-2 rounded-md
             bg-primary/10 border border-primary/20 text-primary
             hover:bg-primary/20 transition-all shadow-sm"
                >

                    <span className="text-sm font-semibold">
                        Billing
                    </span>
                </button>

            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                <section className="bg-surface border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-background border-2 border-border flex items-center justify-center mb-4 relative z-10">
                            <User className="w-10 h-10 text-textSecondary" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1 relative z-10">{profileData.name}</h2>
                        <p className="text-sm text-primary font-medium mb-3 relative z-10">{profileData.role}</p>

                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20 relative z-10">
                            {profileData.status} Access
                        </span>
                    </div>

                    <div className="h-px bg-border my-6 relative z-10"></div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-textSecondary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-textSecondary">Unit Address</p>
                                <p className="text-sm text-white font-medium">{profileData.unit}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shrink-0">
                                <Phone className="w-4 h-4 text-textSecondary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-textSecondary">Phone Number</p>
                                <p className="text-sm text-white font-medium">{profileData.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shrink-0">
                                <Mail className="w-4 h-4 text-textSecondary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-textSecondary">Email Address</p>
                                <p className="text-sm text-white font-medium">{profileData.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                </section>

                <section className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-5">
                        <CreditCard className="w-4 h-4 text-primary" /> My Assets
                    </h3>

                    <div className="space-y-5">
                        <div>
                            <p className="text-xs font-semibold text-textSecondary mb-3">Vehicles ({profileData.assets.vehicles.length})</p>
                            <div className="space-y-2">
                                {profileData.assets.vehicles.map((v, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-background border border-border rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                                                <Car className="w-4 h-4 text-textSecondary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white uppercase">{v.plate}</p>
                                                <p className="text-[10px] text-textSecondary uppercase">{v.type}</p>
                                            </div>
                                        </div>
                                        {v.uhf !== '-' && (
                                            <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                                {v.uhf}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-border/50"></div>

                        <div>
                            <p className="text-xs font-semibold text-textSecondary mb-3">RFID Cards ({profileData.assets.rfids.length})</p>
                            <div className="flex flex-wrap gap-2">
                                {profileData.assets.rfids.map((rfid, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-white font-mono flex items-center gap-2">
                                        <CreditCard className="w-3 h-3 text-textSecondary" />
                                        {rfid}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" /> Members
                        </h3>
                        <span className="text-xs bg-surfaceHover px-2 py-1 rounded-md text-textSecondary font-bold">
                            {profileData.members.length}
                        </span>
                    </div>
                    <div className="space-y-3">
                        {profileData.members.map((resident) => {
                            const isClickable = resident.relation === 'Member';
                            return (
                                <div
                                    key={resident.id}
                                    onClick={() => handleResidentClick(resident.relation, resident.id)}
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
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${resident.relation === 'Owner'
                                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                    }`}>
                                                    {resident.relation}
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

                <section className="pt-4 pb-6">
                    <button
                        onClick={handleLogout}
                        className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </section>

            </main>
        </div>
    );
}