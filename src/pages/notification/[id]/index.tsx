import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    Home,
    Info,
    Users,
    MapPin,
    CheckCircle2,
    XCircle,
    ShieldAlert,
    CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import _ from 'lodash';

export function NotificationDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [actionStatus, setActionStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
    const [actionRequest, setActionRequest] = useState<{ id: string, name: string } | null>(null);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [approveDuration, setApproveDuration] = useState('1 hour');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const durationOptions = [
        { value: '1 hour', label: '1 hour' },
        { value: '3 hours', label: '3 hours' },
        { value: '6 hours', label: '6 hours' },
        { value: '12 hours', label: '12 hours' },
        { value: '24 hours', label: '24 hours' },
    ];

    const requestData = {
        id: id || 'REQ-9921',
        guestName: 'Bpk. Supriyanto',
        gate: 'Main Gate (Pos 1)',
        date: '13-05-2026',
        time: '15:45',
        destination: 'Blok A 01 (Alice Cooper)',
        purpose: 'Kurir Paket / Pengiriman',
        guestsCount: 1,
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300&q=80',
        guardName: 'Security - Bpk. Ahmad'
    };

    const handleApprove = () => {
        if (confirm('Izinkan tamu ini masuk? Gate akan otomatis terbuka.')) {
            setActionStatus('APPROVED');
            setTimeout(() => navigate('/home'), 2000);
        }
    };

    const handleReject = () => {
        if (confirm('Tolak tamu ini? Satpam akan diinformasikan.')) {
            setActionStatus('REJECTED');
            setTimeout(() => navigate('/home'), 2000);
        }
    };

    const handleQuickApprove = (id: string, name: string) => {
        setActionRequest({ id, name });
        setApproveDuration('1 Hour');
        setShowApproveModal(true);
    };

    const handleQuickReject = (id: string, name: string) => {
        setActionRequest({ id, name });
        setRejectReason('');
        setShowRejectModal(true);
    };

    const confirmApprove = () => {
        if (actionRequest) {
            alert(`Access granted for ${actionRequest.name}. Duration: ${approveDuration}. Gate opened.`);
            setShowApproveModal(false);
            setActionRequest(null);
            setActionStatus('APPROVED');
            setTimeout(() => navigate('/home'), 2000);
        }
    };

    const confirmReject = () => {
        if (actionRequest) {
            // setPendingApprovals(prev => prev.filter(req => req.id !== actionRequest.id));
            console.log(`Rejected ${actionRequest.name}. Reason: ${rejectReason || 'No reason provided'}`);
            setShowRejectModal(false);
            setActionRequest(null);
            setActionStatus('REJECTED');
            setTimeout(() => navigate('/home'), 2000);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-black h-full">
            <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">

                <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-4 flex items-center border-b border-border shrink-0">
                    <button
                        onClick={() => navigate('/notification')}
                        className="p-2 -ml-2 rounded-full hover:bg-surface text-textSecondary hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="ml-2 font-semibold text-white">Approval</h1>
                </header>

                <main className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide pb-28">
                    {actionStatus === 'PENDING' ? (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-blue-500 shrink-0" />
                            <p className="text-xs text-blue-100 leading-relaxed">
                                Security officer {requestData.guardName} is requesting your approval to allow this guest to enter the residential area.
                            </p>
                        </div>
                    ) : (
                        <div className={cn(
                            "rounded-xl p-4 flex items-center gap-3",
                            actionStatus === 'APPROVED' ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
                        )}>
                            {actionStatus === 'APPROVED' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                            <p className={cn(
                                "text-sm font-bold",
                                actionStatus === 'APPROVED' ? "text-green-500" : "text-red-500"
                            )}>
                                Request Has Been {actionStatus === 'APPROVED' ? 'Approved' : 'Rejected'}
                            </p>
                        </div>
                    )}

                    <section className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-white">
                                    {requestData.guestName}
                                </h2>

                                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase border bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                    Waiting
                                </span>
                            </div>

                            <div className="flex items-center text-xs text-textSecondary space-x-3">
                                <span className="flex items-center"><CalendarDays className="w-3.5 h-3.5 mr-1" /> {requestData.date}</span>
                                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {requestData.gate}</span>
                                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {requestData.time}</span>
                            </div>
                        </div>
                    </section>
                    <section className="flex justify-center my-6">
                        <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                            <img
                                src={requestData.photoUrl}
                                alt="Foto Tamu"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-2 text-center">
                                <p className="text-[9px] text-white/80 font-mono tracking-widest">{requestData.date} {requestData.time}</p>
                                <p className="text-[9px] text-white/80 font-mono tracking-widest uppercase">{requestData.gate}</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <div className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-xs text-textSecondary mb-1">Destination Unit</p>
                            <p className="text-sm font-medium text-white flex items-center mt-1">
                                <Home className="w-4 h-4 mr-2 text-primary" /> {requestData.destination}
                            </p>
                        </div>

                        <div className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-xs text-textSecondary mb-1">Reported Purpose</p>
                            <p className="text-sm font-medium text-white flex items-center mt-1">
                                <Info className="w-4 h-4 mr-2 text-primary" /> {requestData.purpose}
                            </p>
                        </div>

                        <div className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-xs text-textSecondary mb-1">Number of Guests</p>
                            <p className="text-sm font-medium text-white flex items-center mt-1">
                                <Users className="w-4 h-4 mr-2 text-primary" /> {requestData.guestsCount} Person
                            </p>
                        </div>
                    </section>

                </main>

                {actionStatus === 'PENDING' && (
                    <div className="absolute bottom-0 w-full p-4 bg-background/95 border-t border-border backdrop-blur-md flex items-center gap-3 shrink-0 z-20">
                        <button
                            onClick={() => handleQuickReject(requestData.id, requestData.guestName)}
                            className="flex-1 py-3.5 bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500/10 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            Reject
                        </button>

                        <button
                            onClick={() => handleQuickApprove(requestData.id, requestData.guestName)}
                            className="flex-1 py-3.5 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(0,230,118,0.15)] flex items-center justify-center gap-2"
                        >
                            Approve
                        </button>
                    </div>
                )}
            </div>
            {showApproveModal && (
                    <Modal
                        isOpen={showApproveModal}
                        onClose={() => setShowApproveModal(false)}
                        title="Approve Guest"
                        width="md"
                        footer={
                            <div className="flex gap-3 justify-end w-full mt-4">
                                <button
                                    onClick={() => setShowApproveModal(false)}
                                    className="flex-[0.5] py-3.5 bg-background border border-border text-gray-300 font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmApprove}
                                    className="flex-[1.2] py-3.5 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(0,230,118,0.15)]"
                                >
                                    Confirm Approve
                                </button>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            <p className="text-sm text-textSecondary">
                                Please select the allowed visit duration for <strong>{actionRequest?.name}</strong>.
                            </p>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-textSecondary">Duration</label>
                                <input type="hidden" name="duration" value={approveDuration} />
                                <Select
                                    options={durationOptions}
                                    value={_.find(durationOptions, { value: approveDuration })}
                                    placeholder="Select duration"
                                    onValueChange={(option: any) => {
                                        setApproveDuration(option?.value || '1 hour');
                                    }}
                                />
                            </div>
                        </div>
                    </Modal>
                )}

                {showRejectModal && (
                    <Modal
                        isOpen={showRejectModal}
                        onClose={() => setShowRejectModal(false)}
                        title="Reject Guest"
                        width="md"
                        footer={
                            <div className="flex gap-3 justify-end w-full mt-4">
                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    className="flex-[0.5] py-3.5 bg-background border border-border text-gray-300 font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmReject}
                                    className="flex-[1.2] py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all text-sm"
                                >
                                    Confirm Reject
                                </button>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            <p className="text-sm text-textSecondary">
                                Are you sure you want to deny access for <strong>{actionRequest?.name}</strong>?
                            </p>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-textSecondary">Reason <span className="text-textSecondary/50 font-normal">(Optional)</span></label>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="e.g. No guests are expected today"
                                    className="block w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-500 transition-colors text-sm min-h-[100px] resize-none"
                                />
                            </div>
                        </div>
                    </Modal>
                )}
        </div>
    );
}