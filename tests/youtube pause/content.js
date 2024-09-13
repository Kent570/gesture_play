document.addEventListener('keydown', function(event) {
    let video = document.querySelector('video');
    
    if (video) {
        if (event.key === 'p') { //play/pause
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
        if (event.key === 'r') {
            video.currentTime =0; // start from the beginning
        }
        if (event.key === 'n') {
            let nextButton = document.querySelector('.ytp-next-button');
            if (nextButton) {
                nextButton.click();
            }
        }
    }
});
