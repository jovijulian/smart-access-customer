import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

export function HeaderUser({ children }: any) {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-textSecondary" />
                </div>
                <div>
                    <p className="text-sm text-textSecondary">Welcome,</p>
                    <h2 className="text-lg font-bold text-white">Alice Cooper</h2>
                </div>
            </div>
            <button className="relative p-2 rounded-full bg-surface border border-border text-textSecondary hover:text-white" onClick={() => navigate('/notification')}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background"></span>
            </button>
        </header>
    );
}
