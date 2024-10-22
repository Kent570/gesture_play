// Start Speech Recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;  // Continuously listen
recognition.interimResults = false;  // Only finalize results
recognition.lang = 'en-US';  // Set language

// Function to turn on the camera
function turnOnCamera() {
    const videoElement = document.getElementById("videoOn"); // Get the video element
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        if (videoElement) {
            videoElement.srcObject = stream;
            console.log("Camera turned on successfully.");  // Debugging message
        } else {
            console.error("Video element not found.");
        }
    })
    .catch(error => {
        console.error("Error accessing the camera: ", error);
        alert("Error accessing the camera: " + error.message);
    });
}

// Start listening
recognition.start();

recognition.onresult = function (event) {
    const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log('You said: ', transcript);

    if (transcript.includes("on the camera")) {
        turnOnCamera();  // Call function to turn the camera on
    }
};

recognition.onerror = function (event) {
    console.error('Speech recognition error detected: ', event.error);
};
