import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User } from 'lucide-react';
import { SettingsDropdown } from './SettingsDropdown';

interface HubLayoutProps {
  children: React.ReactNode;
}

export function HubLayout({ children }: HubLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
            <span className="font-bold text-white text-lg">S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-textSecondary">
            Smart Access
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-surfaceHover transition-colors text-textSecondary hover:text-white">
            <Activity className="w-5 h-5" />
          </button>
          <SettingsDropdown />
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-border hover:border-primary transition-colors overflow-hidden">
            <User className="w-5 h-5 text-textSecondary" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
