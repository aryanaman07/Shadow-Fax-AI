import React from 'react';

export default function Reports() {
  return (
    <div className="glass-panel p-6 min-h-[600px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      </div>
      <h2 className="text-2xl font-bold text-textMain mb-2">Compliance Reports</h2>
      <p className="text-textMuted max-w-md">
        Generate and export SOC2, HIPAA, and GDPR compliance reports based on historical prompt analysis.
        (Feature coming soon)
      </p>
    </div>
  );
}
