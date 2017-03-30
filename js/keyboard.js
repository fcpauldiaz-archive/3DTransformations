
var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}


function handleKeyUp(event) {
    // 1 key
    if (currentlyPressedKeys[49]) {
        houseActive = true;
        treeActive = false;
    }
    // 2 key
    if (currentlyPressedKeys[50]) {
        treeActive = true;
        houseActive = false;
    }
    //up or down
    if (currentlyPressedKeys[33] || currentlyPressedKeys[34]) {
        pitchRate = 0;
    }
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        yHouseSpeed = 0;
        yTreeSpeed = 0;
        yawRate = 0;

    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        yHouseSpeed = 0;
        yTreeSpeed = 0;
        yawRate = 0;
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        xHouseSpeed = 0;
        xTreeSpeed = 0;
        speed = 0;
    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        xHouseSpeed = 0;
        xTreeSpeed = 0;
        speed = 0;
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
        if (houseActive) {
            scaleHouseActive = true;
            translateHouseActive = false;
            rotateHouseActive = false;
            shearHouseActive = false;
        } else if (treeActive) {
            scaleTreeActive = true;
            translateTreeActive = false;
            rotateTreeActive = false;
            shearTreeActive = false;
        }

    }
    //translate active
    if (currentlyPressedKeys[84]) {
        if (houseActive) {
            translateHouseActive = true;
            rotateHouseActive = false;
            scaleHouseActive = false;
            shearHouseActive = false;
        } else if(treeActive) {
            translateTreeActive = true;
            rotateTreeActive = false;
            scaleTreeActive = false;
            shearTreeActive = false;
        }
        
    }
    if (currentlyPressedKeys[82]) {
        if (houseActive) {
            rotateHouseActive = true;
            translateHouseActive = false;
            scaleHouseActive = false;
            shearHouseActive = false;
        } else if (treeActive) {
            rotateTreeActive = true;
            translateTreeActive = false;
            scaleTreeActive = false;
            shearTreeActive = false;
        }
       
    }
    if (currentlyPressedKeys[69]) {
        if (houseActive) {
            shearHouseActive = true;
            translateHouseActive = false;
            scaleHouseActive = false;
            rotateHouseActive = false;
        } else if (treeActive) {
            shearTreeActive = true;
            translateTreeActive = false;
            scaleTreeActive = false;
            rotateTreeActive = false;
        }
      
    }
    // T
    if (currentlyPressedKeys[84]) {
        triangles = true;
        points = false;
        lines = false;
    }
    // L
    if (currentlyPressedKeys[76]) {
        lines = true;
        points = false;
        triangles = false;
    }
    // P
    if (currentlyPressedKeys[80]) {
        points = true;
        lines = false;
        triangles = false;
    }
    // C
    if (currentlyPressedKeys[67]) {
        cameraActive = !cameraActive;
        shearTreeActive = false;
        translateTreeActive = false;
        scaleTreeActive = false;
        rotateTreeActive = false;
        shearHouseActive = false;
        translateHouseActive = false;
        scaleHouseActive = false;
        rotateHouseActive = false;

    }
    // H
    if (currentlyPressedKeys[72]) {

        showHelp = !showHelp;
        if (showHelp) {
           document.getElementById('help').style.display = '';

        }
        else {
            document.getElementById('help').style.display = 'none';
        }
    }
    currentlyPressedKeys[event.keyCode] = false;
}


function handleKeys() {
    if (currentlyPressedKeys[33]) {
        // Page Up
        if (houseActive) {
            if (scaleHouseActive) {
                zHouseScale += 0.1;
            } else if (translateHouseActive) {
                z -= 0.5;
            } 
            else if (rotateHouseActive) {
               
            }
            else if (shearHouseActive) {
                zHouseShear -= 0.1;
            }
        } 
        else if (treeActive) {
            if (scaleTreeActive) {
                zTreeScale += 0.1;
            } else if (translateTreeActive) {
                zTreeTranslate -= 0.5;
            } 
            else if (rotateTreeActive) {
                z -= 0.5;
            }
            else if (shearTreeActive) {
                zTreeShear -= 0.1;
            }
        }
        if (cameraActive) {
            pitchRate = 0.1;
        }
    }
    if (currentlyPressedKeys[34]) {
        // Page Down
        if (houseActive) {
            if (scaleHouseActive) {
                zHouseScale -= 0.1;
            } else if(translateHouseActive) {
                z += 0.5;
            }
            else if (rotateHouseActive) {
               
            }
            else if (shearHouseActive) {
                zHouseShear += 0.1;
            }
        } else if (treeActive) {
            if (scaleTreeActive) {
                zTreeScale -= 0.1;
            } else if(translateTreeActive) {
                zTreeTranslate += 0.5;
            }
            else if (rotateTreeActive) {
                z += 0.5;
            }
            else if (shearTreeActive) {
                zTreeShear += 0.1;
            }
        }
        if (cameraActive) {
            pitchRate = -0.1;
        }
      
    }
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        if (houseActive) {
            if (scaleHouseActive) {
                xHouseScale -= 0.1;
            } else if( translateHouseActive) {
                xHouseTranslate -= 0.5;
            } 
            else if (rotateHouseActive) {
                yHouseSpeed -= 5;
            }
            else if (shearHouseActive) {
                xHouseShear -= 0.1;
            }
        } else if (treeActive) {
            if (scaleTreeActive) {
                xTreeScale -= 0.1;
            } else if( translateTreeActive) {
                xTreeTranslate -= 0.5;
            } 
            else if (rotateTreeActive) {
                yTreeSpeed -= 5;
            }
            else if (shearTreeActive) {
                xTreeShear -= 0.1;
            }
        }
        if (cameraActive) {
            yawRate = 0.1;
        }
 
    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        if (houseActive) {
            if (scaleHouseActive) {
                xHouseScale += 0.1;
            } else if (translateHouseActive) {
                xHouseTranslate += 0.5;
            } 
            else if (rotateHouseActive) {
               yHouseSpeed += 5; 
            }
            else if (shearHouseActive) {
                xHouseShear += 0.1;
            }
        } else if (treeActive) {
            if (scaleTreeActive) {
                xTreeScale += 0.1;
            } else if (translateTreeActive) {
                xTreeTranslate += 0.5;
            } 
            else if (rotateTreeActive) {
               yTreeSpeed += 5; 
            }
            else if (shearTreeActive) {
                xTreeShear += 0.1;
            }
        }
        if (cameraActive) {
            yawRate = -0.1;

        }
     
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        if (houseActive) {
            if (scaleHouseActive) {
                yHouseScale += 0.1;
            } else if (translateHouseActive) {
                yHouseTranslate += 0.5;
            } 
            else if (rotateHouseActive) {
                xHouseSpeed -= 5;
            }
            else if (shearHouseActive) {
                yHouseShear += 0.1;
            }
        } else if (treeActive) {
            if (scaleTreeActive) {
                yTreeScale += 0.1;
            } else if (translateTreeActive) {
                yTreeTranslate += 0.5;
            } 
            else if (rotateTreeActive) {
                xTreeSpeed -= 5;
            }
            else if (shearTreeActive) {
                yTreeShear += 0.1;
            }
        }
        if (cameraActive) {
            speed = 0.003;
        }

    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        if (houseActive) {
             if (scaleHouseActive) {
                yHouseScale -= 0.1;
            } else if (translateHouseActive) {
                yHouseTranslate -= 0.5;
            }
             else if (rotateHouseActive) {
                xHouseSpeed += 5;
            }
            else if (shearHouseActive) {
                yHouseShear -= 0.1;
            }
        } else if (treeActive) {
             if (scaleTreeActive) {
                yTreeScale -= 0.1;
            } else if (translateTreeActive) {
                yTreeTranslate -= 0.5;
            }
             else if (rotateTreeActive) {
                xTreeSpeed += 5;
            }
            else if (shearTreeActive) {
                yTreeShear -= 0.1;
            }
        }
        if (cameraActive) {
            speed = -0.003;
        }
       
    }
}