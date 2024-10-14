<<<<<<< HEAD
// function skipToNextVideo() {
//     const videos = document.querySelectorAll('video');
//     if (videos.length > 0) {
//       const currentVideo = videos[0];
//       currentVideo.pause();
  
//       if (videos[1]) {
//         const nextVideo = videos[1];
//         nextVideo.play();
//         window.scrollTo({
//           top: nextVideo.getBoundingClientRect().top + window.pageYOffset,
//           behavior: 'smooth'
//         });
//       } else {
//         alert('No more videos on the page.');
//       }
//     } else {
//       alert('No videos found.');
//     }
//   }

=======
>>>>>>> a34c4741ed740d135791e6793b2c83a3a55d0ec3
document.addEventListener('keydown', function(event) {
    let video = document.querySelector('video');
    
    if (video) {
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
<<<<<<< HEAD
        if (event.key === 'r') {
            video.currentTime =0; // start from the beginning
=======
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
>>>>>>> a34c4741ed740d135791e6793b2c83a3a55d0ec3
        }
        if (event.key === 'l') { // fullscreen
            if (!document.fullscreenElement) {
                video.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
<<<<<<< HEAD
        if (event.key === 'n') {
            let nextButton = document.querySelector('.ytp-next-button');
            if (nextButton) {
                nextButton.click(); // to next video
            }
        }
        if (event.key === 'v') {
            let prevButton = document.querySelector('.ytp-prev-button');
            if (prevButton) {
                prevButton.click(); // to previous video
            }
        }
        if (event.key === 'w') {
            let subButton = document.querySelector('.ytp-subtitles-button');
=======
        if (event.key === 'r') {
            video.currentTime =0; // start from the beginning
        }
        if (event.key === 'w') {
            let subButton = document.querySelector('.ytp-subtitles-button, .button-nfsubtitles');
>>>>>>> a34c4741ed740d135791e6793b2c83a3a55d0ec3
            if (subButton) {
                subButton.click(); // subtitles
            }
        }
        if(event.key === 'q'){
<<<<<<< HEAD
            let muteButton = document.querySelector('.ytp-mute-button');
=======
            let muteButton = document.querySelector('.ytp-mute-button, .button-nfmute');
>>>>>>> a34c4741ed740d135791e6793b2c83a3a55d0ec3
            if (muteButton) {
                muteButton.click(); // mute
            }
        }
<<<<<<< HEAD
        // if(event.key === 'u'){
        //     const eventu = new KeyboardEvent('keydown', {
        //         key: 'ArrowUp',
        //         code: 'ArrowUp',
        //         keyCode: 38, 
        //         which: 38,
        //         bubbles: true,
        //         cancelable: true
        //       });
        //       document.dispatchEvent(eventu);
        // }
        // if(event.key === 'd'){
        //     const eventd = new KeyboardEvent('keydown', {
        //         key: 'ArrowDown',
        //         code: 'ArrowDown',
        //         keyCode: 40, 
        //         which: 40,
        //         bubbles: true,
        //         cancelable: true
        //       });
        //       document.dispatchEvent(eventd);
        // }
=======
>>>>>>> a34c4741ed740d135791e6793b2c83a3a55d0ec3
    }
});

