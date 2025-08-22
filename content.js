// content.js v7 — Fixes focus issue by closing menu on next event loop tick
(function () {
  const LOG_PREFIX = "[Copilot Mode Auto-Select]";
  const log = (...a) => console.log(LOG_PREFIX, ...a);

  const MENU_SELECTOR = '[data-testid="composer-mode-menu"]';
  const MODE_BUTTONS_SELECTOR = '[data-testid$="-mode-option"][role="radio"]';

  let openerButton = null;

  async function openModeMenu({ attempts = 8, delayMs = 300 } = {}) {
    if (document.querySelector(MENU_SELECTOR)) return true;

    for (let i = 0; i < attempts; i++) {
      const candidates = Array.from(document.querySelectorAll('button,[role="button"]')).filter(el => {
        const t = (el.innerText || el.textContent || "").toLowerCase();
        const al = (el.getAttribute("aria-label") || "").toLowerCase();
        const ti = (el.getAttribute("title") || "").toLowerCase();
        const dt = (el.getAttribute("data-testid") || "").toLowerCase();
        return (
          /mode|model/.test(t) || /mode|model/.test(al) || /mode|model/.test(ti) ||
          /mode/.test(dt) ||
          /quick response|think deeper|smart/.test(t)
        );
      });

      const opener = candidates.find(el => el.offsetParent !== null || el.getClientRects().length);
      
      if (opener) {
        openerButton = opener;
        openerButton.click();
      }

      const ok = await waitFor(() => document.querySelector(MENU_SELECTOR), delayMs);
      if (ok) return true;
      await sleep(delayMs);
    }
    log("Failed to open mode menu with heuristics.");
    return !!document.querySelector(MENU_SELECTOR);
  }

  async function closeModeMenu() {
    if (!document.querySelector(MENU_SELECTOR)) return;

    if (openerButton) {
        openerButton.click();
        await sleep(200);
        if (!document.querySelector(MENU_SELECTOR)) return;
    }

    document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true,
    }));
    await sleep(200);
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  async function waitFor(fn, timeoutMs = 500, steps = 5) {
    for (let i = 0; i < steps; i++) {
      const v = typeof fn === "function" ? fn() : document.querySelector(fn);
      if (v) return v;
      await sleep(timeoutMs / steps);
    }
    return null;
  }

  // --- MODIFIED SECTION ---
  // Scrape modes and schedule the menu to close immediately after
  async function getModes() {
    const wasAlreadyOpen = !!document.querySelector(MENU_SELECTOR);
    if (!wasAlreadyOpen) {
      const opened = await openModeMenu({ attempts: 4, delayMs: 300 });
      if (!opened) {
        log("Could not open menu to get modes.");
        return [];
      }
    }

    const buttons = Array.from(document.querySelectorAll(MODE_BUTTONS_SELECTOR));
    const modes = buttons.map(btn => {
      const label = (btn.getAttribute("title") || btn.innerText || btn.textContent || "").trim();
      const checked = (btn.getAttribute("aria-checked") || "").toLowerCase() === "true";
      return { label, checked };
    }).filter(m => m.label);

    if (!wasAlreadyOpen) {
      // THIS IS THE FIX: Schedule the close function to run immediately
      // after the current task (sending data back) is finished.
      setTimeout(closeModeMenu, 0);
    }
    
    return modes;
  }
  // --- END OF MODIFIED SECTION ---


  // Apply a mode and ensure the menu is closed afterward
  async function applyMode(label) {
    if (!label) return false;
    
    const currentModeButton = document.querySelector(`${MODE_BUTTONS_SELECTOR}[aria-checked="true"]`);
    const currentModeLabel = (currentModeButton?.getAttribute("title") || currentModeButton?.innerText || "").trim().toLowerCase();
    if (currentModeLabel.includes(label.toLowerCase())) {
        log("Preferred mode already applied.");
        return true;
    }

    const wasAlreadyOpen = !!document.querySelector(MENU_SELECTOR);
    if (!wasAlreadyOpen) {
      await openModeMenu({ attempts: 6, delayMs: 250 });
    }

    const buttons = Array.from(document.querySelectorAll(MODE_BUTTONS_SELECTOR));
    const lower = label.toLowerCase();
    const target = buttons.find(btn => {
      const txt = (btn.getAttribute("title") || btn.innerText || btn.textContent || "").trim().toLowerCase();
      return txt.includes(lower);
    });

    if (target) {
      target.click();
      log("Applied mode:", label);
      await sleep(200);
      setTimeout(closeModeMenu, 0); // Use the same fix here for consistency
      return true;
    }
    
    log("Mode not found:", label);
    if (!wasAlreadyOpen) {
      setTimeout(closeModeMenu, 0);
    }
    return false;
  }

  // On page load, auto-apply saved preference
  chrome.storage.sync.get(["preferredModeLabel"], async (res) => {
    const pref = res?.preferredModeLabel;
    if (!pref) return;
    let tries = 0;
    const maxTries = 12;
    const interval = setInterval(async () => {
      tries++;
      const ok = await applyMode(pref);
      if (ok || tries >= maxTries) clearInterval(interval);
    }, 1000);
  });

  // Handle popup requests
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || !msg.type) return;
    if (msg.type === "REQUEST_MODES") {
      (async () => {
        const modes = await getModes();
        sendResponse({ ok: true, modes });
      })();
      return true;
    }
    if (msg.type === "APPLY_MODE") {
      (async () => {
        const ok = await applyMode(msg.label);
        sendResponse({ ok });
      })();
      return true;
    }
  });
})();