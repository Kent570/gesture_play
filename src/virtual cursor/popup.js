document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: startVirtualCursor
        });
    });
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: stopVirtualCursor
        });
    });
});

function startVirtualCursor() {
    // Check if the virtual cursor already exists to avoid duplicates
    if (document.getElementById('virtual-cursor')) return;

    // Create the virtual cursor element
    const cursorElement = document.createElement('div');
    cursorElement.id = 'virtual-cursor';
    cursorElement.style.position = 'fixed';
    cursorElement.style.width = '20px';
    cursorElement.style.height = '20px';
    cursorElement.style.backgroundColor = 'blue';
    cursorElement.style.borderRadius = '50%';
    cursorElement.style.zIndex = '9999';
    cursorElement.style.pointerEvents = 'none'; // Avoid interfering with real cursor actions
    cursorElement.style.top = '0';
    cursorElement.style.left = '0';
    cursorElement.style.transform = 'translate(-50%, -50%)'; // Center the dot relative to the cursor
    document.body.appendChild(cursorElement);

    // Listen for mousemove event to update the position of the virtual cursor
    document.addEventListener('mousemove', (event) => {
        cursorElement.style.left = `${event.clientX}px`;
        cursorElement.style.top = `${event.clientY}px`;
    });
}

function stopVirtualCursor() {
    // Remove the virtual cursor if it exists
    const cursorElement = document.getElementById('virtual-cursor');
    if (cursorElement) {
        cursorElement.remove();
    }
}
