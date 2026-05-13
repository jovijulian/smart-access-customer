import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Building2, ShieldCheck, Cpu, CreditCard, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'device-pool', label: 'Device Pool', icon: Cpu, path: '/settings/device-pool' },
    { id: 'billing', label: 'Billing & Finance', icon: CreditCard, path: '/settings/billing' },
    { id: 'organization', label: 'Organization', icon: Building2, path: '/settings/organization' },
    { id: 'users-roles', label: 'User & Roles', icon: ShieldCheck, path: '/settings/users-roles' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          isOpen
            ? "bg-primary text-black"
            : "text-textSecondary hover:bg-surfaceHover hover:text-white"
        )}
        title="System Settings"
      >
        <Settings className={cn("w-5 h-5", isOpen && "animate-spin-slow")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-xl shadow-2xl z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-border mb-1">
              <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">Global Settings</p>
            </div>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-textSecondary hover:text-white hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
