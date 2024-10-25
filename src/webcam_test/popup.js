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

      setInterval(sendImageToServer, 100);
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
  // const imageDataURL = canvasElement.toDataURL('image/jpeg'); // This creates a base64 string of the image

  // // Send the base64 image data to the server over WebSocket
  // if (ws.readyState === WebSocket.OPEN) {
  //   ws.send(imageDataURL); // Send the image data as a message to the server
  // }

  requestAnimationFrame(renderFrame); // Continue rendering frames
}

function sendImageToServer() {
  // Convert canvas to base64 image data
  const imageDataURL = canvasElement.toDataURL('image/jpeg'); // This creates a base64 string of the image

  // Send the base64 image data to the server over WebSocket
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(imageDataURL); // Send the image data as a message to the server
  }
}

// Start the camera when the page loads
window.addEventListener('load', startCamera);

// Establish a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000/ws');

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

