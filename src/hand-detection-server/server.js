const http = require('http');
const WebSocket = require('ws');
const { createCanvas, loadImage } = require('canvas'); // Optional, in case you need to process images

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Simulate gesture detection (Replace with actual detection logic)
function detectGesture(imageData) {
  // Example logic to "detect" a gesture (you should replace this with real gesture recognition)
  // For now, we'll just return a random gesture for demonstration purposes.
  const gestures = ['open hand', 'closed fist', 'thumbs up', 'no hand detected'];
  const randomIndex = Math.floor(Math.random() * gestures.length);
  return gestures[randomIndex];
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected.');

  // Handle incoming messages (image data) from the client
  ws.on('message', (data) => {
    try {
      // The `data` is the base64-encoded image string
      const base64Image = data;
      console.log('Received image data from client.');

      // Here you can decode the base64 image and process it (if needed)
      // For simplicity, we'll skip the decoding and directly simulate the detection process

      // Simulate gesture detection
      const detectedGesture = detectGesture(base64Image);

      // Send the detected gesture back to the client
      ws.send(detectedGesture);
    } catch (error) {
      console.error('Error processing image data:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
