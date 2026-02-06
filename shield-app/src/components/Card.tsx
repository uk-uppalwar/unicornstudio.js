import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat' | 'interactive';
}

export default function Card({ variant = 'elevated', className, children, ...props }: CardProps) {
  const variants = {
    elevated: "bg-bg-primary shadow-lg shadow-shadow-color/10 border border-border",
    flat: "bg-bg-secondary border border-transparent",
    interactive: "bg-bg-primary shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-border hover:border-accent-primary/50",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
