
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
    //scale active
    if (currentlyPressedKeys[83]) {
        scaleActive = !scaleActive;
        translateActive = false;
        rotateActive = false;
        shearActive = false;
    }
    //translate active
    if (currentlyPressedKeys[84]) {
        translateActive = !translateActive;
        rotateActive = false;
        scaleActive = false;
        shearActive = false;
    }
    if (currentlyPressedKeys[82]) {
        rotateActive = !rotateActive;
        translateActive = false;
        scaleActive = false;
        shearActive = false;
    }
    if (currentlyPressedKeys[69]) {
        shearActive = !shearActive;
        translateActive = false;
        scaleActive = false;
        rotateActive = false;
    }
    currentlyPressedKeys[event.keyCode] = false;
}


function handleKeys() {
    if (currentlyPressedKeys[33]) {
        // Page Up
        
        if (scaleActive) {
            zScale += 0.1;
        } else if (translateActive) {
            zTranslate -= 0.5;
        } 
        else if (rotateActive) {
            z -= 0.5;
        }
        else if (shearActive) {
            zShear -= 0.1;
        }
    }
    if (currentlyPressedKeys[34]) {
        // Page Down
        
        if (scaleActive) {
            zScale -= 0.1;
        } else if(translateActive) {
            zTranslate += 0.5;
        }
        else if (rotateActive) {
            z += 0.5;
        }
        else if (shearActive) {
            zShear += 0.1;
        }
    }
    if (currentlyPressedKeys[37]) {
        // Left cursor key
       
        if (scaleActive) {
            xScale -= 0.1;
        } else if( translateActive) {
            xTranslate -= 0.5;
        } 
        else if (rotateActive) {
            ySpeed -= 1;
        }
        else if (shearActive) {
            xShear -= 0.1;
        }
    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        
        if (scaleActive) {
            xScale += 0.1;
        } else if (translateActive) {
            xTranslate += 0.5;
        } 
        else if (rotateActive) {
           ySpeed += 1; 
        }
        else if (shearActive) {
            xShear += 0.1;
        }
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        
        if (scaleActive) {
            yScale += 0.1;
        } else if (translateActive) {
            yTranslate += 0.5;
        } 
        else if (rotateActive) {
            xSpeed -= 1;
        }
        else if (shearActive) {
            yShear += 0.1;
        }
    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        
        if (scaleActive) {
            yScale -= 0.1;
        } else if (translateActive) {
            yTranslate -= 0.5;
        }
         else if (rotateActive) {
            xSpeed += 1;
        }
        else if (shearActive) {
            yShear -= 0.1;
        }
    }
}