// popup.js

document.getElementById('start-camera-button').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('webcam.html') });
});
