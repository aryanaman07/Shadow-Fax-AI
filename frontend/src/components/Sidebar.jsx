import React from 'react';
import { LayoutDashboard, Users, ShieldAlert, FileText, Settings, Shield } from 'lucide-react';
import clsx from 'clsx';
import useStore from '../store/useStore';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Incidents', icon: ShieldAlert },
  { name: 'Users', icon: Users },
  { name: 'Reports', icon: FileText },
];

export default function Sidebar() {
  const { currentView, setCurrentView } = useStore();

  return (
    <div className="w-64 glass-panel m-4 flex flex-col relative h-[calc(100vh-2rem)] sticky top-4 left-4 z-50">
      <div className="p-6 border-b border-cardBorder flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          ShadowPrompt
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentView === item.name;
          
          return (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.name)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                active 
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                  : "text-textMuted hover:bg-cardBorder hover:text-textMain"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-cardBorder">
        <button 
          onClick={() => setCurrentView('Settings')}
          className={clsx(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
            currentView === 'Settings'
              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              : "text-textMuted hover:bg-cardBorder hover:text-textMain"
          )}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>
    </div>
  );
}
