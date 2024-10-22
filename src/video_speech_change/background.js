chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openHiddenVideo') {
        console.log("Opening hidden video stream with ID:", message.streamId);
        chrome.windows.create({
            url: "hidden.html",
            type: "popup",
            state: "minimized"  
        });
    }
});
