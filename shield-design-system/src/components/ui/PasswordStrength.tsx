import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PasswordStrengthProps {
  password?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = '' }) => {
  const [strength, setStrength] = useState(0);

  const requirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Contains a special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
  ];

  useEffect(() => {
    const validCount = requirements.filter(r => r.valid).length;
    setStrength((validCount / requirements.length) * 100);
  }, [password]);

  const getColor = () => {
    if (strength <= 25) return 'bg-status-error';
    if (strength <= 50) return 'bg-status-warning';
    if (strength <= 75) return 'bg-status-info';
    return 'bg-status-success';
  };

  return (
    <div className="space-y-3 mt-2">
      <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          className={cn("h-full transition-colors duration-300", getColor())}
        />
      </div>

      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center text-xs space-x-2">
            {req.valid ? (
              <Check size={12} className="text-status-success" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-text-muted flex items-center justify-center">
                <div className="w-1 h-1 bg-text-muted rounded-full" />
              </div>
            )}
            <span className={cn(req.valid ? "text-text-primary" : "text-text-muted")}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
