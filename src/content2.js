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

var cursor_num = 0;

function cursorchange(){
  if (!isGestureMode) { // only allow cursor control when active
    if (gesture_var == 6) { // move up
      moveCursor(0, -10);
      cursor_num = 6;
    }
    if (gesture_var == 7) { // move down
      moveCursor(0, 10);
      cursor_num = 7;
    }
    if (gesture_var == 2) { // move left
      moveCursor(-10, 0);
      cursor_num = 2;
    }
    if (gesture_var == 3) { // move right
      moveCursor(10, 0);
      cursor_num = 3;
    }
    if (gesture_var == 1 && cursor_num != 1) { // click
      simulateClick();
      cursor_num = 1;
    }
    if (gesture_var == 4 && cursor_num != 4) { // reset cursor to center
      resetCursor();
      cursor_num = 4;
    }
    else if(gesture_var == 0||gesture_var == 5){
      cursor_num = 0;
    }
  }
}


const intervalId = setInterval(disp, 100);
const intervalId2 = setInterval(cursorchange, 100);