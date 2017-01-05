

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
    font = "Playfair Display";
    font = "Amiri";

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
        ctx[0].font = "400 italic " + midType + "px " + font;
        ctx[0].fillText('"Piano Portraits"',dx,dy + (25*u));

        ctx[0].textAlign = 'left';
        ctx[0].font = "400 " + headerType + "px " + font;
        spacedText(ctx[0],"RICK WAKEMAN",dx,dy - (15*u),20*u);


    }
    ctx[0].globalAlpha = 1;
    ctx[0].textAlign = 'left';
    ctx[0].font = "400 " + bodyType + "px " + font;
    ctx[0].fillText(elapsed,20*u,fullY - (20*u));


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

function fillTextWithSpacing(context, text, x, y, spacing) {

    context.save();
    var spacedWidth = x;

    //Start at position (X, Y).
    //Measure wAll, the width of the entire string using measureText()
    var wAll = context.measureText(text).width;
    var wShorter;

    do {
        //Remove the first character from the string
        var char = text.substr(0, 1);
        text = text.substr(1);

        //Print the first character at position (X, Y) using fillText()
        context.fillText(char, x, y);

        //Measure wShorter, the width of the resulting shorter string using measureText().
        if (text == "")
            wShorter = 0;
        else
            wShorter = context.measureText(text).width;

        //Subtract the width of the shorter string from the width of the entire string, giving the kerned width of the character, wChar = wAll - wShorter
        var wChar = wAll - wShorter;

        //Increment X by wChar + spacing
        x += wChar + spacing;

        //wAll = wShorter
        wAll = wShorter;

        //Repeat from step 3
    } while (text != "");

    spacedWidth = x - spacedWidth;
    context.transform(-(spacedWidth/2),0,0,0,0,0);

    context.restore();
}

function spacedText(ctx,string,x,y,spacing) {

    var chars = string.length;
    var width = ctx.measureText(string).width;
    var fullWidth = (chars-1) * spacing;
    var charList = [];
    var charWidths = [];
    for (var i=0; i<chars; i++) {
        var c = string.substr(i, 1);
        var w = ctx.measureText(c).width;
        charList.push (c);
        charWidths.push(w);
        fullWidth += w;
    }

    x -= fullWidth/2;

    for (i=0; i<chars; i++) {
        ctx.fillText(charList[i], x, y);
        x += (spacing + charWidths[i]);
    }
}

//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


