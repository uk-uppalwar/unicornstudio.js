import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  togglePassword?: boolean;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, className, type = 'text', registration, togglePassword, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = togglePassword ? (showPassword ? 'text' : 'password') : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
      registration?.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
      registration?.onChange(e);
    };

    return (
      <div className={cn("relative mb-6", className)}>
        <input
          {...registration}
          {...props}
          ref={ref} // Forward ref correctly
          type={inputType}
          className={cn(
            "peer w-full h-14 px-4 pt-4 bg-bg-primary border rounded-lg outline-none transition-all duration-200",
            error
              ? "border-status-error focus:ring-2 focus:ring-status-error"
              : "border-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary",
            "text-text-primary placeholder-transparent disabled:opacity-50"
          )}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none text-text-muted",
            (isFocused || hasValue || props.value)
              ? "top-1 text-xs font-medium text-accent-primary"
              : "top-4 text-base"
          )}
        >
          {label}
        </label>

        {togglePassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-text-muted hover:text-text-primary"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-5 left-0 text-xs text-status-error"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";
