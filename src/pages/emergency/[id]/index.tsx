import { useNavigate, useParams } from 'react-router-dom';
import {
    CalendarDays,
    Clock,
    MapPin,
    Navigation,
    Paperclip,
    AlignLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderBack } from '@/components/layout/HeaderBack'; 

export function ReportDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const reportsData = [
        {
            id: 'REP-2041',
            category: 'Infrastructure',
            status: 'Pending',
            date: '14-05-2026',
            time: '19:30',
            thumbnail: 'https://images.unsplash.com/photo-1628091057387-f2d6fae1c1cf?w=150&h=150&fit=crop&auto=crop',
            description: 'Kabel pada gardu rusak. Mohon segera diperbaiki.',
            location: 'Block A, Gate 2',
            coordinates: '-6.914744, 107.609810',
            attachments: [
                'https://images.unsplash.com/photo-1628091057387-f2d6fae1c1cf?w=400&h=300&fit=crop',
            ],
            activities: [
                { status: 'Report Submitted', datetime: '14-05-2026 • 19:30' }
            ]
        },
        {
            id: 'REP-2042',
            category: 'Disturbance',
            status: 'Resolved',
            date: '13-05-2026',
            time: '16:45',
            thumbnail: 'https://plus.unsplash.com/premium_photo-1663047046063-7c10d323ebe9?w=150&h=150&fit=crop&auto=crop',
            description: 'Ada suara berisik dari tetangga yang terus-menerus dari jam 10 pagi hingga sekarang, mengganggu ketenangan warga sekitar.',
            location: 'Block B-12',
            coordinates: '-6.915000, 107.610000',
            attachments: [
                'https://plus.unsplash.com/premium_photo-1663047046063-7c10d323ebe9?w=400&h=300&fit=crop'
            ],
            activities: [
                { status: 'Report Submitted', datetime: '13-05-2026 • 16:45' },
                { status: 'Security Dispatched', datetime: '13-05-2026 • 17:00' },
                { status: 'Issue Resolved', datetime: '13-05-2026 • 17:30' }
            ]
        },
        {
            id: 'REP-2043',
            category: 'Cleanliness',
            status: 'In Progress',
            date: '15-05-2026',
            time: '08:00',
            thumbnail: 'https://images.unsplash.com/photo-1670108948068-ed86cc96393f?w=150&h=150&fit=crop&auto=crop',
            description: 'Sampah di depan rumah sudah 2 hari tidak diangkut oleh petugas, menimbulkan bau tidak sedap.',
            location: 'Block C-05',
            coordinates: '-6.916000, 107.611000',
            attachments: [
                'https://images.unsplash.com/photo-1670108948068-ed86cc96393f?w=400&h=300&fit=crop'
            ],
            activities: [
                { status: 'Report Submitted', datetime: '15-05-2026 • 08:00' },
                { status: 'In Progress (Assigned to Janitor)', datetime: '15-05-2026 • 09:30' }
            ]
        },
        {
            id: 'REP-2044',
            category: 'Security',
            status: 'Rejected',
            date: '10-05-2026',
            time: '23:10',
            thumbnail: 'https://images.unsplash.com/photo-1507721261392-a144f7c34077?w=150&h=150&fit=crop&auto=crop',
            description: 'Melihat orang mencurigakan mondar-mandir di dekat taman, tapi tidak memakai seragam.',
            location: 'Near Playground',
            coordinates: '-6.917000, 107.612000',
            attachments: [
                'https://images.unsplash.com/photo-1507721261392-a144f7c34077?w=400&h=300&fit=crop'
            ],
            activities: [
                { status: 'Report Submitted', datetime: '10-05-2026 • 23:10' },
                { status: 'Reviewed & Rejected (It was a registered technician)', datetime: '11-05-2026 • 00:15' }
            ]
        }
    ];

    const report = reportsData.find((r) => r.id === id);

    if (!report) {
        return (
            <div className="flex-1 flex flex-col bg-black h-full">
                <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl">
                    <HeaderBack title="Report Not Found" />
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-textSecondary">Report ID {id} not found.</p>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
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

    return (
        <div className="flex-1 flex flex-col bg-black h-full">
            <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">
                <HeaderBack title="Report Detail" />
                
                <main className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide pb-28">
                    <section className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">{report.category}</h2>
                            <p className="text-sm font-mono text-textSecondary mb-2">{report.id}</p>
                            <div className="flex items-center text-xs text-textSecondary space-x-4">
                                <span className="flex items-center"><CalendarDays className="w-3.5 h-3.5 mr-1.5" /> {report.date}</span>
                                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {report.time}</span>
                            </div>
                        </div>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase border", getStatusColor(report.status))}>
                            {report.status}
                        </span>
                    </section>
                    <section className="bg-surface border border-border rounded-xl p-4 space-y-2">
                        <p className="text-xs text-textSecondary flex items-center">
                            <AlignLeft className="w-3.5 h-3.5 mr-1.5" /> Description
                        </p>
                        <p className="text-sm text-white leading-relaxed">
                            {report.description}
                        </p>
                    </section>

                    <section className="space-y-3">
                        <div className="bg-surface border border-border rounded-xl p-4 overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs text-textSecondary mb-1 flex items-center">
                                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" /> Location Address
                                    </p>
                                    <p className="text-sm font-bold text-white">{report.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-textSecondary mb-1 flex items-center justify-end">
                                        <Navigation className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Coordinates
                                    </p>
                                    <p className="text-xs font-mono text-white">{report.coordinates}</p>
                                </div>
                            </div>
                            <div className="w-full h-40 rounded-lg overflow-hidden bg-background/50 border border-white/5 relative">
                                <iframe 
                                    src={`https://maps.google.com/maps?q=${report.coordinates}&z=16&output=embed`} 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Report Location Map"
                                    className="absolute inset-0"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                            <Paperclip className="w-4 h-4 mr-2" /> Attachments
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {report.attachments.map((imgUrl, index) => (
                                <div key={index} className="aspect-video rounded-xl overflow-hidden border border-border bg-surface relative group">
                                    <img 
                                        src={imgUrl} 
                                        alt={`Attachment ${index + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="h-px bg-border my-6"></div>

                    <section>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Activity Log</h3>
                        <div className="space-y-4 pl-2">
                            {report.activities.map((act, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    {idx !== report.activities.length - 1 && (
                                        <div className="absolute left-[5px] top-6 w-px h-full bg-border" />
                                    )}
                                    <div className="flex flex-col items-center z-10 mt-1.5 shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,230,118,0.5)]" />
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <p className="text-sm font-bold text-white">{act.status}</p>
                                        <p className="text-xs text-textSecondary mt-1 flex items-center">
                                            <Clock className="w-3 h-3 mr-1" /> {act.datetime}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}