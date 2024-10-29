// // Get references to existing DOM elements
// const videoElement = document.getElementById('webcamVideo');
// const canvasElement = document.getElementById('output-canvas');
// const canvasCtx = canvasElement.getContext('2d');
// const handStatusElement = document.getElementById('hand-status');

// // Initialize MediaPipe Hands solution
// const hands = new Hands({locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
// }});

// hands.setOptions({
//     maxNumHands: 1,
//     modelComplexity: 1,
//     minDetectionConfidence: 0.5,
//     minTrackingConfidence: 0.5
// });

// hands.onResults(onResults);

// // Main processing function
// function onResults(results) {
//     canvasCtx.save();
//     canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//     canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    
//     if (results.multiHandLandmarks) {
//         for (const landmarks of results.multiHandLandmarks) {
//             drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
//                            {color: '#00FF00', lineWidth: 5});
//             drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
            
//             const isHandOpen = detectHandOpen(landmarks);
//             handStatusElement.textContent = `Hand is ${isHandOpen ? 'open' : 'closed'}`;
//         }
//     }
    
//     canvasCtx.restore();
// }

// // Function to detect if hand is open or closed
// function detectHandOpen(landmarks) {
//     const fingertips = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
//     const wristY = landmarks[0].y;
    
//     let openFingers = 0;
//     for (let i = 1; i < fingertips.length; i++) {
//         if (landmarks[fingertips[i]].y < wristY) {
//             openFingers++;
//         }
//     }
    
//     // Check thumb separately (based on x-coordinate)
//     if (landmarks[fingertips[0]].x > landmarks[fingertips[0] - 1].x) {
//         openFingers++;
//     }
    
//     return openFingers >= 4; // Consider hand open if at least 4 fingers are open
// }

// // Start webcam
// navigator.mediaDevices.getUserMedia({video: true})
//     .then((stream) => {
//         videoElement.srcObject = stream;
//         videoElement.play();
//         // Start detection after video is playing
//         videoElement.onloadedmetadata = () => {
//             canvasElement.width = videoElement.videoWidth;
//             canvasElement.height = videoElement.videoHeight;
//             startDetection();
//         };
//     })
//     .catch((err) => {
//         console.error("Error accessing the webcam:", err);
//         handStatusElement.textContent = "Error: Could not access webcam";
//     });

// // Start detection
// function startDetection() {
//     const camera = new Camera(videoElement, {
//         onFrame: async () => {
//             await hands.send({image: videoElement});
//         },
//         width: 1280,
//         height: 720
//     });
//     camera.start();
// }