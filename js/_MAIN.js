/**
 * Created by luketwyman on 03/11/2014.
 */



// INIT //
var canvas = [];
var ctx = [];
var TWEEN;


// METRICS //
var halfX = 0;
var halfY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;
var dx = halfX;
var dy = halfY;
var headerType = 0;
var midType = 0;
var dataType = 0;
var bodyType = 0;
var subType = 0;
var device = "desktop";

var TAU = 2 * Math.PI;


// INTERACTION //
var mouseX = 0;
var mouseY = 0;
var touchTakeover = false;
var touch;
var mouseIsDown = false;


// COLORS //
var bgCols = [new RGBA(6,10,12,1),new RGBA(255,236,88,1)];
var bgFill = new RGBA(30,10,20,1);

var pips;
var painter;
var strokes;


//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------


function init() {

    ////////////// SETUP CANVAS ////////////
    for (var i=0; i<2; i++) {
        var cnvs = document.getElementById("cnvs"+i);
        var cntx = cnvs.getContext("2d");
        cntx.mozImageSmoothingEnabled = false;
        cntx.imageSmoothingEnabled = false;

        canvas.push(cnvs);
        ctx.push(cntx);
    }


    // INITIALISE THINGS //
    setupInteraction(canvas[0]);
    setupAudio();



    // SET CANVAS & DRAWING POSITIONS //
    metrics();

    setupDrawing();

    pips = new Pip();
    pips.setup();

    painter = new Painter();
    painter.setup();

    strokes = new Strokes();
    strokes.setup();

    // DONE //
    draw();
}






//-------------------------------------------------------------------------------------------
//  MAIN LOOP
//-------------------------------------------------------------------------------------------


function draw() {
    update();
    drawBG();
    drawStrokes();
    drawScene();

    requestAnimationFrame(draw);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------


function update() {
    if (TWEEN) {
        TWEEN.update();
    }

    pips.update();

    painter.walk();
    strokes.update();

    monitorAudio();
}









