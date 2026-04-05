export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: 'rgba(255, 255, 255, 0.03)',
        cardBorder: 'rgba(255, 255, 255, 0.05)',
        textMain: '#F8FAFC',
        textMuted: '#94A3B8',
        safe: '#10B981',
        warning: '#F59E0B',
        critical: '#EF4444',
      }
    },
  },
  plugins: [],
}
