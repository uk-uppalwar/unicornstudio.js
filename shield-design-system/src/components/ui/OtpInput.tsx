import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  error?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onComplete, error }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Allow pasting
    if (value.length > 1) {
      const pastedData = value.split("").slice(0, length - index);
      pastedData.forEach((char, i) => {
        newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      if (newOtp.every(v => v !== "") && newOtp.length === length) {
        onComplete(newOtp.join(""));
      }
      return;
    }

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length && newOtp.every(v => v !== "")) {
      onComplete(combinedOtp);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      {otp.map((data, index) => (
        <motion.input
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          type="text"
          maxLength={6} // Allow paste but handle in onChange
          value={data}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          className={cn(
            "w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-bg-secondary border rounded-md outline-none transition-all duration-200",
            error
              ? "border-status-error text-status-error"
              : "border-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-text-primary",
            "disabled:opacity-50"
          )}
        />
      ))}
    </div>
  );
};
