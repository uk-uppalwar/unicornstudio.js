import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge } from '../ui/Gauge';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { ShieldAlert } from 'lucide-react';

interface RiskAnalysisProps {
  onComplete: (decision: 'allow' | 'challenge' | 'block') => void;
}

export const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);
  const [factors, setFactors] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    // Simulate risk calculation
    const timer = setInterval(() => {
      setScore(prev => {
        if (prev >= 65) { // Target score
          clearInterval(timer);
          setAnalyzing(false);
          setTimeout(() => onComplete('challenge'), 2000); // Auto proceed after result
          return 65;
        }
        return prev + 1;
      });
    }, 20);

    // Animate factors
    setTimeout(() => {
      setFactors([
        { name: "Device Fingerprint", value: 80 },
        { name: "IP Reputation", value: 40 },
        { name: "Behavioral Pattern", value: 60 },
      ]);
    }, 500);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="w-full max-w-md mx-auto"
    >
      <Card variant="elevated" className="text-center p-8 backdrop-blur-md">
        <h3 className="text-xl font-bold font-display mb-6">Analyzing Request Risk</h3>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <Gauge value={score} size={160} label={analyzing ? "CALCULATING" : "RISK SCORE"} />
            {analyzing && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-accent-primary border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: 160, height: 160 }}
              />
            )}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {factors.map((factor, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs text-text-secondary">
                <span>{factor.name}</span>
                <span>{factor.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.value}%` }}
                  transition={{ delay: 0.5 + (index * 0.2), duration: 1 }}
                  className={`h-full ${factor.value > 70 ? 'bg-status-warning' : 'bg-status-success'}`}
                />
              </div>
            </div>
          ))}
        </div>

        {!analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex flex-col items-center">
              <Badge variant="warning" pill>
                <span className="flex items-center gap-1.5 px-2 py-1 text-sm">
                  <ShieldAlert size={16} />
                  CHALLENGE REQUIRED
                </span>
              </Badge>
              <p className="text-xs text-text-muted mt-2">Suspicious login pattern detected</p>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
