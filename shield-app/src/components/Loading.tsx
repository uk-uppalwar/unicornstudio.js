import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-text-muted/10 rounded ${className}`}
    />
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative flex items-center justify-center w-24 h-24 mb-8"
      >
        <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-xl" />
        <Shield size={64} className="relative z-10 text-accent-primary" />
      </motion.div>
      <h2 className="text-2xl font-bold font-display text-text-primary tracking-widest">
        LOADING SHIELD
      </h2>
      <div className="mt-4 w-48 h-1 bg-bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent-primary"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
}
