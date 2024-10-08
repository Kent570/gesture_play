// background.js

// Listen for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle different commands based on the message received
    if (message.command === "play" || message.command === "pause" || 
        message.command === "seek" || message.command === "mute" || 
        message.command === "fullscreen") {
      
      // Send the message to the active tab's content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
            if (response) {
              console.log("Response from content script: ", response);
            }
          });
        }
      });
    }
    // Respond back to the sender (optional)
    sendResponse({ status: "command received" });
    return true;  // Required for async sendResponse
  });
  