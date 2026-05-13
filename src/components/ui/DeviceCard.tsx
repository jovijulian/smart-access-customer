import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Power } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DeviceCardProps {
  name: string;
  isOnline: boolean;
  lastAction: string;
  onManualOpen?: () => void;
  className?: string;
}

export function DeviceCard({ name, isOnline, lastAction, onManualOpen, className }: DeviceCardProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (!isOnline) return;
    setIsOpening(true);
    if (onManualOpen) onManualOpen();
    
    // Simulate loading state
    setTimeout(() => {
      setIsOpening(false);
    }, 1500);
  };

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
        <div className="flex items-center space-x-2">
          <span className={cn(
            "text-xs font-medium uppercase tracking-wider",
            isOnline ? "text-primary" : "text-red-500"
          )}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <div className={cn(
            "w-2 h-2 rounded-full",
            isOnline ? "bg-primary shadow-[0_0_8px_rgba(0,230,118,0.6)]" : "bg-red-500"
          )} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="flex-1 flex items-center justify-center py-4">
          <button
            onClick={handleOpen}
            disabled={!isOnline || isOpening}
            className={cn(
              "flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 transition-all duration-300",
              isOnline && !isOpening 
                ? "border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,230,118,0.2)]" 
                : isOpening 
                  ? "border-secondary text-secondary animate-pulse"
                  : "border-border text-textSecondary opacity-50 cursor-not-allowed"
            )}
          >
            <Power className="w-8 h-8 mb-1" />
            <span className="text-xs font-semibold">{isOpening ? 'Opening...' : 'Open'}</span>
          </button>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <p className="text-xs text-textSecondary truncate">
            Last action: {lastAction}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
