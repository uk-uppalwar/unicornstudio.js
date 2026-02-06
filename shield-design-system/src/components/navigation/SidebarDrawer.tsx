import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Activity, Users, Bell, Settings, LogOut, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarDrawerProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ activePage, onNavigate, isOpen, onToggle }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'live', label: 'Live Monitor', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-bg-primary border-r border-border transition-all duration-300 relative z-40",
          isOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-16 flex items-center justify-center border-b border-border">
          <Shield className="text-accent-primary w-8 h-8 flex-shrink-0" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-2 font-display font-bold text-xl text-text-primary whitespace-nowrap overflow-hidden"
              >
                SHIELD
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center p-3 rounded-lg transition-colors duration-200 group relative",
                activePage === item.id
                  ? "bg-accent-primary/10 text-accent-primary"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              )}
              title={!isOpen ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button className="flex items-center text-text-muted hover:text-status-error w-full p-2 transition-colors">
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="ml-3 font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 bg-bg-primary border border-border rounded-full p-1 text-text-muted hover:text-accent-primary shadow-sm hidden md:flex"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>
    </>
  );
};
