console.log("ShadowPrompt: content script loaded");

// sanity check: try to access DOM
window.addEventListener("load", () => {
    console.log("ShadowPrompt: page fully loaded");

    const textarea = document.querySelector("textarea");

    if (textarea) {
        console.log("ShadowPrompt: Found input box");
    } else {
        console.log("ShadowPrompt: Input box not found");
    }
});