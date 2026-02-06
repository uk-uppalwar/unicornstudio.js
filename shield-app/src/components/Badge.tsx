import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
}

export default function Badge({ variant = 'primary', size = 'sm', className, children, ...props }: BadgeProps) {
  const variants = {
    primary: "bg-accent-primary/10 text-accent-primary border-accent-primary/20",
    success: "bg-status-success/10 text-status-success border-status-success/20",
    warning: "bg-status-warning/10 text-status-warning border-status-warning/20",
    error: "bg-status-error/10 text-status-error border-status-error/20",
    neutral: "bg-text-muted/10 text-text-muted border-text-muted/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
