// Import necessary MediaPipe libraries
import * as mp from '@mediapipe/hands';
import * as drawingUtils from '@mediapipe/drawing_utils';
import { Camera } from '@mediapipe/camera_utils';

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
function detectHandOpen(landmarks) {
  const fingertips = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
  const wristY = landmarks[0].y;
  
  let openFingers = 0;
  for (let i = 1; i < fingertips.length; i++) {
    if (landmarks[fingertips[i]].y < wristY) {
      openFingers++;
    }
  }
  
  // Check thumb separately (based on x-coordinate)
  if (landmarks[fingertips[0]].x > landmarks[fingertips[0] - 1].x) {
    openFingers++;
  }
  
  return openFingers >= 4; // Consider hand open if at least 4 fingers are open
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