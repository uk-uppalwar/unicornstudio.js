import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { MoreVertical, Shield, AlertTriangle } from 'lucide-react';
import { FloatingLabelInput } from '../ui/FloatingLabelInput';

export const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="w-96">
          <FloatingLabelInput label="Search users by hash, IP, or ID" />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Export CSV</Button>
          <Button variant="primary">Add User to Watchlist</Button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} variant="flat" className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-mono text-sm font-medium">user_{Math.random().toString(36).substr(2, 8)}</div>
                <div className="text-xs text-text-muted mt-1">{Math.floor(Math.random() * 24)}h ago</div>
              </div>
              <button className="text-text-muted hover:text-text-primary p-1">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-status-error' : 'bg-status-success'}`} />
                {i % 3 === 0 ? 'High Risk' : 'Low Risk'}
              </div>
              <Badge variant={i % 4 === 0 ? 'error' : 'success'} pill>
                {i % 4 === 0 ? 'Locked' : 'Active'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <Card variant="elevated" className="overflow-hidden hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead className="bg-bg-tertiary text-xs font-semibold text-text-secondary uppercase tracking-wider">
            <tr>
              <th className="p-4">User Hash</th>
              <th className="p-4">Risk Profile</th>
              <th className="p-4">Last Active</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="hover:bg-bg-secondary/50 transition-colors">
                <td className="p-4 font-mono">
                  user_{Math.random().toString(36).substr(2, 8)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-status-error' : 'bg-status-success'}`} />
                    {i % 3 === 0 ? 'High Risk' : 'Low Risk'}
                  </div>
                </td>
                <td className="p-4 text-text-muted">
                  {Math.floor(Math.random() * 24)}h ago
                </td>
                <td className="p-4">
                  <Badge variant={i % 4 === 0 ? 'error' : 'success'} pill>
                    {i % 4 === 0 ? 'Locked' : 'Active'}
                  </Badge>
                </td>
                <td className="p-4">
                  <button className="text-text-muted hover:text-text-primary">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export const AlertsCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="flat" className="p-4 border-l-4 border-status-error bg-status-error/5">
          <div className="flex items-start gap-4">
            <Shield className="text-status-error mt-1" />
            <div>
              <h4 className="font-bold">Critical Security Alert</h4>
              <p className="text-sm text-text-secondary mt-1">Spike in failed login attempts from subnet 192.168.1.0/24</p>
              <span className="text-xs text-text-muted mt-2 block">2 mins ago</span>
            </div>
          </div>
        </Card>
        <Card variant="flat" className="p-4 border-l-4 border-status-warning bg-status-warning/5">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-status-warning mt-1" />
            <div>
              <h4 className="font-bold">Policy Violation</h4>
              <p className="text-sm text-text-secondary mt-1">User accessed from restricted geo-location (North Korea)</p>
              <span className="text-xs text-text-muted mt-2 block">15 mins ago</span>
            </div>
          </div>
        </Card>
      </div>

      <Card variant="elevated" className="p-6">
        <h3 className="font-bold font-display mb-4">Alert Rules Configuration</h3>
        <div className="space-y-4">
          {/* Placeholder for rules list */}
          <div className="p-4 border border-border rounded-lg flex justify-between items-center">
            <div>
              <div className="font-medium">Velocity Check</div>
              <div className="text-sm text-text-muted">Trigger if &gt; 50 req/min from single IP</div>
            </div>
            <div className="h-6 w-12 bg-status-success/20 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 h-4 w-4 bg-status-success rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
