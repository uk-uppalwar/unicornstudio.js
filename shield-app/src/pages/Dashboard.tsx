import React, { useState, useEffect } from 'react';
import { Shield, Activity, Users, AlertTriangle, Search, Filter, MoreVertical } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Input from '../components/Input';
import { Skeleton } from '../components/Loading';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-2 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Threats', value: '12', change: '+2', trend: 'up', icon: Shield, color: 'text-status-error' },
    { label: 'Network Traffic', value: '1.2 TB', change: '-5%', trend: 'down', icon: Activity, color: 'text-accent-primary' },
    { label: 'Active Users', value: '843', change: '+12%', trend: 'up', icon: Users, color: 'text-status-success' },
    { label: 'System Health', value: '98.2%', change: 'Stable', trend: 'neutral', icon: AlertTriangle, color: 'text-status-warning' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-text-primary">Security Dashboard</h1>
          <p className="text-text-secondary mt-1">Real-time overview of system security and performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">Export Report</Button>
          <Button variant="primary" size="sm">Scan Network</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} variant="interactive" className="relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-text-muted">{stat.label}</p>
                <h3 className="text-2xl font-bold font-mono mt-1 text-text-primary">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg bg-bg-secondary ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className={stat.trend === 'up' ? 'text-status-success' : stat.trend === 'down' ? 'text-accent-primary' : 'text-text-muted'}>
                {stat.change}
              </span>
              <span className="text-text-muted ml-1">vs last 24h</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Attack Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-text-primary">Live Threat Feed</h2>
            <div className="flex gap-2">
              <Input placeholder="Search logs..." className="w-64" />
              <Button variant="ghost" size="sm"><Filter size={18} /></Button>
            </div>
          </div>

          <Card variant="elevated" className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-muted uppercase bg-bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3">Severity</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Source IP</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { severity: 'Critical', type: 'SQL Injection', ip: '192.168.1.45', status: 'Blocked', time: '2m ago' },
                    { severity: 'High', type: 'DDoS Attempt', ip: '45.22.11.90', status: 'Mitigated', time: '5m ago' },
                    { severity: 'Medium', type: 'Brute Force', ip: '10.0.0.5', status: 'Flagged', time: '12m ago' },
                    { severity: 'Low', type: 'Port Scan', ip: '172.16.0.2', status: 'Logged', time: '15m ago' },
                    { severity: 'Critical', type: 'Malware', ip: '192.168.1.10', status: 'Quarantined', time: '22m ago' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        <Badge variant={row.severity === 'Critical' ? 'error' : row.severity === 'High' ? 'warning' : 'primary'}>
                          {row.severity}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium text-text-primary">{row.type}</td>
                      <td className="px-6 py-4 font-mono text-text-secondary">{row.ip}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Blocked' ? 'bg-status-success' : 'bg-status-warning'}`} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-muted">{row.time}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-text-muted hover:text-text-primary"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border flex justify-center">
              <Button variant="ghost" size="sm">View All Logs</Button>
            </div>
          </Card>
        </div>

        {/* System Status Side Panel */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-display text-text-primary">System Status</h2>

          <Card variant="flat" className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">CPU Usage</span>
                <span className="font-mono text-text-primary">78%</span>
              </div>
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent-primary w-[78%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Memory</span>
                <span className="font-mono text-text-primary">4.2/8 GB</span>
              </div>
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-status-success w-[52%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Storage</span>
                <span className="font-mono text-text-primary">89%</span>
              </div>
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-status-warning w-[89%] rounded-full" />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-text-primary mb-3">Active Nodes</h4>
              <div className="space-y-3">
                {['Node-Alpha', 'Node-Beta', 'Node-Gamma'].map((node) => (
                  <div key={node} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                      <span className="text-text-secondary">{node}</span>
                    </div>
                    <span className="text-status-success text-xs">Online</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card variant="elevated" className="bg-gradient-to-br from-accent-primary/10 to-transparent border-accent-primary/20">
            <h3 className="font-bold text-lg text-text-primary mb-2">Pro Protection</h3>
            <p className="text-sm text-text-secondary mb-4">Upgrade to enterprise tier for advanced AI threat detection.</p>
            <Button size="sm" className="w-full">Upgrade Now</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
