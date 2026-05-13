import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, Bell, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderBack } from '@/components/layout/HeaderBack';

export function NotificationList() {
    const navigate = useNavigate();
    const notifications = [
        {
            id: 'NOTIF-001',
            type: 'APPROVAL_REQUEST',
            title: 'Guest Approval Pending',
            message:
                'An unregistered guest (Mr. Supriyanto) is currently waiting at the Main Gate to visit your unit.',
            time: '10 minutes ago',
            isUnread: true,
            actionId: 'REQ-9921',
        },

        {
            id: 'NOTIF-002',
            type: 'SYSTEM',
            title: 'Maintenance Fee Payment Successful',
            message:
                'Thank you. Your May 2026 maintenance fee payment of Rp 1,500,000 has been successfully received.',
            time: '2 hours ago',
            isUnread: false,
        },

        {
            id: 'NOTIF-003',
            type: 'DELIVERY',
            title: 'Package Arrived',
            message:
                'A package addressed to your unit has arrived at the lobby reception. Please collect it during operational hours.',
            time: '3 hours ago',
            isUnread: true,
        },
        {
            id: 'NOTIF-004',
            type: 'SECURITY',
            title: 'Vehicle Access Detected',
            message:
                'Your registered vehicle B 1234 XYZ accessed Basement Gate 2 at 08:14 AM.',
            time: '5 hours ago',
            isUnread: false,
        },
        {
            id: 'NOTIF-005',
            type: 'ANNOUNCEMENT',
            title: 'Scheduled Power Maintenance',
            message:
                'Temporary power maintenance will take place on Saturday, May 16, 2026 from 10:00 AM to 01:00 PM.',
            time: 'Yesterday',
            isUnread: false,
        },
        {
            id: 'NOTIF-007',
            type: 'VISITOR',
            title: 'Visitor Check-In Completed',
            message:
                'Your invited guest, Michael Tan, has successfully checked in through the Main Lobby.',
            time: '2 days ago',
            isUnread: false,
        },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'APPROVAL_REQUEST': return <UserCheck className="w-5 h-5 text-blue-500" />;
            case 'SYSTEM': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'SECURITY': return <ShieldAlert className="w-5 h-5 text-yellow-500" />;
            default: return <Bell className="w-5 h-5 text-textSecondary" />;
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-black h-full">
            <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">
                <HeaderBack title="Notifications" url='/home'/>

                <main className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="divide-y divide-border/50">
                        {notifications.map((notif) => (
                            <div
                                key={notif.id}
                                onClick={() => notif.type === 'APPROVAL_REQUEST' ? navigate(`/notification/${notif.actionId}`) : null}
                                className={cn(
                                    "p-5 flex gap-4 transition-colors",
                                    notif.isUnread ? "bg-surface/50" : "bg-background",
                                    notif.type === 'APPROVAL_REQUEST' && "cursor-pointer hover:bg-surface"
                                )}
                            >
                                <div className="shrink-0 mt-1">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border",
                                        notif.type === 'APPROVAL_REQUEST' ? "bg-blue-500/10 border-blue-500/20" :
                                            notif.type === 'SYSTEM' ? "bg-green-500/10 border-green-500/20" :
                                                "bg-yellow-500/10 border-yellow-500/20"
                                    )}>
                                        {getIcon(notif.type)}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={cn("text-sm font-bold", notif.isUnread ? "text-white" : "text-textSecondary")}>
                                            {notif.title}
                                        </h3>
                                        {notif.isUnread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                                    </div>
                                    <p className="text-xs text-textSecondary leading-relaxed mb-2">
                                        {notif.message}
                                    </p>
                                    <p className="text-[10px] font-medium text-textSecondary/70 uppercase tracking-wider">
                                        {notif.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}