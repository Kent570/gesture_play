// offscreen.js

console.log('Offscreen script loaded.');

try {
  // Initialize Mediapipe Hands
  const hands = new Hands({
    locateFile: (file) => {
      return chrome.runtime.getURL(`mediapipe/hands/${file}`);
    },
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  hands.onResults(onResults);

  // Start the camera
  const videoElement = document.createElement('video');
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });
  camera.start();
} catch (error) {
  console.error('Error in offscreen script:', error);
}

// Handle results
function onResults(results) {
  // Send results to the background script
  chrome.runtime.sendMessage({ type: 'handData', data: results }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error sending hand data:', chrome.runtime.lastError.message);
    }
  });
}
