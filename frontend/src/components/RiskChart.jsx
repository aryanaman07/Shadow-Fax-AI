import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useStore from '../store/useStore';

const COLORS = ['#10B981', '#F59E0B', '#EF4444']; // safe, warning, critical

export default function RiskChart() {
  const { riskDistribution } = useStore((state) => state.stats);

  const data = [
    { name: 'Safe', value: riskDistribution.safe },
    { name: 'Sensitive', value: riskDistribution.sensitive },
    { name: 'Critical', value: riskDistribution.critical },
  ];

  return (
    <div className="glass-panel p-6 col-span-1 lg:col-span-1 h-[350px] flex flex-col">
      <h3 className="text-lg font-semibold text-textMain mb-4">Risk Distribution</h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
              itemStyle={{ color: '#F8FAFC' }} 
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#94A3B8' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
