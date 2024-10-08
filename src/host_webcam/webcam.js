// webcam.js

console.log('webcam.js loaded.');

// Get references to the DOM elements
const videoElement = document.getElementById('webcamVideo');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');
const handStatusElement = document.getElementById('hand-status');
const gestureDescriptionElement = document.getElementById('gesture-description');

// Initialize Socket.IO client
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to the local server.');
  handStatusElement.textContent = 'Connected to server. Initializing...';
});

socket.on('connect_error', (error) => {
  console.error('Failed to connect to the server:', error);
  handStatusElement.textContent = 'Error: Cannot connect to the server';
});

socket.on('predictions', (predictions) => {
  drawResults(predictions);
});

// Start the camera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      processVideoFrame();
    };
  } catch (err) {
    console.error('Error accessing the webcam:', err.name, err.message);
    handStatusElement.textContent = `Error: Could not access webcam (${err.name}: ${err.message})`;
  }
}

// Capture and send video frames to the server
function processVideoFrame() {
  canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  const imageData = canvasElement.toDataURL('image/jpeg', 0.5); // Adjust quality as needed

  // Send the frame to the server
  socket.emit('frame', imageData);

  requestAnimationFrame(processVideoFrame);
}

// Draw the results on the canvas
function drawResults(predictions) {
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      const landmarks = predictions[i].landmarks;
      drawHand(landmarks);

      // Detect if the hand is open or closed
      const isHandOpen = detectHandOpen(landmarks);
      const handGesture = isHandOpen ? 'Open Hand' : 'Closed Fist';

      // Update the hand status element
      handStatusElement.textContent = `Detected: ${handGesture}`;
      gestureDescriptionElement.textContent = `Gesture: ${handGesture}`;
    }
  } else {
    handStatusElement.textContent = 'No hand detected';
    gestureDescriptionElement.textContent = 'Gesture: None';
  }
}

// Function to draw hand landmarks
function drawHand(landmarks) {
  canvasCtx.fillStyle = 'red';
  for (let i = 0; i < landmarks.length; i++) {
    const x = landmarks[i][0];
    const y = landmarks[i][1];
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
    canvasCtx.fill();
  }
}

// Function to detect if hand is open or closed
function detectHandOpen(landmarks) {
  // Implement your gesture detection logic here
  // For example, using the distance between landmarks
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];
  const wrist = landmarks[0];

  let openFingers = 0;

  // Check distances from wrist to fingertips
  if (distance(wrist, thumbTip) > distance(wrist, landmarks[3])) openFingers++;
  if (distance(wrist, indexTip) > distance(wrist, landmarks[7])) openFingers++;
  if (distance(wrist, middleTip) > distance(wrist, landmarks[11])) openFingers++;
  if (distance(wrist, ringTip) > distance(wrist, landmarks[15])) openFingers++;
  if (distance(wrist, pinkyTip) > distance(wrist, landmarks[19])) openFingers++;

  return openFingers >= 4; // Consider hand open if at least 4 fingers are open
}

function distance(pointA, pointB) {
  const dx = pointA[0] - pointB[0];
  const dy = pointA[1] - pointB[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// Start the camera when the page loads
window.addEventListener('load', startCamera);
