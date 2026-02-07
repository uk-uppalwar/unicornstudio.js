import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeProps {
  value: number; // 0-100
  label?: string;
  size?: number;
  color?: string;
}

export const Gauge: React.FC<GaugeProps> = ({ value, label, size = 100, color }) => {
  const data = [
    { name: 'value', value: value },
    { name: 'empty', value: 100 - value },
  ];

  const getColor = (val: number) => {
    if (color) return color;
    if (val < 30) return 'var(--color-success)';
    if (val < 70) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const activeColor = getColor(value);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={activeColor} />
            <Cell fill="var(--color-bg-tertiary)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-0 right-0 text-center -mt-2">
        <span className="text-2xl font-bold font-display" style={{ color: activeColor }}>
          {value}
        </span>
      </div>
      {label && <div className="text-xs text-text-muted mt-2">{label}</div>}
    </div>
  );
};
