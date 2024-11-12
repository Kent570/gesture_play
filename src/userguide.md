defult settings:
    camera: camera turn off
    mode : video control mode
    gesture : no hand detected
speech:
    "Turn on the camera" : Camera turns on
    
    "Turn off the camera" : Camera turns off

    "Change mode" : 
        if (mode == video control mode){
            mode -> virtual cursor mode
        }
        if (mode == virtual cursor mode){
            mode -> video control mode
        }
    Unrecognized word or sentence : Big question mark on the screen
Gesture:
    video control mode:
        hand open : pause / play
        thumb to right : forward 10 seconds
        thumb to left : backward 10 seconds
        finger to left : previous video
        finger to right : next video
    virtual cursor mode:
        hand open : click
        finger up : cursor up
        finger down : cursor down
        thumb right : cursor right
        thumb left : cursor left
        finger left : cursor return to center
