from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import mediapipe as mp
import numpy as np
import base64
import cv2

app = FastAPI()

# Initialize Mediapipe's hand detector
mp_hands = mp.solutions.hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    model_complexity=1,
    min_detection_confidence=0.5
)

def detect_hand_open(landmarks):
    # """Determine if the hand is fully open."""
    finger_joints = {
        "thumb": [4, 3, 2],
        "index": [8, 7, 6],
        "middle": [12, 11, 10],
        "ring": [16, 15, 14],
        "pinky": [20, 19, 18]
    }

    open_fingers = 0

    # Check if each finger is fully extended
    for joints in finger_joints.values():
        tip, middle, base = joints
        if landmarks[tip].y < landmarks[middle].y < landmarks[base].y:
            open_fingers += 1

    return open_fingers == 5

def detect_thumbs_left(landmarks):
    # """Detect if the left thumb is extended with other fingers folded."""
    thumb_extended = (landmarks[4].y < landmarks[3].y < landmarks[2].y and
                      landmarks[4].x > landmarks[3].x > landmarks[2].x)

    index_folded = landmarks[8].y > landmarks[7].y > landmarks[6].y
    middle_folded = landmarks[12].y > landmarks[11].y > landmarks[10].y
    ring_folded = landmarks[16].y > landmarks[15].y > landmarks[14].y
    pinky_folded = landmarks[20].y > landmarks[19].y > landmarks[18].y

    return thumb_extended and index_folded and middle_folded and ring_folded and pinky_folded

def detect_thumbs_right(landmarks):
    # """Detect if the right thumb is extended with other fingers folded."""
    thumb_extended = (landmarks[4].y < landmarks[3].y < landmarks[2].y and
                      landmarks[4].x < landmarks[3].x < landmarks[2].x)

    index_folded = landmarks[8].y > landmarks[7].y > landmarks[6].y
    middle_folded = landmarks[12].y > landmarks[11].y > landmarks[10].y
    ring_folded = landmarks[16].y > landmarks[15].y > landmarks[14].y
    pinky_folded = landmarks[20].y > landmarks[19].y > landmarks[18].y
    thumb_less = landmarks[4].x < landmarks[18].x

    return thumb_extended and index_folded and middle_folded and ring_folded and pinky_folded and thumb_less

def detect_index_right(landmarks):
    # """Detect if the index and middle fingers are extended on the right hand."""
    index_extended = (landmarks[8].y < landmarks[7].y < landmarks[6].y and
                      landmarks[8].x < landmarks[7].x < landmarks[6].x)

    middle_extended = (landmarks[12].y < landmarks[11].y < landmarks[10].y and
                       landmarks[12].x < landmarks[11].x < landmarks[10].x)

    return index_extended and middle_extended

def detect_index_left(landmarks):
    # """Detect if the index and middle fingers are extended on the left hand."""
    index_extended = landmarks[8].x > landmarks[7].x > landmarks[6].x
    middle_extended = landmarks[12].x > landmarks[11].x > landmarks[10].x

    return index_extended and middle_extended

def detect_index_up(landmarks):
    index_up  = landmarks[8].y < landmarks[7].y < landmarks[6].y < landmarks[5].y

    return index_up

def detect_index_down(landmarks):
    index_down = landmarks[8].y > landmarks[7].y > landmarks[6].y > landmarks[5].y
    middle_folded = landmarks[9].y < landmarks[10].y
    ring_folded = landmarks[13] .y < landmarks[14].y

    return index_down and middle_folded and ring_folded

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Client connected.")

    previous_gesture = '0'
    gesture_counter = 0

    try:
        while True:
            data = await websocket.receive_text()

            # Remove the data URL prefix if present
            if data.startswith('data:image'):
                data = data.split(',', 1)[1]

            # Decode the base64 image
            image_data = base64.b64decode(data)
            np_img = np.frombuffer(image_data, np.uint8)
            image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

            # Process the image to detect hands
            results = mp_hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

            # Determine the gesture
            gesture = '0'
            if results.multi_hand_landmarks:
                landmarks = results.multi_hand_landmarks[0].landmark
                if (detect_hand_open(landmarks)):
                    gesture = '1'
                elif (detect_thumbs_left(landmarks)):
                    gesture = '2'
                elif (detect_thumbs_right(landmarks)):
                    gesture = '3'
                elif (detect_index_left(landmarks)):
                    gesture = '4'
                elif (detect_index_right(landmarks)):
                    gesture = '5'
                elif (detect_index_up(landmarks)):
                    gesture = '6'
                elif (detect_index_down(landmarks)):
                    gesture = '7'
                else:
                    gesture = '0'
                # gesture = "open hand" if detect_hand_open(landmarks) else "closed fist"

                if gesture == previous_gesture and gesture != '0':
                    gesture_counter += 1
                else:
                    gesture_counter = 0

                previous_gesture = gesture
                print(gesture)


            # Send the detected gesture back to the client
                if gesture_counter >= 2:
                    await websocket.send_text(gesture)
                    # print(gesture)
                    gesture = 0
                    previous_gesture = 0
                    gesture_counter = 0
                else:
                    await websocket.send_text('0')
                    # print('0')
            # await websocket.send_text(gesture)
            # print(gesture)

    except WebSocketDisconnect:
        print("Client disconnected.")

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
