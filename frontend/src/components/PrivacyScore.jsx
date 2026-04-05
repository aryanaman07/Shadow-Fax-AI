import React from 'react';
import useStore from '../store/useStore';
import clsx from 'clsx';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export default function PrivacyScore() {
  const { privacyScore } = useStore((state) => state.stats);

  // Determine color and icon primarily based on score
  let color = '#EF4444'; // critical
  let strokeColor = 'text-critical';
  let Icon = ShieldAlert;
  if (privacyScore > 85) {
    color = '#10B981'; // safe
    strokeColor = 'text-safe';
    Icon = ShieldCheck;
  } else if (privacyScore > 60) {
    color = '#F59E0B'; // warning
    strokeColor = 'text-warning';
    Icon = Shield;
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (privacyScore / 100) * circumference;

  return (
    <div className="glass-panel p-6 flex flex-col items-center justify-center relative">
      <h3 className="text-lg font-semibold text-textMain absolute top-6 left-6">Health Score</h3>
      
      <div className="relative flex items-center justify-center mt-8">
        {/* Background Circle */}
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-cardBorder"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={clsx("transition-all duration-1000 ease-out", strokeColor)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <Icon className={clsx("w-8 h-8 mb-1", strokeColor)} />
          <span className="text-3xl font-bold">{privacyScore}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-textMuted text-center">Score dynamically updates based on prompt safety ratio.</p>
    </div>
  );
}
