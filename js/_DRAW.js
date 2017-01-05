

var TTAlpha = new Alpha(0);
var BGAlpha = new Alpha(1);

function setupDrawing() {
    alphaTo(TTAlpha,1,4);
    setTimeout(function() {
        introOut();
    },4000);
}

function introOut() {
    alphaTo(TTAlpha,0,2);
    alphaTo(BGAlpha,0,2);
    startAudio();
    fadeOut(ctx[1],bgFill);
}


//-------------------------------------------------------------------------------------------
//  BG
//-------------------------------------------------------------------------------------------


function drawBG() {
    ctx[0].globalAlpha = 1;
    color.fill(ctx[0],bgCols[0]);
    ctx[0].fillRect(0,0,fullX,fullY);
}


//-------------------------------------------------------------------------------------------
//  PAINT
//-------------------------------------------------------------------------------------------


function drawStrokes() {
    var n = 1;
    color.stroke(ctx[n],lightishCol);
    strokes.draw(ctx[n]);
}


//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------




function drawScene() {
    var u = units;
    var font = "PT Serif";

    // COMPOSITE //
    ctx[0].drawImage(canvas[1],0,0);


    // PAINT //
    painter.draw();


    // TEXT //
    if (BGAlpha.a>0) {
        ctx[0].globalAlpha = BGAlpha.a;
        color.fill(ctx[0],darkCol);
        ctx[0].fillRect(0,0,fullX,fullY);
    }

    color.fill(ctx[0],textCol);
    if (TTAlpha.a>0) {
        ctx[0].globalAlpha = TTAlpha.a;
        ctx[0].textAlign = 'center';
        ctx[0].font = "400 " + headerType + "px " + font;
        ctx[0].fillText('R I C K  W A K E M A N',dx,dy - headerType);

        ctx[0].font = "400 italic " + midType + "px " + font;
        ctx[0].fillText('"Piano Portraits"',dx,dy + (10*u));
    }
    ctx[0].globalAlpha = 1;
    ctx[0].textAlign = 'left';
    ctx[0].font = "400 " + bodyType + "px " + font;
    ctx[0].fillText(elapsed,40*u,fullY - (40*u));


    //pips.draw();
}


function drawData(cxa) {
    cxa.beginPath();
    cxa.moveTo(dx,dy);
    cxa.arc(dx,dy,10*(peakStrength*10)*u,0,TAU);
    cxa.closePath();
    cxa.fill();


    var x = dx - ((4*40)*u);
    var y = dy + (120*u);
    for (var i=0; i<frequencies.length; i++) {
        color.fillRGBA(cxa,255,255,255,1);
        cxa.fillRect(x + ((40*u)*i), y, 38*u, -(frequencies[i]*0.3)*u);
        color.fill(cxa,bgCols[1]);
        cxa.fillRect(x + ((40*u)*i), y - ((peaks[i]*0.3)*u), 38*u, u);
    }

    x = dx - ((6*40)*u);
    cxa.fillRect(x, y, 38*u, -(meter*100)*u);
}


//-------------------------------------------------------------------------------------------
//  DRAW FUNCTIONS
//-------------------------------------------------------------------------------------------


function colorBlend(col1,col2,percent) {

    var r = col1.R + Math.round((col2.R - col1.R) * (percent/100));
    var g = col1.G + Math.round((col2.G - col1.G) * (percent/100));
    var b = col1.B + Math.round((col2.B - col1.B) * (percent/100));
    var a = col1.A + Math.round((col2.A - col1.A) * (percent/100));

    return new RGBA(r,g,b,a);
}


function fadeOut(ctx,col) {
    ctx.fillStyle = "rgba("+col.R+","+col.G+","+col.B+","+tombola.rangeFloat(0.02,0.135)+")";
    ctx.fillRect(0,0,fullX,fullY);
    setTimeout(function(){fadeOut(ctx,col)},60);
}

//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


