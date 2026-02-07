import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Card } from '../Card';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';
import { PasswordStrength } from '../ui/PasswordStrength';
import { Button } from '../Button';
import { KeyRound, CheckCircle } from 'lucide-react';

interface NewPasswordProps {
  onSuccess: () => void;
}

export const NewPassword: React.FC<NewPasswordProps> = ({ onSuccess }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const password = watch('password');

  const onSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <Card variant="elevated" className="p-8 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-accent-primary/10 rounded-full flex items-center justify-center mb-4 text-accent-primary">
            <KeyRound size={24} />
          </div>
          <h2 className="text-2xl font-bold font-display">Create New Password</h2>
          <p className="text-text-secondary text-sm">
            Choose a strong password to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FloatingLabelInput
              label="New Password"
              type="password"
              togglePassword
              registration={register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' }
              })}
              error={errors.password?.message as string}
            />
            <PasswordStrength password={password} />
          </div>

          <FloatingLabelInput
            label="Confirm Password"
            type="password"
            togglePassword
            registration={register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val: string) => val === password || 'Passwords do not match'
            })}
            error={errors.confirmPassword?.message as string}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export const SuccessStep: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  React.useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(c => c - 1), 1000);
    return () => { if (timer) clearInterval(timer); };
  }, [countdown]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <Card variant="elevated" className="p-12 backdrop-blur-sm border-status-success/30">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-20 h-20 bg-status-success rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-status-success/40"
        >
          <CheckCircle size={40} strokeWidth={3} />
        </motion.div>

        <h2 className="text-3xl font-bold font-display text-text-primary mb-2">Success!</h2>
        <p className="text-text-secondary mb-8">
          Your password has been securely reset. You can now log in with your new credentials.
        </p>

        <p className="text-sm text-text-muted">
          Redirecting to login in <span className="font-bold text-text-primary">{countdown}</span> seconds...
        </p>

        <Button variant="ghost" className="mt-4" onClick={() => window.location.reload()}>
          Login Now
        </Button>
      </Card>
    </motion.div>
  );
};
