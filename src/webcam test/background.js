// background.js

console.log('Background script loaded.');

let popupPort = null;

// Handle connections from the popup
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    popupPort = port;
    console.log('Popup connected.');
    port.onDisconnect.addListener(() => {
      console.log('Popup disconnected.');
      popupPort = null;
    });
  }
});

// Handle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background script received message:', message);

  if (message.command === 'startOffscreen') {
    console.log('Attempting to create offscreen document.');

    (async () => {
      try {
        const hasDocument = await chrome.offscreen.hasDocument();
        console.log('Has offscreen document:', hasDocument);

        if (!hasDocument) {
          await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['USER_MEDIA'],
            justification: 'Needed for background processing of hand detection',
          });
          console.log('Offscreen document created.');
        } else {
          console.log('Offscreen document already exists.');
        }

        sendResponse({ success: true });
      } catch (error) {
        console.error('Error creating offscreen document:', error);
        sendResponse({ success: false, error: error.message });
      }
    })();

    return true; // Keep the message channel open for sendResponse
  } else if (message.command === 'stopOffscreen') {
    console.log('Stopping offscreen document.');

    (async () => {
      try {
        const hasDocument = await chrome.offscreen.hasDocument();
        if (hasDocument) {
          await chrome.offscreen.closeDocument();
          console.log('Offscreen document closed.');
        } else {
          console.log('No offscreen document to close.');
        }

        sendResponse({ success: true });
      } catch (error) {
        console.error('Error closing offscreen document:', error);
        sendResponse({ success: false, error: error.message });
      }
    })();

    return true; // Keep the message channel open for sendResponse
  } else if (message.type === 'handData') {
    // Forward hand data to the popup if connected
    if (popupPort) {
      popupPort.postMessage(message);
    } else {
      console.warn('Popup is not connected.');
    }
  }
});
