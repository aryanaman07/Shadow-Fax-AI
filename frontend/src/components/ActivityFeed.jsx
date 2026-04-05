import React from 'react';
import useStore from '../store/useStore';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export default function ActivityFeed() {
  const activities = useStore((state) => state.activities);

  return (
    <div className="glass-panel flex flex-col h-[600px] overflow-hidden">
      <div className="p-6 border-b border-cardBorder flex justify-between items-center">
        <h3 className="text-lg font-semibold text-textMain">Live Activity Feed</h3>
        <div className="flex items-center gap-2">
           <span className="w-2.5 h-2.5 rounded-full bg-safe animate-pulse"></span>
           <span className="text-sm font-medium text-textMuted tracking-wider">LIVE</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {activities.map((act) => {
          const isCritical = act.risk === 'Critical';
          const isSensitive = act.risk === 'Sensitive';
          
          let Icon = CheckCircle2;
          let iconColor = 'text-safe';
          let bgColor = 'bg-safe/10';
          let borderColor = 'border-safe/20';

          if (isCritical) {
            Icon = AlertTriangle;
            iconColor = 'text-critical';
            bgColor = 'bg-critical/10';
            borderColor = 'border-critical/20';
          } else if (isSensitive) {
            Icon = Info;
            iconColor = 'text-warning';
            bgColor = 'bg-warning/10';
            borderColor = 'border-warning/20';
          }

          return (
            <div key={act.id} className={clsx("p-4 rounded-xl border flex gap-4 transition-all hover:bg-opacity-80 animate-in fade-in slide-in-from-top-4", bgColor, borderColor)}>
              <div className="mt-1">
                <Icon className={clsx("w-5 h-5", iconColor)} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className={clsx("text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded", isCritical ? "bg-critical text-white" : isSensitive ? "bg-warning text-black" : "bg-safe text-white")}>
                    {act.risk}
                  </span>
                  <span className="text-xs text-textMuted font-mono">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-textMain italic opacity-90 break-words mb-2">"{act.text}"</p>
                {act.entities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {act.entities.map(ent => (
                      <span key={ent} className="text-[10px] font-medium px-2 py-1 rounded bg-cardBorder text-textMuted font-mono">
                        DETECTED {ent}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <div className="h-full flex items-center justify-center text-textMuted opacity-60">
            Waiting for activity...
          </div>
        )}
      </div>
    </div>
  );
}
