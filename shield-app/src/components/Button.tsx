import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer";

  const variants = {
    primary: "bg-accent-primary text-bg-primary hover:brightness-110 shadow-lg shadow-accent-primary/20 border border-transparent",
    secondary: "bg-bg-secondary text-text-primary hover:bg-opacity-80 border border-border",
    ghost: "bg-transparent text-text-primary hover:bg-bg-secondary border border-transparent",
    danger: "bg-status-error text-white hover:brightness-110 shadow-lg shadow-status-error/20 border border-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
