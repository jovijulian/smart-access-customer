import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, CalendarDays, Clock, Users, Info, Hourglass, Download } from 'lucide-react';
import { HeaderBack } from '@/components/layout/HeaderBack';
import { Select } from '@/components/ui/Select';
import _, { set } from "lodash";

export function CreateGuest() {
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [generatedVisitor, setGeneratedVisitor] = useState<any>(null);

    const todayLocal = new Date();
    const year = todayLocal.getFullYear();
    const month = String(todayLocal.getMonth() + 1).padStart(2, '0');
    const day = String(todayLocal.getDate()).padStart(2, '0');
    const hours = String(todayLocal.getHours()).padStart(2, '0');
    const minutes = String(todayLocal.getMinutes()).padStart(2, '0');
    const todayDateStr = `${year}-${month}-${day}`;
    const currentTimeStr = `${hours}:${minutes}`;
    const [selectedDuration, setSelectedDuration] = useState('1 hour');
    const [formDate, setFormDate] = useState(todayDateStr);

    const durationOptions = [
        { value: '1 hour', label: '1 hour' },
        { value: '3 hours', label: '3 hours' },
        { value: '6 hours', label: '6 hours' },
        { value: '12 hours', label: '12 hours' },
        { value: '24 hours', label: '24 hours' },
    ];
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const newVisitor = {
            id: `V-${Math.floor(Math.random() * 9000) + 1000}`,
            name: formData.get('visitorName'),
            purpose: formData.get('purpose'),
            guestsCount: formData.get('guests'),
            date: formData.get('date'),
            time: formData.get('time'),
            duration: formData.get('duration'),
            status: 'Created'
        };

        setGeneratedVisitor(newVisitor);
        setStep('success');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Smart Access Guest Pass',
                text: `Here is your access pass for visiting ${generatedVisitor?.name}`,
                url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedVisitor?.id)}`,
            }).catch(console.error);
        } else {
            alert("Web Share API is not supported in your browser.");
        }
    };

    const handleDownload = async () => {
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedVisitor.id)}`;

            const response = await fetch(url);
            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `QR-${generatedVisitor.id}.png`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    }

    if (step === 'success' && generatedVisitor) {
        return (
            <div className="flex-1 flex flex-col bg-black h-full">
                <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">
                    <HeaderBack title="Pass Generated" />
                    <section className="flex-1 flex flex-col items-center p-6 space-y-8 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-64 h-64 bg-white p-4 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(0,230,118,0.2)] mt-8">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedVisitor.id)}`}
                                alt="QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-white">Pass Ready to Share</h2>
                            <p className="text-textSecondary text-sm max-w-xs mx-auto">
                                Your guest can use this QR code to access the main gate automatically.
                            </p>
                        </div>

                        <div className="w-full bg-surface border border-border rounded-2xl p-4 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-textSecondary flex items-center"><CalendarDays className="w-3 h-3 mr-1" /> Date</p>
                                <p className="text-sm font-semibold text-white">{generatedVisitor.date}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-textSecondary flex items-center"><Clock className="w-3 h-3 mr-1" /> Time</p>
                                <p className="text-sm font-semibold text-white">{generatedVisitor.time}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-textSecondary flex items-center"><Users className="w-3 h-3 mr-1" /> Guests</p>
                                <p className="text-sm font-semibold text-white">{generatedVisitor.guestsCount} People</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-textSecondary flex items-center"><Hourglass className="w-3 h-3 mr-1" /> Valid For</p>
                                <p className="text-sm font-semibold text-white">{generatedVisitor.duration}</p>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4 mt-auto pt-4 pb-6">
                            <button
                                onClick={handleDownload}
                                className="p-5 rounded-xl bg-surface border border-white text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                                <Download className="w-5 h-5" />Download
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                                <Share2 className="w-5 h-5" /> Share
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-black h-full">
            <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">
                <HeaderBack title="Create Guest Pass" />
                <section className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                    <form id="create-guest-form" onSubmit={handleSubmit} className="space-y-5 pb-28">
                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3 items-start">
                            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-primary/90 leading-relaxed">
                                This pass is for scheduled visitors. They will receive a QR code valid for the duration you specify.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Visitor Name</label>
                                <input
                                    required
                                    name="visitorName"
                                    type="text"
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-base"
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Purpose of Visit</label>
                                <input
                                    required
                                    name="purpose"
                                    type="text"
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-base"
                                    placeholder="e.g. Family Visit, Delivery"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Number of Guests</label>
                                <input
                                    required
                                    name="guests"
                                    type="number"
                                    min="1"
                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-base"
                                    placeholder="1"
                                    defaultValue="1"
                                />
                            </div>


                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2 flex flex-col">
                                    <label className="block text-sm font-medium text-textSecondary">Date</label>
                                    <input
                                        required
                                        name="date"
                                        type="date"
                                        min={todayDateStr}
                                        value={formDate}
                                        onChange={(e) => setFormDate(e.target.value)}
                                        className="block w-full appearance-none bg-surface border border-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-base [color-scheme:dark]"
                                    />
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label className="block text-sm font-medium text-textSecondary">Time</label>
                                    <input
                                        required
                                        name="time"
                                        type="time"
                                        min={formDate === todayDateStr ? currentTimeStr : undefined}
                                        className="block w-full appearance-none bg-surface border border-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-base [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Duration</label>
                                <input type="hidden" name="duration" value={selectedDuration} />
                                <Select
                                    options={durationOptions}
                                    value={_.find(durationOptions, { value: selectedDuration })}
                                    placeholder="Select duration"
                                    onValueChange={(selectedOption: any) => {
                                        if (selectedOption) {
                                            setSelectedDuration(selectedOption.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </section>

                {step === 'form' && (
                    <div className="absolute bottom-0 w-full p-4 bg-background/95 border-t border-border backdrop-blur-md shrink-0">
                        <button
                            type="submit"
                            form="create-guest-form"
                            className="w-full py-4 bg-primary hover:bg-primary/90 text-black font-bold text-lg rounded-xl transition-colors shadow-[0_0_20px_rgba(0,230,118,0.15)]"
                        >
                            Generate QR Pass
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}