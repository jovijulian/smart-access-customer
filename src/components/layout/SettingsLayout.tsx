import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, User } from 'lucide-react';
import { SettingsDropdown } from './SettingsDropdown';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background text-textPrimary">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-surfaceHover text-textSecondary hover:text-white transition-colors group"
          >
            <Grid className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">App Hub</span>
          </button>
          <div className="h-4 w-px bg-border"></div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold px-2.5 py-1 rounded-md bg-surface border border-border text-primary">
              Global Setting
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <SettingsDropdown />
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-border hover:border-primary transition-colors overflow-hidden">
            <User className="w-5 h-5 text-textSecondary" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
