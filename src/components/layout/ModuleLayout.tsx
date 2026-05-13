import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Menu, User } from 'lucide-react';
import { SettingsDropdown } from './SettingsDropdown';
import clsx from 'clsx';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ModuleLayoutProps {
  moduleName: string;
  userName?: string;
  menuItems: SidebarItem[];
  children: React.ReactNode;
}

export function ModuleLayout({ moduleName, userName, menuItems, children }: ModuleLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Extract the active menu from the URL hash or use the first item
  const activeMenu = location.hash.replace('#', '') || menuItems[0]?.id;

  const handleMenuClick = (id: string) => {
    navigate(`${location.pathname}#${id}`);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-textPrimary overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-md shrink-0 px-4 flex items-center justify-between z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-surfaceHover text-textSecondary transition-colors md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-surfaceHover text-textSecondary hover:text-white transition-colors group"
          >
            <Grid className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">App Hub</span>
          </button>
          <div className="h-4 w-px bg-border hidden sm:block"></div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold px-2.5 py-1 rounded-md bg-surface border border-border text-primary">
              {moduleName}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {userName && (
            <span className="font-bold text-white mr-2 hidden sm:block tracking-tight">
              {userName}
            </span>
          )}
          <SettingsDropdown />
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-border hover:border-primary transition-colors overflow-hidden">
            <User className="w-5 h-5 text-textSecondary" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={clsx(
            "w-64 bg-surface border-r border-border flex flex-col transition-all duration-300 z-10",
            sidebarOpen ? "translate-x-0" : "-translate-x-full absolute h-full md:relative md:translate-x-0 md:w-20 lg:w-64"
          )}
        >
          <div className="p-4">
            <div className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-4 px-2 lg:block md:hidden block">
              Menu
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={clsx(
                      "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all group",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-textSecondary hover:bg-surfaceHover hover:text-white"
                    )}
                    title={item.label}
                  >
                    <div className={clsx(
                      "flex-shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-textSecondary group-hover:text-white"
                    )}>
                      {item.icon}
                    </div>
                    <span className={clsx(
                      "font-medium text-sm whitespace-nowrap lg:block md:hidden block",
                      isActive ? "text-primary" : ""
                    )}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-6 lg:p-8 relative">
          <div className="max-w-7xl mx-auto">

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </div>
        </main>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
