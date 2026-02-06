import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col font-sans text-text-primary selection:bg-accent-primary/30">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isMobile={isMobile}
        closeMobile={() => setIsSidebarOpen(false)}
      />

      <main
        className={`flex-1 flex flex-col pt-20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobile ? 'pl-0' : (isSidebarOpen ? 'pl-[240px]' : 'pl-[72px]')
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[1600px] mx-auto"
        >
          {children}
        </motion.div>

        <div className={`transition-all duration-300 ${isMobile ? 'pl-0' : ''}`}>
           <Footer />
        </div>
      </main>
    </div>
  );
}
