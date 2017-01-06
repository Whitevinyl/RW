

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
var rickSpace = 20;

var TAU = 2 * Math.PI;


// INTERACTION //
var mouseX = 0;
var mouseY = 0;
var touchTakeover = false;
var touch;
var mouseIsDown = false;


var playOver = false;
var pauseOver = false;


// COLORS //
var bgCols = [new RGBA(5,5,5,1),new RGBA(255,236,88,1)];
var bgFill = new RGBA(30,30,140,1);
var paintCol = new RGBA(250,50,75,1);

var textCol = new RGBA(255,255,255,1);
var lightCol = new RGBA(255,255,255,1);
var lightishCol = new RGBA(240,240,240,0.9);
var darkCol = new RGBA(5,5,5,1);

var pips;
var painter;
var strokes;
var shapes;
var meterBrush;


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


    // SET CANVAS & DRAWING POSITIONS //
    metrics();

    // INITIALISE THINGS //
    setupInteraction(canvas[0]);
    setupAudio();
    setupDrawing();






    pips = new Pip();
    pips.setup();

    painter = new Painter();
    painter.setup();

    strokes = new Strokes();
    strokes.setup();

    shapes = new Shapes();
    shapes.setup();

    meterBrush = new MeterBrush();
    meterBrush.setup();

    // DONE //
    draw();
}




//-------------------------------------------------------------------------------------------
//  MAIN LOOP
//-------------------------------------------------------------------------------------------


function draw() {
    update();
    drawBG();
    drawScene();
    drawStrokes();

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
    shapes.update();
    meterBrush.update();

    monitorAudio();
    audioKeyFrames();
}









