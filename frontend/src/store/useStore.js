import { create } from 'zustand';

const useStore = create((set) => ({
  stats: {
    totalPrompts: 12500,
    sensitivePrompts: 342,
    maskedItems: 890,
    criticalAlerts: 12,
    riskDistribution: {
      safe: 12158,
      sensitive: 330,
      critical: 12,
    },
    leakageTypes: [
      { name: 'Phone', value: 320 },
      { name: 'Name', value: 250 },
      { name: 'Financial', value: 180 },
      { name: 'Company', value: 140 },
    ],
    privacyScore: 92,
  },
  activities: [],
  isProtectionActive: true,
  
  // Navigation State
  currentView: 'Dashboard',
  isNotificationsOpen: false,

  setCurrentView: (view) => set({ currentView: view }),
  toggleNotifications: () => set((state) => ({ isNotificationsOpen: !state.isNotificationsOpen })),
  setNotificationsOpen: (isOpen) => set({ isNotificationsOpen: isOpen }),

  setStats: (newStats) => set({ stats: newStats }),
  addActivity: (activity) => set((state) => ({ 
    activities: [activity, ...state.activities].slice(0, 100) 
  })),
  toggleProtection: () => set((state) => ({ isProtectionActive: !state.isProtectionActive })),
}));

export default useStore;
