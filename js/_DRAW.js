

var TTAlpha = new Alpha(0);
var BGAlpha = new Alpha(1);

function setupDrawing() {
    ctx[1].globalAlpha = 1;
    color.fill(ctx[1],bgFill);
    ctx[1].fillRect(0,0,fullX,fullY);
    alphaTo(TTAlpha,1,4);
    setTimeout(function() {
        introOut();
    },4000);
}

function introOut() {
    alphaTo(TTAlpha,0,2);
    alphaTo(BGAlpha,0,2);
    startAudio();
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
    fadeCanvas(1);
    ctx[1].globalAlpha = 1;
    //color.fillRGBA(ctx[1],255,255,255,1);
    color.strokeRGBA(ctx[1],255,255,255,1);
    strokes.draw();

    /*ctx[1].globalAlpha = 0.01;
    color.fill(ctx[1],bgFill);
    ctx[1].fillStyle="#666";
    ctx[1].fillRect(0,0,fullX,fullY);*/

}


//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------




function drawScene() {

    var u = units;
    var font = "PT Serif";

    // COMPOSITE //
    ctx[0].drawImage(canvas[1],0,0);


    painter.draw();

    if (BGAlpha.a>0) {
        ctx[0].globalAlpha = BGAlpha.a;
        color.fill(ctx[0],darkCol);
        ctx[0].fillRect(0,0,fullX,fullY);
    }

    color.fill(ctx[0],textCol);
    if (TTAlpha.a>0) {
        ctx[0].globalAlpha = TTAlpha.a;
        ctx[0].textAlign = 'center';
        ctx[0].font = "100 " + headerType + "px " + font;
        ctx[0].fillText('R I C K  W A K E M A N',dx,dy - headerType);

        ctx[0].font = "100 italic " + midType + "px " + font;
        ctx[0].fillText('"Piano Portraits"',dx,dy + (10*u));
    }




    //cxa.fillText(decimaRound(audioLevel,1),dx,dy);
    //cxa.fillText(decimaRound(audioMin,1),dx - (300*u),dy);
    //cxa.fillText(decimaRound(audioMax,1),dx + (300*u),dy);

    /*cxa.beginPath();
    cxa.moveTo(dx,dy);
    cxa.arc(dx,dy,10*(peakStrength*10)*u,0,TAU);
    cxa.closePath();
    cxa.fill();*/


    /*var x = dx - ((4*40)*u);
    var y = dy + (120*u);
    for (var i=0; i<frequencies.length; i++) {
        color.fillRGBA(cxa,255,255,255,1);
        cxa.fillRect(x + ((40*u)*i), y, 38*u, -(frequencies[i]*0.3)*u);
        color.fill(cxa,bgCols[1]);
        cxa.fillRect(x + ((40*u)*i), y - ((peaks[i]*0.3)*u), 38*u, u);
    }

    x = dx - ((6*40)*u);
    cxa.fillRect(x, y, 38*u, -(meter*100)*u);*/



    //pips.draw();
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


function fadeCanvas(n) {
    color.fill(ctx[2],bgFill);
    ctx[2].fillRect(0,0,fullX,fullY);
    ctx[2].globalAlpha = 0.99;
    ctx[2].drawImage(canvas[n],0,0);
    ctx[n].clearRect(0,0,fullX,fullY);
    ctx[n].globalAlpha = 1;
    ctx[n].drawImage(canvas[2],0,0);
}



//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


