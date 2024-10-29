// popup.js

const gestureStatus = document.getElementById('gestureStatus');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'gestureDetected') {
    gestureStatus.textContent = `Gesture: ${message.gesture}`;
  }
});
