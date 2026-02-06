import { motion } from 'framer-motion';

export const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-bg-primary overflow-hidden flex items-center justify-center p-4">
      {/* Circuit / Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-text-muted) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-text-muted) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Animated Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary rounded-full blur-[120px] opacity-20 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [50, -50, 50],
          y: [50, -50, 50],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-status-info rounded-full blur-[100px] opacity-20 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};
