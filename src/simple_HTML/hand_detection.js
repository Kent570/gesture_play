// Import necessary MediaPipe libraries
import * as mp from '@mediapipe/hands';
import * as drawingUtils from '@mediapipe/drawing_utils';

const videoElement = document.createElement('video');
const canvasElement = document.createElement('canvas');
const canvasCtx = canvasElement.getContext('2d');

// Initialize MediaPipe Hands solution
const hands = new mp.Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);

// Start webcam
navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
  videoElement.srcObject = stream;
  videoElement.play();
});

// Main processing function
function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawingUtils.drawConnectors(canvasCtx, landmarks, mp.HAND_CONNECTIONS,
                                 {color: '#00FF00', lineWidth: 5});
      drawingUtils.drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
      
      const isHandOpen = detectHandOpen(landmarks);
      console.log(`Hand is ${isHandOpen ? 'open' : 'closed'}`);
    }
  }
  
  canvasCtx.restore();
}

// Function to detect if hand is open or closed
// Function to detect if hand is fully open
function detectHandOpen(landmarks) {
  const fingertips = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
  const knuckles = [2, 6, 10, 14, 18];   // Corresponding knuckles of the fingers
  let openFingers = 0;

  // Check if all fingers are extended (fingertip higher than knuckle in y-axis)
  for (let i = 1; i < fingertips.length; i++) {
    if (landmarks[fingertips[i]].y < landmarks[knuckles[i]].y) {
      openFingers++;
    }
  }

  // Check if thumb is extended (consider both x and y positions)
  // Thumb tip should be farther to the right (x) and above (y) than its knuckle
  if (landmarks[fingertips[0]].x > landmarks[knuckles[0]].x &&
      landmarks[fingertips[0]].y < landmarks[knuckles[0]].y) {
    openFingers++;
  }

  // Return true only if all five fingers are open
  return openFingers === 5;
}


// Start detection
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();