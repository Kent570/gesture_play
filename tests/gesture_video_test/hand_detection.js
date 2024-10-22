
// Get references to existing DOM elements
const videoElement = document.getElementById('webcamVideo');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');
const handStatusElement = document.getElementById('hand-status');

// Initialize MediaPipe Hands solution
const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

hands.onResults(onResults);

// Main processing function
function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                           {color: '#00FF00', lineWidth: 5});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
            
            const isHandOpen = detectHandOpen(landmarks);
            const isThumbRight = detectThumbsRight(landmarks);
            const isThumbLeft = detectThumbsLeft(landmarks);
            const isIndexRight = detectindexRight(landmarks);
            const isIndexLeft = detectindexLeft(landmarks);

            if (isHandOpen) {
              alert("open");
            } else if (isThumbRight) {
              alert("Thumb toward the right")
            } else if (isThumbLeft) {
              alert("Thumb toward the left")
            } else if (isIndexRight) {
              alert("Toward the Right")
            } else if (isIndexLeft) {
              alert("Toward the Left")
            } else {
              alert("Nothing detected")
            }

        }
    }
    
    canvasCtx.restore();
}

// Function to detect if hand is fully open by checking each finger's tip, middle, and base joints
function detectHandOpen(landmarks) {
  // Indices for each finger's landmarks: [tip, middle, base]
  const fingerJoints = {
    thumb: [4, 3, 2],   // Thumb joints
    index: [8, 7, 6],   // Index finger joints
    middle: [12, 11, 10], // Middle finger joints
    ring: [16, 15, 14],   // Ring finger joints
    pinky: [20, 19, 18],  // Pinky finger joints
  };

  let openFingers = 0;

  // Check for each finger if it is fully extended
  for (const finger in fingerJoints) {
    const [tip, middle, base] = fingerJoints[finger];

    // Check if the y-coordinate of the tip is smaller than the middle,
    // and the middle is smaller than the base (fully extended)
    if (landmarks[tip].y < landmarks[middle].y && landmarks[middle].y < landmarks[base].y) {
      openFingers++;
    }
  }

  // Return true only if all five fingers are open
  return openFingers === 5;
}

function detectThumbsLeft(landmarks) {
  // Thumb is extended (check if thumb tip is above the base and middle joints)
  const thumbExtended = landmarks[4].y < landmarks[3].y && landmarks[3].y < landmarks[2].y && landmarks[4].x > landmarks[3].x && landmarks[3].x > landmarks[2].x;
  
  // The other fingers (index, middle, ring, pinky) should be folded inwards
  const indexFolded = landmarks[8].y > landmarks[7].y && landmarks[7].y > landmarks[6].y;
  const middleFolded = landmarks[12].y > landmarks[11].y && landmarks[11].y > landmarks[10].y;
  const ringFolded = landmarks[16].y > landmarks[15].y && landmarks[15].y > landmarks[14].y;
  const pinkyFolded = landmarks[20].y > landmarks[19].y && landmarks[19].y > landmarks[18].y;

  // If thumb is extended and all other fingers are folded, it's a thumbs-up
  return thumbExtended && indexFolded && middleFolded && ringFolded && pinkyFolded;
}

function detectThumbsRight(landmarks) {
  // Thumb is extended (check if thumb tip is above the base and middle joints)
  const thumbExtended = landmarks[4].y < landmarks[3].y && landmarks[3].y < landmarks[2].y && landmarks[4].x < landmarks[3].x && landmarks[3].x < landmarks[2].x;
  
  // The other fingers (index, middle, ring, pinky) should be folded inwards
  const indexFolded = landmarks[8].y > landmarks[7].y && landmarks[7].y > landmarks[6].y;
  const middleFolded = landmarks[12].y > landmarks[11].y && landmarks[11].y > landmarks[10].y;
  const ringFolded = landmarks[16].y > landmarks[15].y && landmarks[15].y > landmarks[14].y;
  const pinkyFolded = landmarks[20].y > landmarks[19].y && landmarks[19].y > landmarks[18].y;

  // If thumb is extended and all other fingers are folded, it's a thumbs-up
  return thumbExtended && indexFolded && middleFolded && ringFolded && pinkyFolded;
}

function detectindexRight(landmarks) {
  const indexExtended = landmarks[8].y < landmarks[7].y && landmarks[7].y < landmarks[6].y && landmarks[8].x < landmarks[7].x && landmarks[7].x < landmarks[6].x;
  const middleExtended = landmarks[12].y < landmarks[11].y && landmarks[11].y < landmarks[10].y && landmarks[12].x < landmarks[11].x && landmarks[11].x < landmarks[10].x;
  // const ringFolded = landmarks[16].y > landmarks[15].y && landmarks[15].y > landmarks[14].y;
  // const pinkyFolded = landmarks[20].y > landmarks[19].y && landmarks[19].y > landmarks[18].y;

  return indexExtended && middleExtended;
}

function detectindexLeft(landmarks) {
  const indexExtended = landmarks[8].x > landmarks[7].x && landmarks[7].x > landmarks[6].x;
  const middleExtended = landmarks[12].x > landmarks[11].x && landmarks[11].x > landmarks[10].x;
  // const ringFolded = landmarks[16].y > landmarks[15].y && landmarks[15].y > landmarks[14].y;
  // const pinkyFolded = landmarks[20].y > landmarks[19].y && landmarks[19].y > landmarks[18].y;

  return indexExtended && middleExtended;
}


// Start webcam
document.addEventListener('DOMContentLoaded', function() {
  const videoElement = document.getElementById('webcamVideo');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      videoElement.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Error accessing webcam:', error);
      alert('Could not access the webcam. Please ensure you have granted permissions.');
    });
});

startDetection()
// Start detection
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
