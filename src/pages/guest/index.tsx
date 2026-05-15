import { useState } from 'react';
import {
    Users,
    CalendarDays,
    Clock,
    Info,
    Plus,
    MoreVertical,
    Search,
    Hourglass
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Visitor {
    id: string;
    name: string;
    guestsCount: number;
    status: 'Created' | 'Entered' | 'Exit' | 'Expired' | 'Extend' | 'Overstay' | 'Revoked';
    date: string;
    time: string;
    purpose: string;
    duration?: string;
}

export function Guest() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [visitors, setVisitors] = useState<Visitor[]>([
        {
            id: 'V-1024',
            name: 'James Wilson',
            guestsCount: 2,
            status: 'Entered',
            date: '2026-05-13',
            time: '14:20',
            purpose: 'Family Visit',
            duration: '3 hours'
        },
        {
            id: 'V-1025',
            name: 'Delivery (Amazon)',
            guestsCount: 1,
            status: 'Revoked',
            date: '2026-05-13',
            time: '13:15',
            purpose: 'Package Delivery',
            duration: '1 hours'
        },
        {
            id: 'V-1026',
            name: 'Contractor',
            guestsCount: 3,
            status: 'Created',
            date: '2026-05-14',
            time: '15:00',
            purpose: 'Renovation Work',
            duration: '1 hours'
        },
        {
            id: 'V-1027',
            name: 'Charlie Davis',
            guestsCount: 1,
            status: 'Exit',
            date: '2026-05-12',
            time: '10:00',
            purpose: 'Meeting',
            duration: '6 hours'
        },
        {
            id: 'V-1028',
            name: 'Diana Prince',
            guestsCount: 4,
            status: 'Overstay',
            date: '2026-05-11',
            time: '09:00',
            purpose: 'Family Visit',
            duration: '12 hours'
        }
    ]);

    const getStatusColor = (status: Visitor['status']) => {
        switch (status) {
            case 'Entered':
            case 'Extend':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Created':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Overstay':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Exit':
            case 'Expired':
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            case 'Revoked':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            default:
                return 'bg-surface border-border text-white';
        }
    };

    const handleExtend = (id: string) => {
        if (confirm('Would you like to extend this guest access?')) {
            setVisitors(prev => prev.map(v =>
                v.id === id ? { ...v, status: 'Extend' } : v
            ));
            alert('Guest access successfully extended!');
        }
    };

    const filteredVisitors = visitors.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col bg-background h-full">
            <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white tracking-tight">My Guest</h1>
                </div>

                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search for name or purpose..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
            </header>

            <section className="flex-1 p-4 space-y-4 overflow-y-auto">
                {filteredVisitors.length > 0 ? (
                    filteredVisitors.map((visitor) => (
                        <div
                            key={visitor.id}
                            onClick={() => navigate(`/guest/${visitor.id}`)}
                            className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-base font-bold text-white">{visitor.name}</h3>
                                    <p className="text-xs text-textSecondary font-mono mt-0.5">{visitor.id}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border", getStatusColor(visitor.status))}>
                                        {visitor.status}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-y-2 mt-1">
                                <div className="flex items-center text-sm text-textSecondary">
                                    <CalendarDays className="w-4 h-4 mr-2 opacity-70" />
                                    {visitor.date}
                                </div>

                                <div className="flex items-center text-sm text-textSecondary">
                                    <Clock className="w-4 h-4 mr-2 opacity-70" />
                                    {visitor.time}
                                </div>
                                <div className="flex items-center text-sm text-textSecondary">
                                    <Users className="w-4 h-4 mr-2 opacity-70" />
                                    {visitor.guestsCount} People
                                </div>
                                <div className="flex items-center text-sm text-textSecondary">
                                    <Hourglass className="w-4 h-4 mr-2 opacity-70" />
                                    <span className="truncate">{visitor.duration}</span>
                                </div>

                            </div>


                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-textSecondary text-sm">No guest data found.</p>
                    </div>
                )}
            </section>
            <button
                onClick={() => navigate('/guest/create')}
                className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center active:scale-90 transition-transform z-50"
                aria-label="Create Guest Pass"
            >
                <Plus className="w-7 h-7" strokeWidth={2.5} />
            </button>
        </div>
    );
}