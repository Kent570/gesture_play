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
function turnOfCamera(){
    const videoElement = document.getElementById("videoOn");
    const stream = videoElement.srcObject;

    // Stop all tracks (video tracks in this case)
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;  // Clear the video element
    }
}
//   const camerabtn = document.getElementById('camerabtn');
  document.getElementById("camerabtn").addEventListener("click", turnOnCamera);
  document.getElementById("turnoffbtn").addEventListener("click", turnOfCamera);

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  // Continuous recognition (false means it'll stop after each result)
  recognition.continuous = true;

  // Set the language (you can change this to other languages like 'es-ES' for Spanish)
  recognition.lang = 'en-US';

  // Button to start speech recognition
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const resultElement = document.getElementById('result');

  // When speech recognition starts
  recognition.onstart = () => {
    startBtn.textContent = 'Listening...';
    resultElement.textContent = "Listening for commands...";
  };

  // When speech recognition ends
  recognition.onend = () => {
    if (recognition.isListening) {  // Check if we want to keep listening
      recognition.start();  // Restart the recognition if it's not stopped manually
    } else {
      statusElement.textContent = '';  // Clear the recording status when stopped
  }
  
  };

  // When speech is recognized successfully
  recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();

    resultElement.textContent = `You said: ${transcript}`;
    if (transcript.includes("on the camera")) {
        resultElement.textContent += " - Turning the camera on!";
        turnOnCamera();  // Call function to turn the camera on
      }
    if (transcript.includes("off the camera")) {
        resultElement.textContent += " - Turning the camera OFF!";
        turnOfCamera();  // Call function to turn the camera off
      }
      recognition.stop(); 
  };

  // Start recognition when button is clicked
  startBtn.addEventListener('click', () => {
    recognition.isListening = true; 
        recognition.start();
  });
 
  stopBtn.addEventListener('click', () => {
    recognition.isListening = false;  // Stop listening flag
    recognition.stop();  // Manually stop the recognition
    startBtn.textContent = 'Start Recognition';
    statusElement.textContent = '';
    resultElement.textContent = "Stopped listening.";
});

} else {
  // If the browser doesn't support speech recognition
  alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
}
