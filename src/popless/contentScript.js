// Start Speech Recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;  // Continuously listen
recognition.interimResults = false;  // Only finalize results
recognition.lang = 'en-US';  // Set language

// Element to display results or logs
const resultElement = document.getElementById("result");  // Make sure this element exists in your page
const startBtn = document.getElementById("startBtn");  // Button to start listening (if you have one)

// Function to turn on the camera
function turnOnCamera() {
    console.log("Attempting to turn on the camera...");  // Debugging message
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        console.log("Camera turned on successfully.");  // Debugging message
        const videoElement = document.getElementById("videoOn");
        videoElement.srcObject = stream;
    })
    .catch(error => {
        console.error("Error accessing the camera: ", error);
        alert("Error accessing the camera: " + error.message);
    });
}

// Function to turn off the camera
function turnOffCamera() {
    const videoElement = document.getElementById("videoOn");
    const stream = videoElement.srcObject;

    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;  // Clear the video element
        console.log("Camera turned off successfully.");  // Debugging message
    }
}

// Start listening
recognition.start();

// Event when speech recognition starts
recognition.onstart = () => {
    startBtn.textContent = 'Listening...';
    resultElement.textContent = "Listening for commands...";
};

recognition.onresult = function (event) {
    const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log('You said: ', transcript);

    // Check for "on the camera"
    if (transcript.includes("on the camera")) {
        // resultElement.textContent += " - Turning the camera on!";
        alert(transcript);
        turnOnCamera();  // Call function to turn the camera on
    }

    // Check for "off the camera"
    if (transcript.includes("off the camera")) {
        // resultElement.textContent += " - Turning the camera OFF!";
        turnOffCamera();  // Call function to turn the camera off
    }

    recognition.stop();  // Stop recognition after processing
};

recognition.onerror = function (event) {
    console.error('Speech recognition error detected: ', event.error);
    alert("Error in speech recognition: " + event.error);
};

recognition.onend = function () {
    alert("Speech recognition ended. Restarting...");
    recognition.start();  // Restart recognition automatically
};
