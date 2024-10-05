// content_script.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'gestureDetected') {
      // Control the video based on the gesture
      const gesture = message.gesture;
      handleGesture(gesture);
    }
  });
  
  function handleGesture(gesture) {
    // Implement video control logic here
    if (gesture === 'Hand detected') {
      // For example, pause the video
      const video = document.querySelector('video');
      if (video) {
        video.pause();
      }
    }
  }
  
  // Start gesture detection when the content script loads
  chrome.runtime.sendMessage({ type: 'startGestureDetection' });
  