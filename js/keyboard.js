
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
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        yHouseSpeed = 0;
        yTreeSpeed = 0;

    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        yHouseSpeed = 0;
        yTreeSpeed = 0;
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        xHouseSpeed = 0;
        xTreeSpeed = 0;
    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        xHouseSpeed = 0;
        xTreeSpeed = 0;
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
            scaleHouseActive = !scaleHouseActive;
            translateHouseActive = false;
            rotateHouseActive = false;
            shearHouseActive = false;
        } else if (treeActive) {
            scaleTreeActive = !scaleTreeActive;
            translateTreeActive = false;
            rotateTreeActive = false;
            shearTreeActive = false;
        }

    }
    //translate active
    if (currentlyPressedKeys[84]) {
        if (houseActive) {
            translateHouseActive = !translateHouseActive;
            rotateHouseActive = false;
            scaleHouseActive = false;
            shearHouseActive = false;
        } else if(treeActive) {
            translateTreeActive = !translateTreeActive;
            rotateTreeActive = false;
            scaleTreeActive = false;
            shearTreeActive = false;
        }
        
    }
    if (currentlyPressedKeys[82]) {
        if (houseActive) {
            rotateHouseActive = !rotateHouseActive;
            translateHouseActive = false;
            scaleHouseActive = false;
            shearHouseActive = false;
        } else if (treeActive) {
            rotateTreeActive = !rotateTreeActive;
            translateTreeActive = false;
            scaleTreeActive = false;
            shearTreeActive = false;
        }
       
    }
    if (currentlyPressedKeys[69]) {
        if (houseActive) {
            shearHouseActive = !shearHouseActive;
            translateHouseActive = false;
            scaleHouseActive = false;
            rotateHouseActive = false;
        } else if (treeActive) {
            shearTreeActive = !shearTreeActive;
            translateTreeActive = false;
            scaleTreeActive = false;
            rotateTreeActive = false;
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
                zHouseTranslate -= 0.5;
            } 
            else if (rotateHouseActive) {
                z -= 0.5;
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
    }
    if (currentlyPressedKeys[34]) {
        // Page Down
        if (houseActive) {
            if (scaleHouseActive) {
                zHouseScale -= 0.1;
            } else if(translateHouseActive) {
                zHouseTranslate += 0.5;
            }
            else if (rotateHouseActive) {
                z += 0.5;
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
                yHouseSpeed -= 1;
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
                yTreeSpeed -= 1;
            }
            else if (shearTreeActive) {
                xTreeShear -= 0.1;
            }
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
               yHouseSpeed += 1; 
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
               yTreeSpeed += 1; 
            }
            else if (shearTreeActive) {
                xTreeShear += 0.1;
            }
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
                xHouseSpeed -= 1;
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
                xTreeSpeed -= 1;
            }
            else if (shearTreeActive) {
                yTreeShear += 0.1;
            }
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
                xHouseSpeed += 1;
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
                xTreeSpeed += 1;
            }
            else if (shearTreeActive) {
                yTreeShear -= 0.1;
            }
        }
       
    }
}