import React from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  ...props
}) => {
  const baseStyles = 'bg-border';
  const orientationStyles = orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px';

  return (
    <div className={`${baseStyles} ${orientationStyles} ${className}`} {...props} />
  );
};
