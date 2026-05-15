import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, ClipboardList, User, MessageCircleWarning, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CustomerMobileLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/home' },
        { id: 'guest', label: 'Guest', icon: Users, path: '/guest' },
        { id: 'log', label: 'Log', icon: ClipboardList, path: '/log' },
        { id: 'emergency', label: 'Emergency', icon: AlertTriangle, path: '/emergency' },
        { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    ];

    return (
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-background">
            <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
                <Outlet />
            </main>
            <nav className="absolute bottom-0 w-full h-16 bg-surface/95 backdrop-blur-md border-t border-border flex items-center justify-around px-2 z-50">
                {navItems.map((item) => {
                    const isActive = location.pathname.includes(item.path);
                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className="flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors"
                        >
                            <item.icon
                                className={cn(
                                    "w-6 h-6 transition-all duration-300",
                                    isActive ? "text-primary scale-110" : "text-textSecondary"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-[10px] font-medium transition-colors",
                                    isActive ? "text-primary" : "text-textSecondary"
                                )}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

        </div>
    );
}