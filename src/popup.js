// popup.js

// Get references to the DOM elements
const videoElement = document.createElement('video');
// const videoElement = document.getElementById('webcamVideo');
const canvasElement = document.createElement('canvas');
// const canvasElement = document.getElementById('output-canvas');
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

      setInterval(sendImageToServer, 300);
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

function turnOffCamera() {  // Fixed function name
  if (videoElement.srcObject) {
    // Get the video stream tracks and stop each one
    videoElement.srcObject.getTracks().forEach((track) => {
      track.stop();
    });

    // Clear the video element’s source and stop playing
    videoElement.srcObject = null;
    videoElement.pause();
    videoElement.load();
    console.log("Camera turned off.");
  } else {
    console.log("No camera to turn off.");
  }
}

// Start the camera when the page loads
// window.addEventListener('load', startCamera);
function turncamon(){
  if(camera_on_bool == true){
    startCamera();
    camera_on_bool = false;
  }
}

function turncamoff(){
  if(camera_off_bool == true){
    turnOffCamera();
    camera_off_bool = false;
  }
}

const intervalId4 = setInterval(turncamon, 100);
const intervalId5 = setInterval(turncamoff, 100);

// Establish a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000/ws');

// Handle WebSocket connection open
ws.onopen = () => {
  console.log('Connected to WebSocket server.');
};
var gesture_var
// Handle incoming messages (gesture predictions) from the server
ws.onmessage = (event) => {
  const gestureData = event.data;  // The detected gesture sent from the server
  // gestureDescriptionElement.textContent = `Gesture: ${gestureData}`;  // Display the detected gesture
  if(gestureData == 0){
    gesture_var = 0;
  }
  else if(gestureData == 1){
    gesture_var = 1;
  }
  else if(gestureData == 2){
    gesture_var = 2;
  }
  else if(gestureData == 3){
    gesture_var = 3;
  }
  else if(gestureData == 4){
    gesture_var = 4;
  }
  else if(gestureData == 5){
    gesture_var = 5;
  }
  else if(gestureData == 6){
    gesture_var = 6;
  }
  else if(gestureData == 7){
    gesture_var = 7;
  }
  // alert(gestureData)
};


// Handle WebSocket errors
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Handle WebSocket disconnection
ws.onclose = () => {
  console.log('Disconnected from WebSocket server.');
};

