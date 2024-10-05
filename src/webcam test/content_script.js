// content_script.js

// Inject `injected_script.js` into the webpage
(function() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('injected_script.js');
    script.type = 'module'; // Use module type if you're using ES6 modules
    script.onload = function() {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
  })();
  