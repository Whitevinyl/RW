

// INIT //
var canvas = [];
var ctx = [];
var TWEEN;
var fonts;


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
var menuOpen = false;
var shareOpen = false;

var playOver = false;
var pauseOver = false;
var menuOver = false;
var shareOver = false;
var specialButton;
var shareButton;
var endFrame = false;
var painted = false;
var paintMessageOpen = false;


// COLORS //
var bgCols = [new RGBA(5,5,5,1),new RGBA(255,236,88,1)];
var bgFill = new RGBA(30,30,140,1);
var paints = [new RGBA(250,50,75,1),new RGBA(55,55,250,1)];

var textCol = new RGBA(255,255,255,1);
var lightCol = new RGBA(255,255,255,1);
var darkCol = new RGBA(5,5,5,1);

var painter;
var strokes;
var meterBrush;
var splat;

// COOKIE BAR //
var umgCookieParams = {
    bannerPos: 'top',
    barColor: '#000000',
    copyColor: '#ffffff',
    mainColor: '#666666'
};

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

    StartAudioContext(Tone.context, '#cnvs0').then(function(){
        //started
    });

    // SET CANVAS & DRAWING POSITIONS //
    metrics();

    // INITIALISE THINGS //
    setupInteraction(canvas[0]);
    setupAudio();


    painter = new Painter();
    painter.setup();

    strokes = new Strokes();
    strokes.setup();

    meterBrush = new MeterBrush();
    meterBrush.setup();

    splat = new Splat();
    splat.setup();

    // DONE //
    fonts = new Fonts(['Bodoni:n4,o4'],2,function(){
        setupDrawing();
        draw();
    });
    fonts.setup();
    //draw();
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

    painter.walk();
    strokes.update();
    meterBrush.update();

    monitorAudio();
    audioKeyFrames();
}









