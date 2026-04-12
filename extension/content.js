alert("ShadowPrompt content is running");
console.log("ShadowPrompt content script loaded");

// Inject script into page context
const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");
script.onload = () => 
  {
    console.log("Injected script appended successfully");
    script.remove();
  };
script.onerror = () =>
{
  console.error("FAILEd to load injected.js");
};

(document.head || document.documentElement).appendChild(script);