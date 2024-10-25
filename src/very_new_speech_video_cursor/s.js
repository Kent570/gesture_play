const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var isGestureMode = true;  
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

function virtualC() {
    alert("Switched to virtualC mode");
}

function gesture() {
    alert("Switched to gesture mode");
}


function turnOffCamera() {  // Fixed function name

    alert("Camera turned off");
    const videoElement = document.getElementById("videoOn");

    if (videoElement.srcObject) {
        const stream = videoElement.srcObject;

        // Get all tracks from the stream and stop each of them
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        // Clear the video element source
        videoElement.srcObject = null;
    }
}

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    // Continuous recognition (false means it'll stop after each result)
    recognition.continuous = false;

    // Set the language (you can change this to other languages like 'es-ES' for Spanish)
    recognition.lang = 'en-US';

    // When speech recognition ends
    recognition.onend = () => {
        if (recognition.isListening) {
            alert("hi");
            recognition.start();  // Restart the recognition if it's not stopped manually
        }
        else {
            isListening = true;
            recognition.start();
            statusElement.textContent = '';  // Clear the recording status when stopped
        }
    };

    // When speech is recognized successfully
    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
        if (transcript.includes("on the camera")) {
            turnOnCamera();  // Call function to turn the camera on
            alert("on");
    
            // Stop recognition first, then restart it
            recognition.stop();
            setTimeout(() => {
                recognition.start();
            }, 2000);  // Small delay before restarting
        }
        else if (transcript.includes("off the camera")) {
            turnOffCamera();  // Call function to turn the camera off
            alert("off");
        
                // Stop recognition first, then restart it
                recognition.stop();
                setTimeout(() => {
                    recognition.start();
                }, 2000);  // Small delay before restarting
        }

        else if (transcript.includes("change mode")) {
            console.log("Change...");
            if (isGestureMode) {
                virtualC();
                console.log("virtual...");
                isGestureMode = false;  
            } else {
                gesture();
                isGestureMode = true;  
            }

            recognition.stop();
            setTimeout(() => {
                recognition.start();
            }, 2000);  // Small delay before restarting
        }
        else {
            alert("I don't know what you said");
    
            // Stop recognition first, then restart it
            recognition.stop();
            setTimeout(() => {
                recognition.start();
            }, 2000);  // Small delay before restarting
        }
          // Stop recognition after command (remove this if you want continuous listening)
    };

    // Handle errors during recognition
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    // Start recognition when key 'L' is pressed, stop when key 'S' is pressed
    recognition.start();

} else {
    // If the browser doesn't support speech recognition
    alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
}

