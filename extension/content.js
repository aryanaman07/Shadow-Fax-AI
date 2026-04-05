// Mock content script to detect typing
let scanTimeout;

document.addEventListener('input', (e) => {
    const target = e.target;
    // Only monitor textareas or large input fields
    if (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && target.type === 'text')) {
        
        clearTimeout(scanTimeout);
        
        scanTimeout = setTimeout(() => {
            const val = target.value;
            // Extremely basic regex mocking identifying a phone number or SSN/Credit Card format
            const sensitivePattern = /(\d{3}[-\.\s]\d{3}[-\.\s]\d{4})|(\d{4}[-\.\s]\d{4}[-\.\s]\d{4})|(\bpass\w*\b)/i;
            
            if (sensitivePattern.test(val)) {
                showWarningOverlay(target, "⚠️ Sensitive Activity Blocked by ShadowPrompt");
            } else {
                removeWarningOverlay(target);
            }
        }, 500);
    }
});

function showWarningOverlay(element, message) {
    if (element.dataset.spWarning) return;
    
    element.dataset.spWarning = "true";
    element.style.border = "2px solid rgba(239, 68, 68, 0.8)";
    element.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.5)";

    const warningInfo = document.createElement('div');
    warningInfo.className = 'sp-warning-badge';
    warningInfo.innerHTML = `
        <div style="
            position: absolute;
            background: linear-gradient(90deg, #ef4444, #dc2626);
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-family: sans-serif;
            font-weight: bold;
            z-index: 999999;
            transform: translateY(-110%);
            pointer-events: none;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
            ${message}
        </div>
    `;

    // Try to append relative to element wrapper
    const rect = element.getBoundingClientRect();
    element.parentNode.style.position = element.parentNode.style.position === 'static' ? 'relative' : element.parentNode.style.position;
    element.parentNode.insertBefore(warningInfo, element);
}

function removeWarningOverlay(element) {
    if (!element.dataset.spWarning) return;
    element.style.border = "";
    element.style.boxShadow = "";
    delete element.dataset.spWarning;
    
    const banner = element.parentNode.querySelector('.sp-warning-badge');
    if (banner) banner.remove();
}
