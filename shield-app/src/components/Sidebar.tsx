import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  ShieldAlert,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
  closeMobile: () => void;
}

export default function Sidebar({ isOpen, setIsOpen, isMobile, closeMobile }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Activity, label: 'Live Attacks', path: '/live' },
    { icon: ShieldAlert, label: 'Risk Analytics', path: '/risk' },
    { icon: Users, label: 'User Management', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={closeMobile}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 240 : (isMobile ? 0 : 72),
          x: isMobile && !isOpen ? -100 : 0
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // smooth easeOut
        className={`fixed left-0 top-0 bottom-0 z-40 bg-bg-primary border-r border-border flex flex-col pt-20 pb-4 overflow-hidden
          ${isMobile ? 'shadow-2xl' : ''}`}
      >
        <div className="flex-1 px-3 py-4 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={isMobile ? closeMobile : undefined}
              className={({ isActive }) => `
                relative flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-300 group
                ${isActive
                  ? 'bg-accent-primary/10 text-accent-primary'
                  : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-8 bg-accent-primary rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon size={22} className={`min-w-[22px] transition-colors ${isActive ? 'text-accent-primary' : 'group-hover:text-text-primary'}`} />
                  <span className={`font-medium whitespace-nowrap overflow-hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="px-3 mt-auto">
          {!isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-text-muted hover:bg-bg-secondary hover:text-text-primary transition-colors border border-transparent hover:border-border"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
}
