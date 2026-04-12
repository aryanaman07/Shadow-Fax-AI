console.log("ShadowPrompt injected script loaded");

// -----------------------------
// 🔍 DETECT
// -----------------------------
function detectSensitive(text) {
  const patterns = {
    email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    phone: /\b\d{10}\b/,
    apiKey: /\b(sk-[a-zA-Z0-9]{20,})\b/
  };

  return Object.keys(patterns).filter((k) => patterns[k].test(text));
}

// -----------------------------
// 🧼 SANITIZE
// -----------------------------
function sanitize(text) {
  return text
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[EMAIL]")
    .replace(/\b\d{10}\b/g, "[PHONE]")
    .replace(/\b(sk-[a-zA-Z0-9]{20,})\b/g, "[API_KEY]");
}

// -----------------------------
// 🧠 EXTRACT PROMPT (ChatGPT format)
// -----------------------------
function extractPrompt(body) {
  try {
    return body?.messages?.slice(-1)[0]?.content?.parts?.[0] || "";
  } catch {
    return "";
  }
}

// -----------------------------
// 🧠 REPLACE PROMPT
// -----------------------------
function replacePrompt(body, newText) {
  try {
    body.messages[body.messages.length - 1].content.parts[0] = newText;
  } catch {}
  return body;
}

// -----------------------------
// 🚫 FETCH INTERCEPT (REAL ONE)
// -----------------------------
const originalFetch = window.fetch;

window.fetch = async function (...args) {
  let [url, config] = args;

  try {
    if (config?.body && typeof config.body === "string")
    {
      let body;
      try
      {
        body = JSON.parse(config.body);
      }
      catch
      {
        return originalFetch.apply(this, args); //skip non-JSON
      }

      const prompt = extractPrompt(body);

      if (prompt) {
        console.log("Captured prompt:", prompt);

        const issues = detectSensitive(prompt);

        if (issues.length > 0) {
          console.log("Sensitive detected:", issues);

          const cleaned = sanitize(prompt);

          body = replacePrompt(body, cleaned);
          config.body = JSON.stringify(body);

          alert("Sensitive data detected: " + issues.join(", "));
        }
      }
    }
  } catch (err) {
    console.log("Intercept error:", err);
  }

  return originalFetch.apply(this, [url, config]);
};