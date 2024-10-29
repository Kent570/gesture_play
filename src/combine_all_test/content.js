let videoControlActive = true; // flag to track if video control is active

var numb = 0;

function video_change() {
    let video = document.querySelector('video');

    if (isGestureMode && video) { // only allow video control when active
        if (gesture_var == 1 && numb != 1) { // play/pause
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            numb = 1;
        }
        if (gesture_var == 3 && numb != 3) {
            video.currentTime += 10; // time+10
            numb = 3;
        }
        if (gesture_var == 2 && numb != 2) {
            video.currentTime -= 10; // time-10
            numb = 2;
        }
        if (gesture_var == 5 && numb != 5) {
            let nextButton = document.querySelector('.ytp-next-button, .button-nfnext, .skip__button, .next-episode-button, .next-up-card, .player-controls__next');
            if (nextButton) {
                nextButton.click(); // to next video
            }
            numb = 5;
        }
        if (gesture_var == 4 && numb != 4) {
            let prevButton = document.querySelector('.ytp-prev-button, .button-nfprev, .prev-button, .previous-episode-button, .player-controls__previous');
            if (prevButton) {
                prevButton.click(); // to previous video
            }
            numb = 4;
        }
        else if(gesture_var == 0||gesture_var == 6||gesture_var == 7){
            numb = 0;
        }
    }
}

const intervalId3 = setInterval(video_change, 100);