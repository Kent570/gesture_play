// File: tests/hand_open.test.js

import { detectHandOpen } from '../src/simple_HTML/hand_open';

describe('detectHandOpen', () => {
    test('detects open hand', () => {
        const openHandLandmarks = Array(21).fill().map(() => ({x: 0, y: 0}));
        openHandLandmarks[0] = {x: 0.5, y: 0.5};  // wrist
        openHandLandmarks[4] = {x: 0.4, y: 0.4};  // thumb tip
        openHandLandmarks[8] = {x: 0.6, y: 0.3};  // index finger tip
        openHandLandmarks[12] = {x: 0.7, y: 0.3};  // middle finger tip
        openHandLandmarks[16] = {x: 0.8, y: 0.3};  // ring finger tip
        openHandLandmarks[20] = {x: 0.9, y: 0.3};  // pinky tip
        expect(detectHandOpen(openHandLandmarks)).toBe(true);
    });

    test('detects closed hand', () => {
        const closedHandLandmarks = Array(21).fill().map(() => ({x: 0, y: 0}));
        closedHandLandmarks[0] = {x: 0.5, y: 0.5};  // wrist
        closedHandLandmarks[4] = {x: 0.5, y: 0.6};  // thumb tip
        closedHandLandmarks[8] = {x: 0.6, y: 0.6};  // index finger tip
        closedHandLandmarks[12] = {x: 0.7, y: 0.6};  // middle finger tip
        closedHandLandmarks[16] = {x: 0.8, y: 0.6};  // ring finger tip
        closedHandLandmarks[20] = {x: 0.9, y: 0.6};  // pinky tip
        expect(detectHandOpen(closedHandLandmarks)).toBe(false);
    });

    test('detects partially open hand', () => {
        const partiallyOpenHandLandmarks = Array(21).fill().map(() => ({x: 0, y: 0}));
        partiallyOpenHandLandmarks[0] = {x: 0.5, y: 0.5};  // wrist
        partiallyOpenHandLandmarks[4] = {x: 0.4, y: 0.4};  // thumb tip
        partiallyOpenHandLandmarks[8] = {x: 0.6, y: 0.3};  // index finger tip
        partiallyOpenHandLandmarks[12] = {x: 0.7, y: 0.3};  // middle finger tip
        partiallyOpenHandLandmarks[16] = {x: 0.8, y: 0.6};  // ring finger tip
        partiallyOpenHandLandmarks[20] = {x: 0.9, y: 0.6};  // pinky tip
        expect(detectHandOpen(partiallyOpenHandLandmarks)).toBe(true);
    });

    test('throws error for invalid input', () => {
        expect(() => detectHandOpen([])).toThrow('Invalid landmarks array');
        expect(() => detectHandOpen(null)).toThrow('Invalid landmarks array');
        expect(() => detectHandOpen(undefined)).toThrow('Invalid landmarks array');
    });
});