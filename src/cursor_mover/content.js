let cursor = document.createElement("div");
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.backgroundColor = "red";
cursor.style.position = "absolute";
cursor.style.zIndex = "10000"; // Ensure it's on top
cursor.style.borderRadius = "50%";
cursor.style.pointerEvents = "none"; // Prevent interaction
document.body.appendChild(cursor);

let cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
cursor.style.left = cursorPosition.x + "px";
cursor.style.top = cursorPosition.y + "px";

function moveCursor(x, y) {
  cursorPosition.x += x;
  cursorPosition.y += y;
  cursor.style.left = cursorPosition.x + "px";
  cursor.style.top = cursorPosition.y + "px";
}

function simulateClick() {
    const clickableElement = document.elementFromPoint(cursorPosition.x + 10, cursorPosition.y + 10);
    console.log("Clickable Element:", clickableElement);
    if (clickableElement) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        clientX: cursorPosition.x + 10, // Adjust for the center of the cursor
        clientY: cursorPosition.y + 10,
      });
      clickableElement.dispatchEvent(event);
      console.log("Click simulated on:", clickableElement);
    } else {
      console.log("No clickable element found at the cursor position.");
    }
  }

  document.addEventListener('keydown', function(event) {
    if(event.key === 'w'){
        moveCursor(0, -10);
    }
    if(event.key === 's'){
        moveCursor(0, 10);
    }
    if(event.key === 'a'){
        moveCursor(-10, 0);
    }
    if(event.key === 'd'){
        moveCursor(10, 0);
    }  
    if(event.key === 'c'){
        simulateClick();
    }
});
