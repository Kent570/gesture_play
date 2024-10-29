
let cursor = document.createElement("div");
// cursor style
cursor.style.width = "15px";
cursor.style.height = "15px";
cursor.style.backgroundColor = "red";
cursor.style.position = "absolute";
cursor.style.zIndex = "10000"; 
cursor.style.borderRadius = "50%";
cursor.style.pointerEvents = "none";
document.body.appendChild(cursor);

let cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
// set initial cursor position
cursor.style.left = cursorPosition.x + "px";
cursor.style.top = cursorPosition.y + "px";

function moveCursor(x, y) { // move cursor
  cursorPosition.x += x;
  cursorPosition.y += y;
  cursor.style.left = cursorPosition.x + "px";
  cursor.style.top = cursorPosition.y + "px";
}


function resetCursor() { // reset cursor to center
  cursorPosition.x = window.innerWidth / 2;
  cursorPosition.y = window.innerHeight / 2;
  cursor.style.left = cursorPosition.x + "px";
  cursor.style.top = cursorPosition.y + "px";
}

function simulateClick() { // simulate a click
    const clickableElement = document.elementFromPoint(cursorPosition.x + 10, cursorPosition.y + 10);
    console.log("Clickable Element:", clickableElement);
    if (clickableElement) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        clientX: cursorPosition.x + 10,
        clientY: cursorPosition.y + 10,
      });
      clickableElement.dispatchEvent(event);
      console.log("Click simulated on:", clickableElement);
    } else {
      console.log("No clickable element found at the cursor position.");
    }
  }

  document.addEventListener('keydown', function(event) {
    if(event.key === 'y'){ // move up
        moveCursor(0, -10);
    }
    if(event.key === 'h'){ // move down
        moveCursor(0, 10);
    }
    if(event.key === 'g'){ // move left
        moveCursor(-10, 0);
    }
    if(event.key === 'u'){ // move right
        moveCursor(10, 0);
    }  
    if(event.key === 'x'){ // click
        simulateClick();
    } 
    if(event.key === 'o'){ // cursor to center
        resetCursor();
    }
});