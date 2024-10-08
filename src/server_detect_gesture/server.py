from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import mediapipe as mp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True)
mp_drawing = mp.solutions.drawing_utils

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    image_data = data['image'].split(',')[1]
    img_bytes = base64.b64decode(image_data)
    np_img = np.frombuffer(img_bytes, dtype=np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Convert BGR to RGB
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Process image with MediaPipe
    results = hands.process(img_rgb)
    gesture = 'No Hand Detected'

    if results.multi_hand_landmarks:
        gesture = 'Hand Detected'
        # For more advanced gesture recognition, analyze landmarks here
        # Example: Check the position of specific landmarks to identify gestures

    return jsonify({'gesture': gesture})

if __name__ == '__main__':
    app.run(debug=True)
