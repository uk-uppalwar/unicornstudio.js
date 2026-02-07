import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Trash2, Archive } from 'lucide-react';
import { Card } from '../Card';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({ children, onSwipeLeft, onSwipeRight, className }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const background = useTransform(x, [-200, 0, 200], ["#EF4444", "transparent", "#10B981"]); // Red left, Green right

  const handleDragEnd = (_event: any, info: PanInfo) => {
    if (info.offset.x < -100 && onSwipeLeft) {
      onSwipeLeft();
    } else if (info.offset.x > 100 && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg mb-3">
      {/* Background Actions */}
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-6"
        style={{ backgroundColor: background }}
      >
        <Archive className="text-white" />
        <Trash2 className="text-white" />
      </motion.div>

      {/* Card Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x, opacity, touchAction: "pan-y" }} // Allow vertical scroll
        className="relative bg-bg-primary"
      >
        <Card variant="flat" className={className}>
          {children}
        </Card>
      </motion.div>
    </div>
  );
};
