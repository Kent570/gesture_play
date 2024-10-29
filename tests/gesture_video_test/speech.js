const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function turnOnCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        // Display the stream in the video element
        const videoElement = document.getElementById("videoOn");
        videoElement.srcObject = stream;
    })
    .catch(error => {
        console.error("Error accessing the camera: ", error);
    });
}

function turnOffCamera() {  // Fixed function name
    const videoElement = document.getElementById("videoOn");
    const stream = videoElement.srcObject;

    // Stop all tracks (video tracks in this case)
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;  // Clear the video element
    }
}

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    // Continuous recognition (false means it'll stop after each result)
    recognition.continuous = true;

    // Set the language (you can change this to other languages like 'es-ES' for Spanish)
    recognition.lang = 'en-US';

    // When speech recognition ends
    recognition.onend = () => {
        if (recognition.isListening) {
            recognition.start();  // Restart the recognition if it's not stopped manually
        }
        else {
            statusElement.textContent = '';  // Clear the recording status when stopped
        }
    };

    // When speech is recognized successfully
    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
        if (transcript.includes("on the camera")) {
            turnOnCamera();  // Call function to turn the camera on
        }
        if (transcript.includes("off the camera")) {
            turnOffCamera();  // Call function to turn the camera off
        }
          // Stop recognition after command (remove this if you want continuous listening)
    };

    // Handle errors during recognition
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    // Start recognition when key 'L' is pressed, stop when key 'S' is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'g' || event.key === 'G') {
            recognition.isListening = true; 
            recognition.start();
        }
        if (event.key === 's' || event.key === 'S') {
            recognition.isListening = false;  // Stop listening flag
            recognition.stop();  // Manually stop the recognition
            statusElement.textContent = '';
        }
    });

} else {
    // If the browser doesn't support speech recognition
    alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
}
