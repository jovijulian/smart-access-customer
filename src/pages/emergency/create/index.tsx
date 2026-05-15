import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CalendarDays,
    Clock,
    Info,
    MapPin,
    AlignLeft,
    Image as ImageIcon,
    X,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { HeaderBack } from '@/components/layout/HeaderBack';
import { Select } from '@/components/ui/Select';
import _ from "lodash";

export function CreateReport() {
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [generatedReport, setGeneratedReport] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState('Infrastructure');
    const [attachments, setAttachments] = useState<string[]>([
        'https://images.unsplash.com/photo-1628091057387-f2d6fae1c1cf?w=150&h=150&fit=crop&auto=crop'
    ]);

    const categoryOptions = [
        { value: 'Infrastructure', label: 'Infrastructure' },
        { value: 'Security', label: 'Security' },
        { value: 'Cleanliness', label: 'Cleanliness' },
        { value: 'Disturbance', label: 'Disturbance' },
        { value: 'Others', label: 'Others' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const now = new Date();
        const reportId = `REP-${Math.floor(Math.random() * 9000) + 1000}`;

        const newReport = {
            id: reportId,
            category: selectedCategory,
            description: formData.get('description'),
            location: formData.get('location'),
            date: now.toLocaleDateString('en-GB').replace(/\//g, '-'),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            status: 'Pending'
        };

        setGeneratedReport(newReport);
        setStep('success');
    };

    if (step === 'success' && generatedReport) {
        return (
            <div className="flex-1 flex flex-col bg-black h-full">
                <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">
                    <HeaderBack title="Report Submitted" />

                    <section className="flex-1 flex flex-col items-center p-6 space-y-8 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mt-12">
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>

                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-white">Report Received</h2>
                            <p className="text-textSecondary text-sm max-w-xs mx-auto leading-relaxed">
                                Your report <span className="text-white font-mono">{generatedReport.id}</span> has been submitted. Our team will review and update you soon.
                            </p>
                        </div>

                        <div className="w-full bg-surface border border-border rounded-2xl p-5 space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-border/50">
                                <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Category</p>
                                <p className="text-sm font-bold text-primary">{generatedReport.category}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-1">
                                <div className="space-y-1">
                                    <p className="text-xs text-textSecondary flex items-center gap-1.5"><CalendarDays className="w-3 h-3" /> Date</p>
                                    <p className="text-sm font-semibold text-white">{generatedReport.date}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-textSecondary flex items-center gap-1.5"><Clock className="w-3 h-3" /> Time</p>
                                    <p className="text-sm font-semibold text-white">{generatedReport.time}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-auto pb-6">
                            <button
                                onClick={() => navigate('/emergency')}
                                className="w-full p-4 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                            >
                                Back to My Reports <ArrowRight className="w-4 h-4" />
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
                <HeaderBack title="Create Emergency Report" />

                <section className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                    <form id="create-report-form" onSubmit={handleSubmit} className="space-y-5 pb-28">
                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3 items-start">
                            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-primary/90 leading-relaxed">
                                Please provide clear information and photos to help us process your report faster.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Report Category</label>
                                <Select
                                    options={categoryOptions}
                                    value={_.find(categoryOptions, { value: selectedCategory })}
                                    placeholder="Select category"
                                    onValueChange={(selectedOption: any) => {
                                        if (selectedOption) setSelectedCategory(selectedOption.value);
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-textSecondary">Issue Description</label>
                                <div className="relative">
                                    <AlignLeft className="absolute left-4 top-3.5 w-5 h-5 text-textSecondary opacity-50" />
                                    <textarea
                                        required
                                        name="description"
                                        className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-base min-h-[120px] resize-none"
                                        placeholder="Tell us what happened..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-textSecondary">Photo Evidence</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {attachments.map((url, i) => (
                                        <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border relative">
                                            <img src={url} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setAttachments([])}
                                                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-textSecondary hover:text-primary hover:border-primary transition-colors"
                                    >
                                        <ImageIcon className="w-6 h-6" />
                                        <span className="text-[10px] font-bold">Add Photo</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>

                <div className="absolute bottom-0 w-full p-4 bg-background/95 border-t border-border backdrop-blur-md shrink-0 z-20">
                    <button
                        type="submit"
                        form="create-report-form"
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-black font-bold text-lg rounded-xl transition-colors shadow-[0_0_20px_rgba(0,230,118,0.15)] active:scale-[0.98]"
                    >
                        Submit Report
                    </button>
                </div>
            </div>
        </div>
    );
}