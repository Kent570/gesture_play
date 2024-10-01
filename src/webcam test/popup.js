// Get reference to the video element
const videoElement = document.getElementById('webcamVideo');

// Function to start the camera
function startCamera() {
    navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();
            console.log("Camera started successfully");
        })
        .catch((err) => {
            console.error("Error accessing the webcam:", err);
        });
}

// Start the camera when the page loads
window.addEventListener('load', startCamera);