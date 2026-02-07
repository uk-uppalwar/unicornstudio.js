import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={`w-full px-3 py-2 bg-bg-primary border rounded-md outline-none transition-all duration-200
            ${error
              ? 'border-status-error focus:ring-2 focus:ring-status-error'
              : 'border-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
            }
            text-text-primary placeholder-text-muted disabled:bg-bg-tertiary disabled:text-text-muted
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-status-error">{error}</p>}
    </div>
  );
};
