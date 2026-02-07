import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { ResetRequest } from './ResetRequest';
import { RiskAnalysis } from './RiskAnalysis';
import { ChallengeStep } from './ChallengeStep';
import { NewPassword, SuccessStep } from './NewPassword';

type FlowStep = 'request' | 'risk' | 'challenge' | 'reset' | 'success';

export const PasswordResetOrchestrator: React.FC = () => {
  const [step, setStep] = useState<FlowStep>('request');
  const [email, setEmail] = useState('');

  const handleRequestSuccess = (email: string) => {
    setEmail(email);
    setStep('risk');
  };

  const handleRiskComplete = (decision: 'allow' | 'challenge' | 'block') => {
    if (decision === 'challenge') {
      setStep('challenge');
    } else if (decision === 'allow') {
      setStep('reset');
    } else {
      // Handle block state (omitted for brevity)
      alert('Access Blocked');
    }
  };

  const handleChallengeSuccess = () => {
    setStep('reset');
  };

  const handleResetSuccess = () => {
    setStep('success');
  };

  return (
    <AnimatedBackground>
      <AnimatePresence mode="wait">
        {step === 'request' && (
          <ResetRequest key="request" onSuccess={handleRequestSuccess} />
        )}
        {step === 'risk' && (
          <RiskAnalysis key="risk" onComplete={handleRiskComplete} />
        )}
        {step === 'challenge' && (
          <ChallengeStep key="challenge" email={email} onSuccess={handleChallengeSuccess} />
        )}
        {step === 'reset' && (
          <NewPassword key="reset" onSuccess={handleResetSuccess} />
        )}
        {step === 'success' && (
          <SuccessStep key="success" />
        )}
      </AnimatePresence>
    </AnimatedBackground>
  );
};
