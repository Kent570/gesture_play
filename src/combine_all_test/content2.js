let cursor = document.createElement("div");
// cursor style
cursor.style.width = "15px";
cursor.style.height = "15px";
cursor.style.backgroundColor = "red";
cursor.style.position = "absolute";
cursor.style.zIndex = "10000";
cursor.style.borderRadius = "50%";
cursor.style.pointerEvents = "none";
cursor.style.display = "none"; // hide the cursor initially
document.body.appendChild(cursor);

let cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
// set initial cursor position
cursor.style.left = cursorPosition.x + "px";
cursor.style.top = cursorPosition.y + "px";

let cursorActive = false; // flag to track if cursor control is active

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

function disp(){
  if (!isGestureMode) { // toggle cursor control
    cursor.style.display = "block"; // show or hide cursor
    console.log("Cursor control " + ((isGestureMode) ? "activated" : "deactivated") + ".");
  }
  else{
    cursor.style.display = "none"; // show or hide cursor
    console.log("Cursor control " + ((isGestureMode) ? "activated" : "deactivated") + ".");
  }
}

function cursorchange(){
  if (!isGestureMode) { // only allow cursor control when active
    if (gesture_var == 6) { // move up
      moveCursor(0, -10);
    }
    if (gesture_var == 7) { // move down
      moveCursor(0, 10);
    }
    if (gesture_var == 2) { // move left
      moveCursor(-10, 0);
    }
    if (gesture_var == 3) { // move right
      moveCursor(10, 0);
    }
    if (gesture_var == 1) { // click
      simulateClick();
    }
    if (gesture_var == 4) { // reset cursor to center
      resetCursor();
    }
  }

}


const intervalId = setInterval(disp, 100);
const intervalId2 = setInterval(cursorchange, 100);