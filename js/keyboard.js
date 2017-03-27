
var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}


function handleKeyUp(event) {
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        ySpeed = 0;
    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        ySpeed = 0;
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        xSpeed = 0;
    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        xSpeed = 0;
    }
    if (currentlyPressedKeys[79]) {
        open = !open;
        if (open === true) {
            var sound = document.getElementById("audio");
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        }
        else {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    currentlyPressedKeys[event.keyCode] = false;
}


function handleKeys() {
    if (currentlyPressedKeys[33]) {
        // Page Up
        z -= 0.5;
    }
    if (currentlyPressedKeys[34]) {
        // Page Down
        z += 0.5;
    }
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        ySpeed -= 1;
    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        ySpeed += 1;
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        xSpeed -= 1;
    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        xSpeed += 1;
    }
}