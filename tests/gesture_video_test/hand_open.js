// File: src/simple_HTML/hand_open.js

export function detectHandOpen(landmarks) {
    if (!Array.isArray(landmarks) || landmarks.length < 21) {
        throw new Error('Invalid landmarks array');
    }

    const fingertips = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
    const wristY = landmarks[0].y;
    
    let openFingers = 0;
    for (let i = 0; i < fingertips.length; i++) {
        if (landmarks[fingertips[i]].y < wristY) {
            openFingers++;
        }
    }
    
    // Check thumb separately (based on x-coordinate)
    if (landmarks[fingertips[0]].x > landmarks[fingertips[0] - 1].x) {
        openFingers++;
    }
    
    return openFingers >= 4; // Consider hand open if at least 4 fingers are open
}