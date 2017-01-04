

function setupDrawing() {
    ctx[1].globalAlpha = 1;
    color.fill(ctx[1],bgFill);
    ctx[1].fillRect(0,0,fullX,fullY);
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
    ctx[1].globalAlpha = 1;
    color.fillRGBA(ctx[1],255,255,255,1);
    color.strokeRGBA(ctx[1],255,255,255,1);
    strokes.draw();

    ctx[1].globalAlpha = 0.05;
    color.fill(ctx[1],bgFill);
    ctx[1].fillRect(0,0,fullX,fullY);
}


//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------




function drawScene() {


    var size = 20;
    var u = units;

    ctx[0].drawImage(canvas[1],0,0);

    color.fill(ctx[0],bgCols[1]);
    //cxa.fillRect(dx - (size * units), dy - (size * units), 2 * (size * units), 2 * (size * units));


    color.fillRGBA(ctx[0],255,255,255,1);

    ctx[0].textAlign = 'center';
    ctx[0].font = "100 " + headerType + "px Cabin";
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

    painter.draw();

    pips.draw();
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




//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


