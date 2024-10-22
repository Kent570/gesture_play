const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true; 
recognition.interimResults = false;
recognition.lang = 'en-US';
let isGestureMode = true;  
let cameraStream = null;

function turnOnCamera() {
    console.log("Attempting to turn on the camera...");
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        console.log("Camera is on, stream acquired!");
        chrome.runtime.sendMessage({ action: 'openHiddenVideo', streamId: stream.id });
    })
    .catch(error => {
        console.error("Error accessing the camera: ", error);
        alert("Error accessing the camera: " + error.message);
    });
}

function turnOffCamera() {
    if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
        cameraStream = null;
        console.log("Camera turned off.");
    } else {
        console.log("Camera is already off.");
    }
}

function virtualC() {
    alert("Switched to virtualC mode");
}

function gesture() {
    alert("Switched to gesture mode");
}

recognition.start();

recognition.onresult = function (event) {
    const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log('You said: ', transcript);

    if (transcript.includes("on the camera")) {
        turnOnCamera();
    }
    if (transcript.includes("off the camera")) {
        turnOffCamera();
    }
    if (transcript.includes("change mode")) {
        console.log("Change...");
        if (isGestureMode) {
            virtualC();
            console.log("virtual...");
            isGestureMode = false;  
        } else {
            gesture();
            isGestureMode = true;  
        }
    }
};

recognition.onend = function () {
    console.log("Recognition ended, restarting...");
    recognition.start(); 
};

recognition.onerror = function (event) {
    console.error('Speech recognition error detected: ', event.error);
};
