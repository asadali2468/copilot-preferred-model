const modeSelect = document.getElementById("preferredMode");
const saveBtn = document.getElementById("save");
const statusEl = document.getElementById("status");

function setStatus(s) {
  statusEl.textContent = s || "";
}

function populateModes(modes) {
  modeSelect.innerHTML = "";
  if (!modes || modes.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No modes found";
    modeSelect.appendChild(opt);
    return;
  }
  modes.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.label;
    opt.textContent = m.label + (m.checked ? " • (current)" : "");
    modeSelect.appendChild(opt);
  });
  // Restore saved
  chrome.storage.sync.get(["preferredModeLabel"], (res) => {
    if (res.preferredModeLabel) {
      modeSelect.value = res.preferredModeLabel;
    }
  });
}

function requestModesOnActiveTab(cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs && tabs[0];
    
    // --- MODIFIED SECTION ---
    // Check if the current tab is NOT a Copilot tab
    if (!tab || !/https:\/\/copilot\.microsoft\.com/.test(tab.url)) {
      setStatus("This extension only works on a copilot.microsoft.com tab.");
      // The elements are already disabled by the HTML, but this makes it explicit.
      modeSelect.disabled = true;
      saveBtn.disabled = true;
      return; // Stop here
    }
    // --- END OF MODIFIED SECTION ---

    // If it is a Copilot tab, enable the controls
    modeSelect.disabled = false;
    saveBtn.disabled = false;
    
    // Proceed to fetch the modes
    chrome.tabs.sendMessage(tab.id, { type: "REQUEST_MODES" }, (resp) => {
      if (chrome.runtime.lastError) {
        setStatus("Reload Copilot tab and try again.");
        populateModes([]);
        return;
      }
      if (resp && resp.ok) {
        populateModes(resp.modes || []);
        setStatus(""); // Clear any previous status message
        if (cb) cb(tab.id);
      } else {
        setStatus("Could not read modes.");
        populateModes([]);
      }
    });
  });
}

saveBtn.addEventListener("click", () => {
  const label = modeSelect.value;
  if (!label) return;

  // 1. Save the new preferred mode to storage
  chrome.storage.sync.set({ preferredModeLabel: label }, () => {
    saveBtn.textContent = "Saved ✓";
    setTimeout(() => (saveBtn.textContent = "SAVE MODE"), 1200);

    // 2. Find the active Copilot tab and reload it
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs && tabs[0];
      // Check if the tab is valid and is a Copilot URL before reloading
      if (tab && tab.id && /https:\/\/copilot\.microsoft\.com/.test(tab.url)) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});

// Initial load: fetch modes and check tab validity
requestModesOnActiveTab();