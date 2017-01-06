

var TTAlpha = new Alpha(0);
var subAlpha = new Alpha(0);
var BGAlpha = new Alpha(1);
var TTOffset = new Point(0,0);
var subOffset = new Point(0,30);
var playSize = new Point(1,1);
var playLine = 0;
var pauseLine = 0;


function setupDrawing() {

    alphaTo(TTAlpha,1,4);

    setTimeout(function() {
        pointTo(TTOffset,0,-15,0.8);
        alphaTo(subAlpha,1,1);
    },2000);
}

function introOut() {
    alphaTo(TTAlpha,0,2);
    alphaTo(subAlpha,0,2);
    alphaTo(BGAlpha,0,2);
    pointTo(playSize,1,0,0.2);
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
    ctx[n].globalAlpha = 0.5;
    color.fill(ctx[n],paintCol);
    var m = 0.7;
    color.fillRGBA(ctx[n],bgFill.R*m,bgFill.G*m,bgFill.B*m,1);
    meterBrush.draw(ctx[n]);
    ctx[n].globalAlpha = 1;
    color.stroke(ctx[n],lightCol);
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
    font = "Bodoni";
    var ct = ctx[0];

    // COMPOSITE //
    ct.drawImage(canvas[1],0,0);


    // PAINTING //
    painter.draw();


    // PLAY / PAUSE //
    color.fill(ct,textCol);
    ct.globalAlpha = 1;
    if (audioIsPlaying) {
        drawPause(ct,30*u,30*u,15*u,15*u);
    } else {
        drawPlay(ct,30*u,30*u,15*u,15*u);
    }
    if (pauseOver && pauseLine<20) {
        pauseLine += 2;
    }
    if (!pauseOver && pauseLine>0) {
        pauseLine -= 2;
    }
    ct.fillRect((30*u) - ((pauseLine/2)*u),45*u,pauseLine*u,2*u);


    // ORDER //
    ct.textAlign = 'center';
    ct.font = "400 " + bodyType + "px " + font;
    ct.lineWidth = 2*units;
    var bw = 150*u;
    var bh = 30*u;
    var bx = fullX - (20*u) - (bw/2);
    var by = fullY - (20*u) - (bh/2);

    ct.fillText('Order Now',bx, by + (bodyType*0.35));
    ct.beginPath();
    ct.moveTo(bx - (bw/2), by - (bh/2));
    ct.lineTo(bx - (bw/2), by + (bh/2));
    ct.lineTo(bx + (bw/2), by + (bh/2));
    ct.lineTo(bx + (bw/2), by - (bh/2));
    ct.closePath();
    ct.stroke();

    // INTRO BG //
    if (BGAlpha.a>0) {
        ct.globalAlpha = BGAlpha.a;
        color.fill(ct,darkCol);
        ct.fillRect(0,0,fullX,fullY);
    }

    // TEXT //
    color.fill(ct,textCol);
    if (TTAlpha.a>0) {
        ct.globalAlpha = subAlpha.a;
        ct.textAlign = 'center';
        ct.font = "400 oblique " + midType + "px " + font;
        ct.fillText("'Piano Portraits'",dx,dy + (subOffset.y*u));


        // PLAY //
        drawPlay(ct,dx,dy + (70*u),25*u,(25*playSize.y)*u);
        if (playOver && playLine<35) {
            playLine += 2;
        } else if (playLine>0) {
            playLine -= 2;
        }
        ct.fillRect(dx - ((playLine/2)*u), dy + (90*u), playLine*u, (2*playSize.y)*u);

        ct.globalAlpha = TTAlpha.a;
        ct.textAlign = 'left';
        ct.font = "400 " + headerType + "px " + font;
        spacedText(ct,"RICK WAKEMAN",dx,dy + (TTOffset.y*u),rickSpace*u);
    }
    ct.globalAlpha = 1;
    ct.textAlign = 'left';
    ct.font = "400 " + bodyType + "px " + font;
    ct.fillText(elapsed,20*u,fullY - (20*u));


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
    setTimeout(function(){fadeOut(ctx,col)},80);
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


function drawPlay(ct,x,y,w,h) {
    ct.beginPath();
    ct.moveTo(x - (w/2), y - (h/2));
    ct.lineTo(x - (w/2), y + (h/2));
    ct.lineTo(x + (w/2), y);
    ct.closePath();
    ct.fill();
}

function drawPause(ct,x,y,w,h) {
    ct.fillRect(x - (w*0.45), y - (h/2), w*0.3, h);
    ct.fillRect(x + (w*0.15), y - (h/2), w*0.3, h);
}

//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


