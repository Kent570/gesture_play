// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const tf = require('@tensorflow/tfjs-node');
const handpose = require('@tensorflow-models/handpose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let model = null;

// Load the handpose model
async function loadModel() {
  model = await handpose.load();
  console.log('Handpose model loaded.');
}

loadModel();

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected.');

  socket.on('frame', async (data) => {
    if (model) {
      // Decode the image from base64
      const imgBuffer = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const tfImage = tf.node.decodeImage(imgBuffer);
      const predictions = await model.estimateHands(tfImage);

      // Send predictions back to the client
      socket.emit('predictions', predictions);

      tfImage.dispose();
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
