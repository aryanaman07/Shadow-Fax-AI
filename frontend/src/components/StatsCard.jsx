import React from 'react';
import clsx from 'clsx';

export default function StatsCard({ title, value, icon: Icon, iconColorClass, iconBgClass }) {
  return (
    <div className="glass-panel p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className={clsx("absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40", iconBgClass)}></div>
      
      <div className="flex items-center justify-between mb-4 z-10">
        <p className="text-sm text-textMuted font-medium uppercase tracking-wider">{title}</p>
        <div className={clsx("p-3 rounded-lg bg-cardBorder", iconColorClass)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="z-10">
        <h3 className="text-4xl font-bold text-textMain tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
      </div>
    </div>
  );
}
