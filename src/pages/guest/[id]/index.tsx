import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    Hourglass,
    Home,
    Info,
    Users,
    Download,
    Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderBack } from '@/components/layout/HeaderBack';

export function GuestDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const guest = {
        id: id || 'V-1024',
        name: 'James Wilson',
        status: 'Entered',
        date: '13-05-2026',
        time: '14:20',
        duration: '12 hours',
        destination: 'Blok A 01 (Alice Cooper)',
        purpose: 'Family Visit',
        guestsCount: 2,
        activities: [
            { status: 'Created', datetime: '13-05-2026 • 12:00' },
            { status: 'Entered', datetime: '13-05-2026 • 14:20' }
        ]
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Entered':
            case 'Extend':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Created':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Revoked':
            case 'Overstay':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Exit':
            case 'Expired':
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            default:
                return 'bg-surface border-border text-white';
        }
    };

    const handleExtend = () => {
        if(confirm('Would you like to extend this guest access?')) {
            alert('Guest access successfully extended!');
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Smart Access Guest Pass',
                text: `Here is your access pass for visiting ${guest?.name}`,
                url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(guest?.id)}`,
            }).catch(console.error);
        } else {
            alert("Web Share API is not supported in your browser.");
        }
    };

    const handleDownload = async () => {
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(guest.id)}`;

            const response = await fetch(url);
            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `QR-${guest.id}.png`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    }

    return (
        <div className="flex-1 flex flex-col bg-black h-full">
            <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">
                <HeaderBack title="Visitor Log Detail" />
                <main className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide pb-28">
                    <section className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">{guest.name}</h2>
                            <div className="flex items-center text-xs text-textSecondary space-x-3">
                                <span className="flex items-center"><CalendarDays className="w-3.5 h-3.5 mr-1" /> {guest.date}</span>
                                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {guest.time}</span>
                                <span className="flex items-center"><Hourglass className="w-3.5 h-3.5 mr-1" /> {guest.duration}</span>
                            </div>
                        </div>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase border", getStatusColor(guest.status))}>
                            {guest.status}
                        </span>
                    </section>

                    <section className="flex justify-center my-6">
                        <div className={cn(
                            "w-64 h-64 bg-white p-3 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all",
                            guest.status !== 'Created' && "opacity-60 grayscale"
                        )}>
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(guest.id)}`}
                                alt="QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </section>

                    <section className="space-y-3">
                        <div className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-xs text-textSecondary mb-1">Destination</p>
                            <p className="text-sm font-medium text-white flex items-center mt-1">
                                <Home className="w-4 h-4 mr-2 text-primary" /> {guest.destination}
                            </p>
                        </div>

                        <div className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-xs text-textSecondary mb-1">Purpose of Visit</p>
                            <p className="text-sm font-medium text-white flex items-center mt-1">
                                <Info className="w-4 h-4 mr-2 text-primary" /> {guest.purpose}
                            </p>
                        </div>

                        <div className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-xs text-textSecondary mb-1">Number of Guests</p>
                            <p className="text-sm font-medium text-white flex items-center mt-1">
                                <Users className="w-4 h-4 mr-2 text-primary" /> {guest.guestsCount} Guests
                            </p>
                        </div>
                    </section>

                    <div className="h-px bg-border my-6"></div>

                    <section>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Activity Log</h3>
                        <div className="space-y-4 pl-2">
                            {guest.activities.map((act, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    {idx !== guest.activities.length - 1 && (
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
                {guest.status === 'Entered' && (
                    <div className="absolute bottom-0 w-full p-4 bg-background/95 border-t border-border backdrop-blur-md flex items-center gap-3 shrink-0 z-20">
                        <button 
                            onClick={handleExtend}
                            className="flex-1 py-3.5 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(0,230,118,0.15)] flex items-center justify-center gap-2"
                        >
                            Extend
                        </button>

                        <button 
                            title="Download QR"
                            onClick={handleDownload}
                            className="p-3.5 bg-surface border border-border rounded-xl text-white hover:bg-surfaceHover transition-colors flex items-center justify-center shrink-0"
                        >
                            <Download className="w-5 h-5" />
                        </button>

                        <button 
                            title="Share QR"
                            onClick={handleShare}
                            className="p-3.5 bg-surface border border-border rounded-xl text-white hover:bg-surfaceHover transition-colors flex items-center justify-center shrink-0"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}