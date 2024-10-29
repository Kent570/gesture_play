// background.js

// Check if the offscreen document is already created
async function ensureOffscreenDocument() {
    const offscreenUrl = 'offscreen.html';
    const existingClients = await clients.matchAll();
    for (const client of existingClients) {
      if (client.url.includes(offscreenUrl)) {
        return;
      }
    }
    // Create the offscreen document
    await chrome.offscreen.createDocument({
      url: offscreenUrl,
      reasons: ['DISPLAY_MEDIA'],
      justification: 'Run hand gesture detection'
    });
  }
  
  // Listen for messages from content scripts or the offscreen document
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'gestureDetected') {
      // Forward the gesture to content scripts or popup
      chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
          chrome.tabs.sendMessage(tab.id, { type: 'gestureDetected', gesture: message.gesture });
        }
      });
    } else if (message.type === 'startGestureDetection') {
      ensureOffscreenDocument();
    }
  });
  