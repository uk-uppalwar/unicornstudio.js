import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const controls = useAnimation();
  const threshold = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === 0) return;
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 0) {
      setPullDistance(distance * 0.5); // Resistance
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > threshold) {
      setIsRefreshing(true);
      await controls.start({ y: 50 });
      await onRefresh();
      setIsRefreshing(false);
      controls.start({ y: 0 });
    } else {
      controls.start({ y: 0 });
    }
    setStartY(0);
    setPullDistance(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="absolute w-full flex justify-center items-center h-12 -top-12 z-10 text-accent-primary"
        style={{ y: pullDistance > 0 ? pullDistance : undefined }}
        animate={controls}
      >
        <RefreshCw
          className={isRefreshing ? "animate-spin" : ""}
          style={{ rotate: pullDistance * 2 as any }}
        />
      </motion.div>

      <motion.div
        animate={controls}
        style={{ y: pullDistance > 0 ? pullDistance : undefined }}
      >
        {children}
      </motion.div>
    </div>
  );
};
