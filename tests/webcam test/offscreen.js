// offscreen.js

// Initialize Mediapipe Hands solution
const hands = new Hands({
    locateFile: (file) => `mediapipe/${file}`
  });
  
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  
  hands.onResults(onResults);
  
  // Access the webcam
  const videoElement = document.createElement('video');
  videoElement.style.display = 'none';
  document.body.appendChild(videoElement);
  
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play();
      startDetection();
    })
    .catch((err) => {
      console.error("Error accessing the webcam:", err);
    });
  
  function startDetection() {
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 1280,
      height: 720
    });
    camera.start();
  }
  
  function onResults(results) {
    // Process results and detect gestures
    let gesture = detectGesture(results);
    if (gesture) {
      // Send gesture to the background script
      chrome.runtime.sendMessage({ type: 'gestureDetected', gesture });
    }
  }
  
  function detectGesture(results) {
    // Implement your gesture detection logic here
    if (results.multiHandLandmarks.length > 0) {
      return 'Hand detected';
    } else {
      return null;
    }
  }
  