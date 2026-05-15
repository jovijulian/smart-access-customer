import { useNavigate, useParams } from 'react-router-dom';
import { User, CreditCard, ArrowLeft, Car } from 'lucide-react';
import { HeaderBack } from '@/components/layout/HeaderBack';

export function ResidentDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const resident = {
        id: id || 'RES-002',
        name: 'Bob Cooper',
        role: 'Member',
        status: 'Active Access',
        unitAddress: 'Blok A 01',
        phone: '+62 812-9876-5432',
        email: 'bob.cooper@example.com',
        assets: {
            rfids: ['RF-123456789B'],
            vehicles: [
                {
                    plate: 'D 5678 XYZ',
                    type: 'Motorcycle',
                    uhf: 'UHF-2222'
                }
            ]
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-background min-h-full pb-8">
            <HeaderBack title="Resident Details" />
            <section className="px-4 mt-2 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-surfaceHover border border-border flex items-center justify-center mb-4">
                            <User className="w-10 h-10 text-textSecondary" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">{resident.name}</h2>
                        <p className={`font-medium text-sm mb-4 ${resident.role === 'Owner' ? 'text-primary' : 'text-blue-400'}`}>
                            {resident.role}
                        </p>

                        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
                            {resident.status}
                        </span>
                    </div>
                    <div className="h-px bg-border my-6"></div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-textSecondary">Unit Address</span>
                            <span className="text-white font-medium">{resident.unitAddress}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-textSecondary">Phone</span>
                            <span className="text-white font-medium">{resident.phone}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-textSecondary">Email</span>
                            <span className="text-white font-medium">{resident.email}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg">
                    <h3 className="flex items-center text-sm font-bold text-white tracking-widest uppercase mb-6">
                        <CreditCard className="w-5 h-5 mr-3" /> ASSETS
                    </h3>
                    <div className="mb-6">
                        <p className="text-sm text-textSecondary mb-3">
                            RFID Cards ({resident.assets.rfids.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {resident.assets.rfids.map((rfid, idx) => (
                                <div key={idx} className="px-3 py-2 border border-border rounded-lg bg-background">
                                    <span className="font-mono text-sm text-white">{rfid}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-textSecondary mb-3">
                            Vehicles ({resident.assets.vehicles.length})
                        </p>
                        {/* <div className="space-y-3">
                            {resident.assets.vehicles.map((vehicle, idx) => (
                                <div key={idx} className="flex items-center justify-between px-4 py-3 border border-border rounded-lg bg-background">
                                    <span className="font-medium text-white">{vehicle.plate}</span>
                                    <span className="text-sm text-textSecondary">{vehicle.type}</span>
                                    <span className="font-mono text-sm text-primary">{vehicle.uhf}</span>
                                </div>
                            ))}
                        </div> */}
                        <div className="space-y-3">
                            {resident.assets.vehicles.map((v, i) => (
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
                </div>
            </section>
        </div>
    );
}