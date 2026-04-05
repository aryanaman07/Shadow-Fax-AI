import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useStore from '../store/useStore';

export default function LeakageChart() {
  const { leakageTypes } = useStore((state) => state.stats);

  return (
    <div className="glass-panel p-6 col-span-1 lg:col-span-2 h-[350px] flex flex-col">
      <h3 className="text-lg font-semibold text-textMain mb-4">Top Leakage Types</h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={leakageTypes}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barSize={24}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" stroke="#94A3B8" />
            <YAxis dataKey="name" type="category" stroke="#94A3B8" width={80} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}} 
              contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {leakageTypes.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={`url(#colorGradient)`} />
              ))}
            </Bar>

            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
