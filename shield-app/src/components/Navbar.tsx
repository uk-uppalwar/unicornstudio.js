import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Bell, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Badge from './Badge';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ toggleSidebar, isSidebarOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Reset Demo', path: '/reset' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Documentation', path: '/docs' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'h-16 bg-bg-primary/80 backdrop-blur-md shadow-md shadow-shadow-color/5'
          : 'h-20 bg-transparent'
      } border-b border-white/5`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors lg:hidden"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors duration-300">
              <Shield className="w-6 h-6 text-accent-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-primary)/0.5)] transition-all duration-300" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-text-primary">
              SHIELD
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-accent-primary bg-accent-primary/5'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <button className="relative p-2 rounded-full text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-status-error animate-pulse-glow" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-full pl-3 pr-2 hover:bg-bg-secondary transition-colors border border-transparent hover:border-border"
            >
              <div className="hidden sm:block text-right mr-1">
                <p className="text-xs font-semibold text-text-primary">Admin User</p>
                <p className="text-[10px] text-text-muted">Security Ops</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary ring-2 ring-transparent group-hover:ring-accent-primary/20">
                <User size={16} />
              </div>
              <ChevronDown size={14} className={`text-text-muted transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-bg-primary border border-border rounded-xl shadow-xl shadow-shadow-color/10 py-1 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-text-primary">Admin User</p>
                    <p className="text-xs text-text-muted">admin@shield.sec</p>
                  </div>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary">Settings</a>
                  </div>
                  <div className="py-1 border-t border-border">
                    <a href="#" className="block px-4 py-2 text-sm text-status-error hover:bg-status-error/5">Logout</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
