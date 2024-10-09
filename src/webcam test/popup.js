// popup.js

// Get references to the DOM elements
const videoElement = document.getElementById('webcamVideo');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');
const handStatusElement = document.getElementById('hand-status');
const gestureDescriptionElement = document.getElementById('gesture-description');

// Start the camera in the popup
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play();
      // Begin rendering the frames
      requestAnimationFrame(renderFrame);
    })
    .catch((err) => {
      console.error('Error accessing the webcam:', err);
      handStatusElement.textContent = 'Error: Could not access webcam';
    });
}

// Render the video frame and overlay landmarks
function renderFrame() {
  // Draw the video frame on the canvas
  canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

  // Convert canvas to base64 image data
  const imageDataURL = canvasElement.toDataURL('image/jpeg'); // This creates a base64 string of the image

  // Send the base64 image data to the server over WebSocket
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(imageDataURL); // Send the image data as a message to the server
  }

  requestAnimationFrame(renderFrame); // Continue rendering frames
}

// Start the camera when the page loads
window.addEventListener('load', startCamera);

// Establish a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000');

// Handle WebSocket connection open
ws.onopen = () => {
  console.log('Connected to WebSocket server.');
};


// Handle incoming messages (gesture predictions) from the server
ws.onmessage = (event) => {
  const gestureData = event.data;  // The detected gesture sent from the server
  gestureDescriptionElement.textContent = `Gesture: ${gestureData}`;  // Display the detected gesture
};


// Handle WebSocket errors
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Handle WebSocket disconnection
ws.onclose = () => {
  console.log('Disconnected from WebSocket server.');
};

// Establish a connection to the background script
// const port = chrome.runtime.connect({ name: 'popup' });

// port.onMessage.addListener((message) => {
//     console.log('Received message from background script:', message);
//     if (message.type === 'handData') {
//       const results = message.data;
//       drawResults(results);
//     }
//   });

// function drawResults(results) {
// console.log('drawResults called with results:', results);
// latestResults = results;
// }
  

// // Start the offscreen document
// chrome.runtime.sendMessage({ command: 'startOffscreen' }, (response) => {
//   if (chrome.runtime.lastError) {
//     console.error('Error sending message:', chrome.runtime.lastError.message);
//   } else if (response && response.success) {
//     console.log('Offscreen document started successfully.');
//   } else {
//     console.error('Failed to start offscreen document:', response.error);
//   }
// });

// // Draw the results on the canvas
// function drawResults(results) {
//   console.log('drawResults called with results:', results);   
//   canvasCtx.save();
//   // Draw the hand landmarks
//   if (results.multiHandLandmarks && results.multiHandedness) {
//     for (let index = 0; index < results.multiHandLandmarks.length; index++) {
//       const landmarks = results.multiHandLandmarks[index];

//       // Draw the hand landmarks
//       drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
//       drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });

//       // Detect if the hand is open or closed
//       const isHandOpen = detectHandOpen(landmarks);
//       const handGesture = isHandOpen ? 'Open Hand' : 'Closed Fist';

//       // Update the hand status element
//       handStatusElement.textContent = `Detected: ${handGesture}`;
//       gestureDescriptionElement.textContent = `Gesture: ${handGesture}`;
//     }
//   } else {
//     handStatusElement.textContent = 'No hand detected';
//     gestureDescriptionElement.textContent = 'Gesture: None';
//   }
//   canvasCtx.restore();
// }

// // Function to detect if hand is open or closed (same as before)
// function detectHandOpen(landmarks) {
//     const fingertips = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
//     const wristY = landmarks[0].y;
    
//     let openFingers = 0;
//     for (let i = 1; i < fingertips.length; i++) {
//         if (landmarks[fingertips[i]].y < wristY) {
//             openFingers++;
//         }
//     }
    
//     // Check thumb separately (based on x-coordinate)
//     if (landmarks[fingertips[0]].x > landmarks[fingertips[0] - 1].x) {
//         openFingers++;
//     }
    
//     return openFingers >= 4; // Consider hand open if at least 4 fingers are open
// }

// // Clean up when the popup is closed
// window.addEventListener('unload', () => {
//   chrome.runtime.sendMessage({ command: 'stopOffscreen' }, (response) => {
//     if (chrome.runtime.lastError) {
//       console.error('Error sending message:', chrome.runtime.lastError.message);
//     } else if (response && response.success) {
//       console.log('Offscreen document stopped successfully.');
//     } else {
//       console.error('Failed to stop offscreen document:', response.error);
//     }
//   });
// });
