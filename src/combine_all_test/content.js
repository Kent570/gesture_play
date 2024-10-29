let videoControlActive = true; // flag to track if video control is active

function video_change() {
    let video = document.querySelector('video');

    if (isGestureMode && video) { // only allow video control when active
        if (gesture_var == 1) { // play/pause
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
        if (gesture_var == 3) {
            video.currentTime += (10/3); // time+10
        }
        if (gesture_var == 2) {
            video.currentTime -= (10/3); // time-10
        }
        if (gesture_var == 5) {
            let nextButton = document.querySelector('.ytp-next-button, .button-nfnext, .skip__button, .next-episode-button, .next-up-card, .player-controls__next');
            if (nextButton) {
                nextButton.click(); // to next video
            }
        }
        if (gesture_var == 4) {
            let prevButton = document.querySelector('.ytp-prev-button, .button-nfprev, .prev-button, .previous-episode-button, .player-controls__previous');
            if (prevButton) {
                prevButton.click(); // to previous video
            }
        }
    }
}

const intervalId3 = setInterval(video_change, 100);