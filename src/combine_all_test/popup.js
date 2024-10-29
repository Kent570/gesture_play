// popup.js


function showQuestionMark() {
  // Create a div for the question mark
  let questionMark = document.createElement("div");
  // Set the styles for the question mark
  questionMark.textContent = "?";
  questionMark.style.fontSize = "500px"; // Big question mark
  questionMark.style.color = "red";
  questionMark.style.position = "absolute";
  questionMark.style.left = "50%"; // Center horizontally
  questionMark.style.top = "50%"; // Center vertically
  questionMark.style.transform = "translate(-50%, -50%)"; // Offset to center exactly
  questionMark.style.zIndex = "10001"; // Above other elements
  questionMark.style.pointerEvents = "none"; // No interaction
  // Add the question mark to the body
  document.body.appendChild(questionMark);
  // Remove the question mark after 1 second
  setTimeout(() => {
    document.body.removeChild(questionMark);
  }, 1000);
}

function showcamon() {
  // Create a div for the question mark
  let camon = document.createElement("div");
  // Set the styles for the question mark
  camon.textContent = "CAMERA ON";
  camon.style.fontSize = "100px"; // Big question mark
  camon.style.color = "red";
  camon.style.position = "absolute";
  camon.style.left = "50%"; // Center horizontally
  camon.style.top = "50%"; // Center vertically
  camon.style.transform = "translate(-50%, -50%)"; // Offset to center exactly
  camon.style.zIndex = "10001"; // Above other elements
  camon.style.pointerEvents = "none"; // No interaction
  // Add the question mark to the body
  document.body.appendChild(camon);
  // Remove the question mark after 1 second
  setTimeout(() => {
    document.body.removeChild(camon);
  }, 1000);
}

function showcamoff() {
  // Create a div for the question mark
  let camoff = document.createElement("div");
  // Set the styles for the question mark
  camoff.textContent = "CAMERA OFF";
  camoff.style.fontSize = "100px"; // Big question mark
  camoff.style.color = "red";
  camoff.style.position = "absolute";
  camoff.style.left = "50%"; // Center horizontally
  camoff.style.top = "50%"; // Center vertically
  camoff.style.transform = "translate(-50%, -50%)"; // Offset to center exactly
  camoff.style.zIndex = "10001"; // Above other elements
  camoff.style.pointerEvents = "none"; // No interaction
  // Add the question mark to the body
  document.body.appendChild(camoff);
  // Remove the question mark after 1 second
  setTimeout(() => {
    document.body.removeChild(camoff);
  }, 1000);
}

function showVideoWord() {
  // Create a div for the word 'VIDEO'
  let videoWord = document.createElement("div");
  // Set the styles for the word 'VIDEO'
  videoWord.textContent = "VIDEO";
  videoWord.style.fontSize = "100px"; // Big text size
  videoWord.style.color = "purple"; // You can change the color if desired
  videoWord.style.position = "absolute";
  videoWord.style.left = "50%"; // Center horizontally
  videoWord.style.top = "50%"; // Center vertically
  videoWord.style.transform = "translate(-50%, -50%)"; // Offset to center perfectly
  videoWord.style.zIndex = "10001"; // Above other elements
  videoWord.style.pointerEvents = "none"; // No interaction
  // Add the word 'VIDEO' to the body
  document.body.appendChild(videoWord);
  // Remove the word 'VIDEO' after 1 second
  setTimeout(() => {
    document.body.removeChild(videoWord);
  }, 1000);
}

function showCursorWord() {
  // Create a div for the word 'CURSOR'
  let cursorWord = document.createElement("div");
  // Set the styles for the word 'CURSOR'
  cursorWord.textContent = "CURSOR";
  cursorWord.style.fontSize = "100px"; // Big text size
  cursorWord.style.color = "orange"; // You can change the color if desired
  cursorWord.style.position = "absolute";
  cursorWord.style.left = "50%"; // Center horizontally
  cursorWord.style.top = "50%"; // Center vertically
  cursorWord.style.transform = "translate(-50%, -50%)"; // Offset to center perfectly
  cursorWord.style.zIndex = "10001"; // Above other elements
  cursorWord.style.pointerEvents = "none"; // No interaction
  // Add the word 'CURSOR' to the body
  document.body.appendChild(cursorWord);
  // Remove the word 'CURSOR' after 1 second
  setTimeout(() => {
    document.body.removeChild(cursorWord);
  }, 1000);
}


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

// Start the camera when the page loads
// window.addEventListener('load', startCamera);
startCamera();

// Establish a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000/ws');

// Handle WebSocket connection open
ws.onopen = () => {
  console.log('Connected to WebSocket server.');
};

// Handle incoming messages (gesture predictions) from the server
ws.onmessage = (event) => {
  const gestureData = event.data;  // The detected gesture sent from the server
  // gestureDescriptionElement.textContent = `Gesture: ${gestureData}`;  // Display the detected gesture
  if(gestureData == 0){
    showQuestionMark();
  }
  else if(gestureData == 1){
    showCursorWord();
  }
  else if(gestureData == 2){
    showVideoWord();
  }
  else if(gestureData == 3){
    showcamoff();
  }
  else if(gestureData == 4){
    showcamon();
  }
  else if(gestureData == 5){
    alert("5");
  }
  else if(gestureData == 6){
    alert("6");
  }
  else if(gestureData == 7){
    alert("7");
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

