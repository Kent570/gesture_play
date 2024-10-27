const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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
var camonoff = false;
var isGestureMode = true;  
function turnOnCamera() {
    camonoff = true;
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
    // alert("Switched to virtualC mode");
    showCursorWord();
}

function gesture() {
    // alert("Switched to gesture mode");
    showVideoWord();
}


function turnOffCamera() {  // Fixed function name

    showcamoff();
    camonoff = false;
    // alert("Camera turned off");
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
            if(camonoff){
                turnOnCamera();
            }
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
            // alert("on");
            showcamon();
    
            // Stop recognition first, then restart it
            recognition.stop();
            setTimeout(() => {
                recognition.start();
            }, 2000);  // Small delay before restarting
        }
        else if (transcript.includes("off the camera")) {
            turnOffCamera();  // Call function to turn the camera off
            // alert("off");
        
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
            // alert("I don't know what you said");
            showQuestionMark();
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

