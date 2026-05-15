import { HeaderUser } from '@/components/layout/HeaderUser';
import { User, Bell, Home as HomeIcon, Maximize, Car, CreditCard, ChevronRight, ShieldAlert, XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import _ from 'lodash';




export function Home() {
    const navigate = useNavigate();
    const [showPanicModal, setShowPanicModal] = useState(false);
    const [isPanicTriggered, setIsPanicTriggered] = useState(false);
    const [pendingApprovals, setPendingApprovals] = useState([
        {
            id: 'REQ-9921',
            name: 'Bpk. Supriyanto',
            role: 'Kurir Paket',
            location: 'Main Gate',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100&q=80'
        },
    ]);
    const [actionRequest, setActionRequest] = useState<{ id: string, name: string } | null>(null);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [approveDuration, setApproveDuration] = useState('1 hour');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const unitData = {
        unit_id: 'UID-001',
        address: 'Blok A 01',
        land: 120,
        building: 90,
        status: 'Occupied'
    };

    const durationOptions = [
        { value: '1 hour', label: '1 hour' },
        { value: '3 hours', label: '3 hours' },
        { value: '6 hours', label: '6 hours' },
        { value: '12 hours', label: '12 hours' },
        { value: '24 hours', label: '24 hours' },
    ];

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
            setPendingApprovals(prev => prev.filter(req => req.id !== actionRequest.id));
            alert(`Access granted for ${actionRequest.name}. Duration: ${approveDuration}. Gate opened.`);
            setShowApproveModal(false);
            setActionRequest(null);
        }
    };

    const confirmReject = () => {
        if (actionRequest) {
            setPendingApprovals(prev => prev.filter(req => req.id !== actionRequest.id));
            console.log(`Rejected ${actionRequest.name}. Reason: ${rejectReason || 'No reason provided'}`);
            setShowRejectModal(false);
            setActionRequest(null);
        }
    };

    const handlePanicClick = () => {
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        setShowPanicModal(true);
    };
    const handleConfirmPanic = () => {
        setShowPanicModal(false);
        setIsPanicTriggered(true);

        setTimeout(() => {
            alert("SOS SENT! Security officers are on their way to your unit (Block A 01).");
            setIsPanicTriggered(false);
        }, 2000);
    };


    return (
        <>
            {isPanicTriggered && (
                <div className="fixed inset-0 z-[100] bg-red-600/30 animate-pulse pointer-events-none transition-all duration-300" />
            )}
            <div className="p-6 space-y-8">
                <HeaderUser />
                {pendingApprovals.length > 0 && (
                    <section className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4">
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
                <section className="space-y-3">
                    <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">PANIC BUTTON</h3>
                    <div className="flex items center justify-center cursor-pointer">
                        <button
                            onClick={handlePanicClick}
                            className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center group"
                        >
                            <div className="absolute inset-0 rounded-full bg-red-600/50 blur-2xl group-hover:bg-red-500/70 transition-all duration-300" />
                            <div className="absolute inset-0 rounded-full bg-red-700 border-4 border-red-900 shadow-inner group-active:scale-95 transition-all" />
                            <AlertTriangle className="relative w-10 h-10 text-white group-hover:animate-bounce" />
                            <span className="relative text-xl font-bold text-white uppercase mt-1">SOS</span>
                        </button>
                    </div>

                </section>
                {showPanicModal && (
                    <Modal
                        isOpen={!!showPanicModal}
                        onClose={() => setShowPanicModal(false)}
                        title="EMERGENCY"
                        width="md"
                        footer={
                            <div className="flex gap-3 justify-end w-full">
                                <button
                                    onClick={() => setShowPanicModal(false)}
                                    className="flex-[0.5] py-3.5 bg-background border border-border text-gray-300 font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleConfirmPanic}
                                    className="flex-[1.2] py-3.5 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/30 text-white font-bold rounded-xl transition-all text-sm"
                                >
                                    Send SOS
                                </button>
                            </div>
                        }
                    >
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center animate-pulse">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white">SOS Confirmation</h3>
                            <p className="text-sm text-textSecondary">
                                Are you sure you want to send an SOS to security? Don't use this feature for playful purposes.
                            </p>
                        </div>
                    </Modal>

                )
                }
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
            </div >

        </>
    );
}