import React from 'react';
import { cn } from '../../lib/utils';
import { Card } from '../Card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Gauge } from '../ui/Gauge';
import { ArrowUp, ArrowDown, ShieldAlert, Activity, Globe } from 'lucide-react';

const mockData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  total: Math.floor(Math.random() * 5000) + 1000,
  blocked: Math.floor(Math.random() * 500),
  challenged: Math.floor(Math.random() * 200),
}));

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard
          title="Total Requests"
          value="1.2M"
          change="+12%"
          trend="up"
          icon={<Activity />}
        />
        <KPICard
          title="Blocked Attacks"
          value="45.2k"
          change="-5%"
          trend="down"
          icon={<ShieldAlert className="text-status-error" />}
          subtitle="Est. Saved: $12k"
        />
        <Card variant="flat" className="flex flex-col items-center justify-center p-4">
          <span className="text-text-secondary text-sm mb-2">Avg Risk Score</span>
          <div className="h-24 w-24">
            <Gauge value={24} size={96} />
          </div>
        </Card>
        <Card variant="flat" className="p-6 flex items-center justify-between">
          <div>
            <span className="text-text-secondary text-sm">System Health</span>
            <div className="text-2xl font-bold text-status-success mt-1">99.99%</div>
            <div className="text-xs text-text-muted mt-1">All systems operational</div>
          </div>
          <div className="w-3 h-3 bg-status-success rounded-full animate-pulse shadow-[0_0_10px_var(--color-success)]" />
        </Card>
      </div>

      {/* Main Chart */}
      <Card variant="elevated" className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold font-display">Traffic & Threat Analysis</h3>
          <div className="flex gap-2">
            {['1h', '24h', '7d', '30d'].map(r => (
              <button key={r} className="px-3 py-1 text-xs rounded-md bg-bg-tertiary hover:bg-bg-secondary transition-colors">
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-accent-primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-error)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-error)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-bg-primary)', borderColor: 'var(--color-border)' }}
                itemStyle={{ color: 'var(--color-text-primary)' }}
              />
              <Area type="monotone" dataKey="total" stroke="var(--color-accent-primary)" fillOpacity={1} fill="url(#colorTotal)" />
              <Area type="monotone" dataKey="blocked" stroke="var(--color-error)" fillOpacity={1} fill="url(#colorBlocked)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Map & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="elevated" className="col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold font-display">Global Threat Map</h3>
            <Globe className="text-text-muted" size={20} />
          </div>
          <div className="h-[300px] bg-bg-tertiary rounded-lg flex items-center justify-center text-text-muted">
            {/* Placeholder for complex map - implementing a real interactive map would require more dependencies */}
            [Interactive Map Component Placeholder]
          </div>
        </Card>

        <Card variant="elevated" className="p-0 overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold font-display">Top Attacked Targets</h3>
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-bg-tertiary transition-colors">
                <div>
                  <div className="font-mono text-sm">user_{Math.random().toString(36).substr(2, 6)}...</div>
                  <div className="text-xs text-text-muted">2 mins ago</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-status-error">{Math.floor(Math.random() * 100)}</div>
                  <div className="text-xs text-text-muted">Attempts</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, change, trend, icon, subtitle }: any) => (
  <Card variant="flat" className="p-6">
    <div className="flex justify-between items-start mb-2">
      <span className="text-text-secondary text-sm">{title}</span>
      <span className="text-text-muted">{icon}</span>
    </div>
    <div className="text-3xl font-bold font-display">{value}</div>
    <div className="flex items-center gap-2 mt-2">
      <span className={cn("text-xs flex items-center", trend === 'up' ? 'text-status-success' : 'text-status-error')}>
        {trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        {change}
      </span>
      {subtitle && <span className="text-xs text-text-muted">• {subtitle}</span>}
    </div>
  </Card>
);
