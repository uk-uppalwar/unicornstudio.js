import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Play, Pause, Filter, Globe, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Attack {
  id: string;
  timestamp: number;
  ip: string;
  country: string;
  target: string;
  risk: number;
  decision: 'Allow' | 'Challenge' | 'Block';
  type: string;
}

export const LiveMonitor: React.FC = () => {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock WebSocket Feed
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newAttack: Attack = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        country: ['US', 'CN', 'RU', 'DE', 'BR'][Math.floor(Math.random() * 5)],
        target: `user_${Math.random().toString(36).substr(2, 5)}...`,
        risk: Math.floor(Math.random() * 100),
        decision: Math.random() > 0.7 ? 'Block' : Math.random() > 0.4 ? 'Challenge' : 'Allow',
        type: ['Velocity', 'Geo', 'Device', 'Credential Stuffing'][Math.floor(Math.random() * 4)],
      };

      setAttacks(prev => [newAttack, ...prev].slice(0, 50));
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-status-error"></span>
            </span>
            Live Attack Feed
          </h2>
          <Badge variant="neutral" pill>{attacks.length} events buffered</Badge>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 hover:bg-bg-tertiary rounded-md transition-colors"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <button className="p-2 hover:bg-bg-tertiary rounded-md transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative rounded-lg border border-border bg-bg-secondary/50">
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-bg-secondary to-transparent z-10 pointer-events-none" />

        <div className="h-full overflow-y-auto p-4 space-y-2" ref={scrollRef}>
          <AnimatePresence initial={false}>
            {attacks.map((attack) => (
              <motion.div
                key={attack.id}
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="flat"
                  className="p-3 flex items-center justify-between hover:bg-bg-primary transition-colors cursor-default group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-text-muted w-16">
                      {new Date(attack.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center gap-2 w-32 font-mono text-sm">
                      <Globe size={14} className="text-text-muted" />
                      {attack.ip} <span className="text-xs text-text-muted">({attack.country})</span>
                    </div>
                    <div className="flex items-center gap-2 w-40 text-sm">
                      <Monitor size={14} className="text-text-muted" />
                      {attack.target}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="neutral" pill>{attack.type}</Badge>
                    <div className="w-24 flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${attack.risk > 70 ? 'bg-status-error' : attack.risk > 40 ? 'bg-status-warning' : 'bg-status-success'}`}
                          style={{ width: `${attack.risk}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{attack.risk}</span>
                    </div>
                    <Badge
                      variant={attack.decision === 'Block' ? 'error' : attack.decision === 'Challenge' ? 'warning' : 'success'}
                      className="w-20 justify-center"
                    >
                      {attack.decision}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bg-secondary to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};
