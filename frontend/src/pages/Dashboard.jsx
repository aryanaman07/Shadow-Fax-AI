import React, { useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import RiskChart from '../components/RiskChart';
import LeakageChart from '../components/LeakageChart';
import PrivacyScore from '../components/PrivacyScore';
import ActivityFeed from '../components/ActivityFeed';
import useStore from '../store/useStore';
import { connectMockSocket } from '../services/api';
import { ShieldAlert, ShieldCheck, Activity, EyeOff, Bell, BellRing } from 'lucide-react';
import clsx from 'clsx';

// Import Views
import Incidents from './Incidents';
import Users from './Users';
import Reports from './Reports';
import Settings from './Settings';

function DashboardGrid() {
  const { stats } = useStore();
  
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Prompts" 
            value={stats.totalPrompts} 
            icon={Activity} 
            iconColorClass="text-blue-400" 
            iconBgClass="bg-blue-500" 
          />
          <StatsCard 
            title="Sensitive Handled" 
            value={stats.sensitivePrompts} 
            icon={ShieldCheck} 
            iconColorClass="text-safe" 
            iconBgClass="bg-safe" 
          />
          <StatsCard 
            title="Data Masked" 
            value={stats.maskedItems} 
            icon={EyeOff} 
            iconColorClass="text-purple-400" 
            iconBgClass="bg-purple-500" 
          />
          <StatsCard 
            title="Critical Alerts" 
            value={stats.criticalAlerts} 
            icon={ShieldAlert} 
            iconColorClass="text-critical" 
            iconBgClass="bg-critical" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <RiskChart />
               <LeakageChart />
            </div>
            <div className="glass-panel p-6">
               <h3 className="text-lg font-semibold text-textMain mb-2">System Status</h3>
               <p className="text-sm text-textMuted mb-4">Protection engines are online and actively scanning inputs for unauthorized sensitive data.</p>
               <div className="flex gap-4 flex-wrap">
                  <div className="px-4 py-2 rounded bg-safe/10 border border-safe/20 text-safe text-sm font-medium flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-safe animate-pulse"></span>
                     DLP Engine: Active
                  </div>
                  <div className="px-4 py-2 rounded bg-safe/10 border border-safe/20 text-safe text-sm font-medium flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-safe animate-pulse"></span>
                     NER Models: Online
                  </div>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
             <PrivacyScore />
             <ActivityFeed />
          </div>
        </div>
    </>
  )
}

export default function Dashboard() {
  const { currentView, isNotificationsOpen, toggleNotifications, setNotificationsOpen } = useStore();
  const notifRef = useRef(null);

  useEffect(() => {
    connectMockSocket();
  }, []);

  // Handle clicking outside of notification popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setNotificationsOpen]);

  return (
    <div className="flex min-h-screen bg-background text-textMain max-w-[1920px] mx-auto overflow-x-hidden">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8 ml-0 w-full relative">
        {/* Top Header / Navbar */}
        <header className="flex justify-between items-center mb-8 glass-panel p-4 px-6 z-40">
          <div>
            <h1 className="text-2xl font-bold text-textMain tracking-tight">
               {currentView === 'Dashboard' ? 'Security Overview' : currentView}
            </h1>
            <p className="text-textMuted text-sm mt-1">
               {currentView === 'Dashboard' ? 'Real-time AI prompt firewall monitoring.' : `Manage ${currentView.toLowerCase()} and configurations.`}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative" ref={notifRef}>
                 <button 
                   onClick={toggleNotifications}
                   className={clsx(
                     "relative p-2 rounded-full transition-colors",
                     isNotificationsOpen ? "bg-cardBorder text-textMain" : "hover:bg-cardBorder text-textMuted hover:text-textMain"
                   )}
                 >
                    {isNotificationsOpen ? <BellRing className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                    
                    {/* Unread dot indicator */}
                    {!isNotificationsOpen && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-critical rounded-full animate-pulse border-2 border-background"></span>
                    )}
                 </button>

                 {isNotificationsOpen && (
                    <div className="absolute right-0 top-12 w-80 glass-panel p-4 z-50 shadow-2xl origin-top-right transition-all">
                       <h4 className="font-semibold text-textMain mb-3 flex items-center gap-2">
                           System Alerts
                           <span className="bg-critical/20 text-critical text-xs px-2 py-0.5 rounded font-bold">1 NEW</span>
                       </h4>
                       <div className="space-y-2">
                          <div className="p-3 rounded-lg bg-cardBorder/50 hover:bg-cardBorder transition-colors cursor-pointer border-l-2 border-critical">
                             <p className="text-sm text-textMain font-medium">Critical Pattern Detected</p>
                             <p className="text-xs text-textMuted mt-1">An unusually high volume of PII detected from Marketing API.</p>
                             <p className="text-[10px] text-textMuted mt-2 font-mono">2 mins ago</p>
                          </div>
                          <div className="p-3 rounded-lg bg-cardBorder/20 hover:bg-cardBorder transition-colors cursor-pointer border-l-2 border-warning">
                             <p className="text-sm text-textMain font-medium">System Update Available</p>
                             <p className="text-xs text-textMuted mt-1">New NER engine v2.4.1 is available for deployment.</p>
                             <p className="text-[10px] text-textMuted mt-2 font-mono">1 hr ago</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => setNotificationsOpen(false)}
                         className="w-full mt-3 text-center text-xs text-blue-400 hover:text-blue-300 py-2 border-t border-cardBorder"
                       >
                         Mark all as read
                       </button>
                    </div>
                 )}
             </div>

             <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] cursor-pointer hover:opacity-90 transition-opacity">
               <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                 <span className="font-bold text-sm">US</span>
               </div>
             </div>
          </div>
        </header>

        {/* Dynamic Views Viewport */}
        {currentView === 'Dashboard' && <DashboardGrid />}
        {currentView === 'Incidents' && <Incidents />}
        {currentView === 'Users' && <Users />}
        {currentView === 'Reports' && <Reports />}
        {currentView === 'Settings' && <Settings />}

      </main>
    </div>
  );
}
