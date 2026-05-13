import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  onBack?: () => void;
}

export function PageHeader({ title, description, actions, onBack }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 fade-in">
      <div className="flex items-center gap-4">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 -ml-2 bg-surfaceHover/50 hover:bg-surface border border-border/50 rounded-lg text-textSecondary hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {description && <p className="text-sm text-textSecondary mt-1">{description}</p>}
        </div>
      </div>
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
}
