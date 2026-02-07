import React from 'react';
import { LayoutDashboard, Activity, Users, Bell, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileNavBarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Home' },
    { id: 'live', icon: Activity, label: 'Live' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-border z-50 pb-safe-bottom md:hidden shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center justify-center w-full h-full active:scale-95 transition-transform"
          >
            <div className={cn(
              "p-1.5 rounded-full transition-colors",
              activePage === item.id ? "text-accent-primary bg-accent-primary/10" : "text-text-muted"
            )}>
              <item.icon size={24} />
            </div>
            <span className={cn(
              "text-[10px] mt-1 font-medium",
              activePage === item.id ? "text-accent-primary" : "text-text-muted"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
