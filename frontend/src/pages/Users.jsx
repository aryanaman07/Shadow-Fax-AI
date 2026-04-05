import React from 'react';

export default function Users() {
  return (
    <div className="glass-panel p-6 min-h-[600px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <h2 className="text-2xl font-bold text-textMain mb-2">User Management</h2>
      <p className="text-textMuted max-w-md">
        View and manage user access policies, role-based controls, and view individualized prompt metrics.
        (Feature coming soon)
      </p>
    </div>
  );
}
