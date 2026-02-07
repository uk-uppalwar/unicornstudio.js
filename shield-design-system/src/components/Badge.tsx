import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
  pill?: boolean;
  className?: string; // Added className prop
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  pill = false,
  className = '',
  children
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium border';
  const rounded = pill ? 'rounded-full' : 'rounded';

  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  };

  return (
    <span className={cn(baseStyles, rounded, variants[variant], className)}>
      {children}
    </span>
  );
};
