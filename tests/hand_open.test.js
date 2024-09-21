import { detectHandOpen } from '../src/handPoseDetection';

describe('detectHandOpen', () => {
    test('detects open hand', () => {
        const openHandLandmarks = [
            {x: 0.5, y: 0.5},  // wrist
            {x: 0.4, y: 0.4},  // thumb tip
            {x: 0.6, y: 0.3},  // index finger tip
            {x: 0.7, y: 0.3},  // middle finger tip
            {x: 0.8, y: 0.3},  // ring finger tip
            {x: 0.9, y: 0.3},  // pinky tip
        ];
        expect(detectHandOpen(openHandLandmarks)).toBe(true);
    });

    test('detects closed hand', () => {
        const closedHandLandmarks = [
            {x: 0.5, y: 0.5},  // wrist
            {x: 0.5, y: 0.6},  // thumb tip
            {x: 0.6, y: 0.6},  // index finger tip
            {x: 0.7, y: 0.6},  // middle finger tip
            {x: 0.8, y: 0.6},  // ring finger tip
            {x: 0.9, y: 0.6},  // pinky tip
        ];
        expect(detectHandOpen(closedHandLandmarks)).toBe(false);
    });

    test('detects partially open hand', () => {
        const partiallyOpenHandLandmarks = [
            {x: 0.5, y: 0.5},  // wrist
            {x: 0.4, y: 0.4},  // thumb tip
            {x: 0.6, y: 0.3},  // index finger tip
            {x: 0.7, y: 0.3},  // middle finger tip
            {x: 0.8, y: 0.6},  // ring finger tip
            {x: 0.9, y: 0.6},  // pinky tip
        ];
        expect(detectHandOpen(partiallyOpenHandLandmarks)).toBe(true);
    });
});
