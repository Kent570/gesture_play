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
  