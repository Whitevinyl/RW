


//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------

function setupInteraction(target) {

    // MOUSE //
    target.addEventListener("mousedown", mousePress, false);
    target.addEventListener("mouseup", mouseRelease, false);
    target.addEventListener("mousemove", mouseMove, false);


    // TOUCH //
    target.addEventListener('touchstart', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
            touchTakeover = true;
        } else {
            touchTakeover = false;
        }
        clickOrTouch();
    }, false);
    target.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
        }
        mouseMove(event);
    }, false);
    target.addEventListener('touchend', function(event) {
        mouseRelease();
        touchTakeover = false;
    }, false);
}


//-------------------------------------------------------------------------------------------
//  MOUSE / TOUCH
//-------------------------------------------------------------------------------------------



function mousePress() {

    mouseIsDown = true;
    rolloverCheck();


    if (playOver) {
        introOut();
        return;
    }


    if (pauseOver) {
        toggleAudio();
        return;
    }

    if (TTAlpha.a === 0) {
        painter.dragged = true;
        painter.toMouse();
    }

}



function mouseRelease() {
    mouseIsDown = false;
    painter.dragged = false;
}



function mouseMove(event) {

    var x,y;

    if (touchTakeover==true) {
        x = touch.pageX;
        y = touch.pageY;
    } else {
        x = event.pageX;
        y = event.pageY;
    }

    const ratio = getPixelRatio();
    mouseX = x * ratio;
    mouseY = y * ratio;
    rolloverCheck();

    if (TTAlpha.a === 0 && !pauseOver) {
        painter.toMouse();
    }
}

function rolloverCheck() {
    var u = units;

    if (subAlpha.a === 1) {
        playOver = hudCheck(dx-(30*u), dy+(40*u), 60*u, 60*u);
    } else {
        playOver = false;
    }

    if (TTAlpha.a === 0) {
        pauseOver = hudCheck(10*u,10*u, 40*u, 60*u);
    } else {
        pauseOver = false;
    }

}



// DETERMINE CLICK //
function clickOrTouch(event) {

    var x,y;

    if (touchTakeover==true) {
        x = touch.pageX;
        y = touch.pageY;
    } else {
        x = event.pageX;
        y = event.pageY;
    }

    const ratio = getPixelRatio();
    mouseX = x * ratio;
    mouseY = y * ratio;

    if (mouseIsDown==false) {
        mousePress(event);
    }
}