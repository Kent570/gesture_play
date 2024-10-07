// offscreen.js

console.log('Offscreen script loaded.');

function onResults(results) {
  console.log('offscreen.js - onResults called with results:', results);
  // Send results to the background script
  chrome.runtime.sendMessage({ type: 'handData', data: results }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error sending hand data:', chrome.runtime.lastError.message);
    }
  });
}

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

  // Add event listener to play the video once it's ready
  videoElement.addEventListener('loadedmetadata', () => {
    videoElement.play().then(() => {
      console.log('Offscreen script - Video is playing.');
    }).catch((error) => {
      console.error('Offscreen script - Error playing video:', error);
    });
  });

  // Try to access the camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;

      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      camera.start();

      console.log('Offscreen script - Camera started successfully.');
    })
    .catch((err) => {
      console.error('Offscreen script - Error accessing the webcam:', err);
    });
} catch (error) {
  console.error('Error in offscreen script:', error);
}
