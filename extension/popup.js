document.addEventListener('DOMContentLoaded', () => {
    // Generate some fake stats on open to simulate live usage
    const scanned = Math.floor(Math.random() * 100) + 1200;
    const sensitive = Math.floor(Math.random() * 10) + 40;
    const critical = Math.floor(Math.random() * 3) + 1;

    document.getElementById('scannedCount').innerText = scanned.toLocaleString();
    document.getElementById('sensitiveCount').innerText = sensitive.toLocaleString();
    document.getElementById('criticalCount').innerText = critical.toLocaleString();

    document.getElementById('openDashboard').addEventListener('click', () => {
        // In a real scenario, this links to the web app dashboard.
        // For the hackathon, we simulate opening a new tab to localhost:5173
        chrome.tabs.create({ url: "http://localhost:5173" });
    });

    const toggle = document.getElementById('protectionToggle');
    toggle.addEventListener('change', (e) => {
        const isProtected = e.target.checked;
        if (isProtected) {
            chrome.action.setBadgeText({ text: 'ON' });
            chrome.action.setBadgeBackgroundColor({ color: '#10B981' });
        } else {
            chrome.action.setBadgeText({ text: 'OFF' });
            chrome.action.setBadgeBackgroundColor({ color: '#EF4444' });
        }
    });

    // Initial state
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#10B981' });
});
