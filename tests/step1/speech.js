const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
function turnOnCamera() {
    // Add your camera turning-on logic here
    console.log("Camera turned on.");
    alert("Camera is now turned on!"); // Simulate the camera being turned on
  }
//   const camerabtn = document.getElementById('camerabtn');
  document.getElementById("camerabtn").addEventListener("click", turnOnCamera);

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  // Continuous recognition (false means it'll stop after each result)
  recognition.continuous = false;

  // Set the language (you can change this to other languages like 'es-ES' for Spanish)
  recognition.lang = 'en-US';

  // Button to start speech recognition
  const startBtn = document.getElementById('start-btn');
  const resultElement = document.getElementById('result');

  // When speech recognition starts
  recognition.onstart = () => {
    startBtn.textContent = 'Listening...';
  };

  // When speech recognition ends
  recognition.onend = () => {
    startBtn.textContent = 'Start Recognition';
  };

  // When speech is recognized successfully
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    resultElement.textContent = `You said: ${transcript}`;
  };

  // Start recognition when button is clicked
  startBtn.addEventListener('click', () => {
    recognition.start();
  });
  if (transcript.includes("Camera ON")) {
    resultElement.textContent += " - Turning the camera on!";
    turnOnCamera();  // Call function to turn the camera on
  }
  

} else {
  // If the browser doesn't support speech recognition
  alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
}
