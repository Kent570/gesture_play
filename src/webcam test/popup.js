// Get reference to the video element
const videoElement = document.getElementById('webcamVideo');

// Function to start the camera
function startCamera() {
    navigator.mediaDevices.getUserMedia({video: true})
    .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
        // Start detection after video is playing
        videoElement.onloadedmetadata = () => {
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            // startDetection();
        };
    })
    .catch((err) => {
        console.error("Error accessing the webcam:", err);
        handStatusElement.textContent = "Error: Could not access webcam";
    });
}

function startDetection() {
    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await hands.send({image: videoElement});
        },
        width: 1280,
        height: 720
    });
    camera.start();
}

// Start the camera when the page loads
window.addEventListener('load', startCamera);

