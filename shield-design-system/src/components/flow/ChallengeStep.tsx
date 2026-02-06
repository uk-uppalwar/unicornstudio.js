import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../Card';
import { OtpInput } from '../ui/OtpInput';
import { Button } from '../Button';
import { RefreshCw, Mail } from 'lucide-react';

interface ChallengeStepProps {
  onSuccess: () => void;
  email: string;
}

export const ChallengeStep: React.FC<ChallengeStepProps> = ({ onSuccess, email }) => {
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(c => c - 1), 1000);
    return () => { if (timer) clearInterval(timer); };
  }, [countdown]);

  const handleOtpComplete = (otp: string) => {
    setIsVerifying(true);
    setError(false);

    // Simulate verification
    setTimeout(() => {
      if (otp === "123456") {
        onSuccess();
      } else {
        setError(true);
        setIsVerifying(false);
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <Card variant="elevated" className="p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={32} className="text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold font-display">Verify Identity</h2>
          <p className="text-text-secondary mt-2">
            We sent a code to <span className="font-medium text-text-primary">{email}</span>
          </p>
        </div>

        <div className="mb-8">
          <OtpInput onComplete={handleOtpComplete} error={error} />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-status-error text-center text-sm mt-3"
            >
              Incorrect code. Please try again.
            </motion.p>
          )}
        </div>

        <div className="space-y-4">
          <Button
            variant="ghost"
            className="w-full text-text-muted hover:text-text-primary"
            disabled={countdown > 0}
            onClick={() => setCountdown(60)}
          >
            {countdown > 0 ? (
              <span className="tabular-nums">Resend code in {countdown}s</span>
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCw size={16} /> Resend Code
              </span>
            )}
          </Button>

          {isVerifying && (
            <div className="flex justify-center text-accent-primary text-sm font-medium animate-pulse">
              Verifying Code...
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
