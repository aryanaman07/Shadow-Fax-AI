import React from 'react';
import useStore from '../store/useStore';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import clsx from 'clsx';

export default function Incidents() {
  const activities = useStore((state) => state.activities);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h2 className="text-xl font-bold mb-4 text-textMain">Incident Log</h2>
        <p className="text-sm text-textMuted mb-6">A detailed view of all intercepted and monitored prompts.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cardBorder text-textMuted text-sm">
                <th className="pb-3 px-4 font-medium">Time</th>
                <th className="pb-3 px-4 font-medium">Risk Level</th>
                <th className="pb-3 px-4 font-medium">Content Snippet</th>
                <th className="pb-3 px-4 font-medium">Entities Detected</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => {
                const isCritical = act.risk === 'Critical';
                const isSensitive = act.risk === 'Sensitive';

                return (
                  <tr key={act.id} className="border-b border-cardBorder/50 hover:bg-cardBorder/30 transition-colors">
                    <td className="py-4 px-4 text-sm text-textMuted font-mono">
                      {new Date(act.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={clsx(
                        "text-xs font-bold uppercase tracking-widest px-2 py-1 rounded inline-flex items-center gap-1", 
                        isCritical ? "bg-critical/20 text-critical" : isSensitive ? "bg-warning/20 text-warning" : "bg-safe/20 text-safe"
                      )}>
                        {isCritical ? <AlertTriangle className="w-3 h-3"/> : isSensitive ? <Info className="w-3 h-3"/> : <CheckCircle2 className="w-3 h-3"/>}
                        {act.risk}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm max-w-md truncate" title={act.text}>
                      "{act.text}"
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {act.entities.length > 0 ? act.entities.map(ent => (
                          <span key={ent} className="text-[10px] font-medium px-2 py-0.5 rounded bg-cardBorder text-textMuted font-mono">
                            {ent}
                          </span>
                        )) : <span className="text-textMuted text-xs">-</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {activities.length === 0 && (
            <div className="p-8 text-center text-textMuted">No incidents logged yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
