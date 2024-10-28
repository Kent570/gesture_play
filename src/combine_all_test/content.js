let videoControlActive = true; // flag to track if video control is active

document.addEventListener('keydown', function(event) {
    let video = document.querySelector('video');

    if (isGestureMode && video) { // only allow video control when active
        if (event.key === 'p') { // play/pause
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
        if (event.key === 's') {
            video.currentTime += 10; // time+10
        }
        if (event.key === 'b') {
            video.currentTime -= 10; // time-10
        }
        if (event.key === 'n') {
            let nextButton = document.querySelector('.ytp-next-button, .button-nfnext, .skip__button, .next-episode-button, .next-up-card, .player-controls__next');
            if (nextButton) {
                nextButton.click(); // to next video
            }
        }
        if (event.key === 'v') {
            let prevButton = document.querySelector('.ytp-prev-button, .button-nfprev, .prev-button, .previous-episode-button, .player-controls__previous');
            if (prevButton) {
                prevButton.click(); // to previous video
            }
        }
    }
});
