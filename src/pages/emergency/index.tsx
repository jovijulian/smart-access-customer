import { useState } from 'react';
import { CalendarDays, Clock, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Report {
    id: string;
    category: string;
    status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
    date: string;
    time: string;
    thumbnail: string; 
}

export function Emergency() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [reports] = useState<Report[]>([
        {
            id: 'REP-2041',
            category: 'Infrastructure',
            status: 'Pending',
            date: '14-05-2026',
            time: '19:30',
            thumbnail:
            'https://images.unsplash.com/photo-1628091057387-f2d6fae1c1cf?w=150&h=150&fit=crop&auto=crop',
        },
        {
            id: 'REP-2042',
            category: 'Disturbance',
            status: 'Resolved',
            date: '13-05-2026',
            time: '16:45',
            thumbnail:
                'https://plus.unsplash.com/premium_photo-1663047046063-7c10d323ebe9?w=150&h=150&fit=crop&auto=crop',
        },
        {
            id: 'REP-2043',
            category: 'Cleanliness',
            status: 'In Progress',
            date: '15-05-2026',
            time: '08:00',
            thumbnail:
                'https://images.unsplash.com/photo-1670108948068-ed86cc96393f?w=150&h=150&fit=crop&auto=crop',
        },
        {
            id: 'REP-2044',
            category: 'Security',
            status: 'Rejected',
            date: '10-05-2026',
            time: '23:10',
            thumbnail:
                'https://images.unsplash.com/photo-1507721261392-a144f7c34077?w=150&h=150&fit=crop&auto=crop',
        }
    ]);

    const getStatusColor = (status: Report['status']) => {
        switch (status) {
            case 'Resolved':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'In Progress':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Pending':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Rejected':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            default:
                return 'bg-surface border-border text-white';
        }
    };

    const filteredReports = reports.filter(r =>
        r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col bg-background h-full">
            <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Emergency Reports</h1>
                </div>

                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search report.."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
            </header>

            <section className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
                {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <div
                            key={report.id}
                            onClick={() => navigate(`/emergency/${report.id}`)}
                            className="bg-surface border border-border rounded-2xl p-4 flex gap-4 shadow-sm hover:border-primary/30 transition-colors cursor-pointer"
                        >
                            <img 
                                src={report.thumbnail} 
                                alt={report.category} 
                                className="w-16 h-16 rounded-xl object-cover bg-background/50 border border-white/5 shrink-0"
                            />
                            
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-base font-bold text-white leading-tight">{report.category}</h3>
                                        <p className="text-xs text-textSecondary font-mono mt-0.5">{report.id}</p>
                                    </div>
                                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border whitespace-nowrap", getStatusColor(report.status))}>
                                        {report.status}
                                    </span>
                                </div>
                                
                                <div className="flex gap-4 text-xs text-textSecondary mt-1">
                                    <span className="flex items-center"><CalendarDays className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {report.date}</span>
                                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {report.time}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-textSecondary text-sm">No report data found.</p>
                    </div>
                )}
            </section>
            
            <button
                onClick={() => navigate('/emergency/create')}
                className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center active:scale-90 transition-transform z-50"
            >
                <Plus className="w-7 h-7" strokeWidth={2.5} />
            </button>
        </div>
    );
}