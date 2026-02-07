import React, { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { MobileNavBar } from '../navigation/MobileNavBar';
import { SidebarDrawer } from '../navigation/SidebarDrawer';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activePage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col md:flex-row">
      {/* Responsive Sidebar (Desktop) */}
      <SidebarDrawer
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-bg-primary border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0">
          <h1 className="text-lg md:text-xl font-bold font-display capitalize">{activePage.replace('-', ' ')}</h1>
          <div className="flex items-center gap-2 md:gap-4">
             <div className="text-xs md:text-sm text-text-secondary hidden sm:block">
                <span className="w-2 h-2 rounded-full bg-status-success inline-block mr-2"></span>
                System Operational
             </div>
             <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </div>

        {/* Mobile Navigation (Bottom) */}
        <MobileNavBar activePage={activePage} onNavigate={onNavigate} />
      </main>
    </div>
  );
};
