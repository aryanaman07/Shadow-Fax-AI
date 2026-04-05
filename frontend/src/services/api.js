import useStore from '../store/useStore';

const MOCK_DATA_SETS = [
  { text: "Can you review this code containing auth logic?", risk: "Safe", entities: [] },
  { text: "Customer John Doe (555-0199) requested a refund.", risk: "Sensitive", entities: ["PHONE", "NAME"] },
  { text: "Here is my credit card 4111-2222-3333-4444.", risk: "Critical", entities: ["CREDIT_CARD"] },
  { text: "Write an email to our competitor about the upcoming merger.", risk: "Critical", entities: ["MERGER_INFO"] },
  { text: "Translate 'Hello world' to Spanish.", risk: "Safe", entities: [] },
  { text: "My password for the database is pass123.", risk: "Sensitive", entities: ["PASSWORD"] },
  { text: "Our application server is running at 192.168.1.15.", risk: "Sensitive", entities: ["IP_ADDRESS"] },
  { text: "Can you write a poem about artificial intelligence?", risk: "Safe", entities: [] },
  { text: "Please summarize the Q3 financial report.", risk: "Safe", entities: [] },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMockActivity() {
  const item = MOCK_DATA_SETS[randomInt(0, MOCK_DATA_SETS.length - 1)];

  return {
    id: Date.now().toString() + randomInt(1000, 9999).toString(),
    timestamp: new Date().toISOString(),
    text: item.text,
    risk: item.risk,
    entities: item.entities,
  };
}

// Simulates a WebSocket connection
export function connectMockSocket() {
  setInterval(() => {
    const store = useStore.getState();
    if (!store.isProtectionActive) return;

    // 1. Generate new activity
    const newActivity = generateMockActivity();
    store.addActivity(newActivity);

    // 2. Update stats slightly to represent live changes
    const currentStats = { ...store.stats };
    currentStats.totalPrompts += 1;
    
    if (newActivity.risk === 'Sensitive') {
      currentStats.sensitivePrompts += 1;
      currentStats.riskDistribution.sensitive += 1;
      currentStats.maskedItems += newActivity.entities.length;
    } else if (newActivity.risk === 'Critical') {
      currentStats.criticalAlerts += 1;
      currentStats.riskDistribution.critical += 1;
      currentStats.sensitivePrompts += 1; // Critical is also sensitive
      currentStats.maskedItems += newActivity.entities.length;
    } else {
      currentStats.riskDistribution.safe += 1;
    }

    // Dynamic privacy score based on recent simple ratio
    const totalRisky = currentStats.riskDistribution.sensitive + currentStats.riskDistribution.critical;
    const safeRatio = currentStats.riskDistribution.safe / Math.max(currentStats.totalPrompts, 1);
    currentStats.privacyScore = Math.round(safeRatio * 100);

    // Minor randomization of leakage types for movement feeling
    if (newActivity.entities.length > 0 && Math.random() > 0.5) {
       const lTypes = [...currentStats.leakageTypes];
       const typeToIncrement = randomInt(0, lTypes.length - 1);
       lTypes[typeToIncrement] = {
           ...lTypes[typeToIncrement],
           value: lTypes[typeToIncrement].value + 1
       };
       currentStats.leakageTypes = lTypes;
    }

    store.setStats(currentStats);

  }, 3000); // Poll every 3s
}
