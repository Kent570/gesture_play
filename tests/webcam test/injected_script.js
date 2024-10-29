// injected_script.js

(async () => {
    // Access the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log("Webcam access granted");
      })
      .catch((err) => {
        console.error("Error accessing the webcam:", err);
      });
  })();
  