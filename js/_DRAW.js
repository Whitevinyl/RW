




//-------------------------------------------------------------------------------------------
//  BG
//-------------------------------------------------------------------------------------------


function drawBG() {
    cxa.globalAlpha = 1;
    color.fill(cxa,bgCols[0]);
    cxa.fillRect(0,0,fullX,fullY);
}





//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------




function drawScene() {


    var size = 20;
    var u = units;

    color.fill(cxa,bgCols[1]);
    cxa.fillRect(dx - (size * units), dy - (size * units), 2 * (size * units), 2 * (size * units));


    color.fillRGBA(cxa,255,255,255,1);

    cxa.textAlign = 'center';
    cxa.font = "100 " + headerType + "px Cabin";
    cxa.fillText(decimaRound(audioLevel,1),dx,dy);
    cxa.fillText(decimaRound(audioMin,1),dx - (300*u),dy);
    cxa.fillText(decimaRound(audioMax,1),dx + (300*u),dy);
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


