const gestureDisplay = document.getElementById('gesture');
const videoElement = document.getElementById('webcamVideo');
const canvasElement = document.getElementById('output-canvas');
// const canvasCtx = canvasElement.getContext('2d');


// Request access to the camera (independent of WebSocket)
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
  // Handle the stream
  const videoElement = document.createElement('video');
  videoElement.srcObject = stream;
  videoElement.play();
})
.catch(err => {
  if (err.name === 'NotAllowedError') {
    console.error('Camera access was denied by the user.');
    gestureDisplay.textContent = 'Please enable camera permissions for this site.';
  } else if (err.name === 'NotFoundError') {
    console.error('No camera devices were found.');
    gestureDisplay.textContent = 'No camera devices detected.';
  } else {
    console.error(`Error accessing camera: ${err.name}, ${err.message}`);
    gestureDisplay.textContent = `Error accessing camera: ${err.name}, ${err.message}`;
  }
});

// // Establish a WebSocket connection to the server
// const ws = new WebSocket('ws://localhost:3000');

// // Handle WebSocket connection open
// ws.onopen = () => {
//   console.log('Connected to WebSocket server.');
// };


// // Handle incoming messages (gesture predictions) from the server
// ws.onmessage = (event) => {
//   const gestureData = event.data;  // The detected gesture sent from the server
//   gestureDisplay.textContent = `Gesture: ${gestureData}`;  // Display the detected gesture
// };

// // Handle WebSocket errors
// ws.onerror = (error) => {
//   console.error('WebSocket error:', error);
// };

// // Handle WebSocket disconnection
// ws.onclose = () => {
//   console.log('Disconnected from WebSocket server.');
// };
