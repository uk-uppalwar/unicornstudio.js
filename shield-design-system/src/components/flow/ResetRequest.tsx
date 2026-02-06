import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';
import { Button } from '../Button';
import { Shield, Lock, FileCheck } from 'lucide-react';
import { Card } from '../Card';

interface ResetRequestProps {
  onSuccess: (email: string) => void;
}

export const ResetRequest: React.FC<ResetRequestProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    // Simulate API call and behavioral analysis
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(data.email);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card variant="elevated" className="backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center mb-4 text-accent-primary">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold font-display text-text-primary">Secure Reset</h2>
          <p className="text-text-secondary text-sm mt-1">
            Enter your email to initiate a secure password reset protocol.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FloatingLabelInput
            label="Email Address"
            type="email"
            registration={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={errors.email?.message}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full relative overflow-hidden"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Securing...
              </span>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border flex justify-around text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <Shield size={14} className="text-status-success" />
            <span>256-bit Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <FileCheck size={14} className="text-accent-primary" />
            <span>SOC2 Compliant</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
