import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat' | 'interactive';
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'rounded-lg p-6 transition-all duration-300';

  const variants = {
    elevated: 'bg-bg-primary shadow-card border border-border',
    flat: 'bg-bg-tertiary border border-border',
    interactive: 'bg-bg-primary shadow-card border border-border hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
