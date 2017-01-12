

var TTAlpha = new Alpha(0);
var subAlpha = new Alpha(0);
var smallAlpha = new Alpha(0);
var BGAlpha = new Alpha(1);
var dragAlpha = new Alpha(0);

var TTOffset = new Point(0,0);
var subOffset = new Point(0,30);
var playSize = new Point(1,1);

var playLine = 34;
var pauseLine = 0;
var menuLine = 16;
var shareLine = 0;
var bufferNo = 0;
var bufferCount = 0;

var dragTween;


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
    alphaTo(smallAlpha,1,2,2);

    var delay = 10;
    setTimeout(function() {
        showDragMessage();
    },delay*1000);


    pointTo(playSize,1,0,0.2);
    startAudio();
    fadeOut(ctx[1],bgFill);
}

function showDragMessage() {
    if (!painted) {
        paintMessageOpen = true;
        alphaTo(dragAlpha,1,2,0,dragTween);
        var delay = 5;
        setTimeout(function() {
            hideDragMessage();
        },delay*1000);
    }
}

function hideDragMessage() {
    if (!painted) {
        alphaTo(dragAlpha,0,1,0,dragTween);
    }
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
    meterBrush.draw(ctx[n]);

    ctx[n].globalAlpha = 1;
    strokes.draw(ctx[n]);
}


//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------




function drawScene() {
    var u = units;
    var font = "Bodoni";
    var font2 = "Open Sans";
    var ct = ctx[0];

    // COMPOSITE //
    ct.drawImage(canvas[1],0,0);


    // PAINTING //
    painter.draw();


    color.fill(ct,textCol);


    // SMALL MESSAGING //
    drawSmallMessaging(ct,u,font,font2);

    // DRAG MESSAGE //
    drawDragMessage(ct,u,font2);


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
        if (audioHasLoaded) {
            drawPlay(ct,dx,dy + (70*u),25*u,(25*playSize.y)*u);
            if (playOver && playLine<35) {
                playLine += 2;
            }
            if (!playOver && playLine>0) {
                playLine -= 2;
            }
            ct.fillRect(dx - ((playLine/2)*u), dy + (90*u), playLine*u, (2*playSize.y)*u);
        } else {
            drawBuffer(ct,dx,dy + (70*u),25*u,2*u);
            ct.font = "400 " +dataType + "px " + "Open Sans";
            ct.fillText("Loading Audio",dx, dy + (103*u));
        }




        // TT //
        ct.globalAlpha = TTAlpha.a;
        ct.textAlign = 'left';
        ct.font = "400 " + headerType + "px " + font;
        spacedText(ct,"RICK WAKEMAN",dx,dy + (TTOffset.y*u),rickSpace*u);
    }


    //drawTest();
}


function drawTest() {
    ct.globalAlpha = 1;
    ct.textAlign = 'left';
    ct.font = "400 " + bodyType + "px " + font;
    ct.fillText(elapsed,20*u,fullY - (20*u));
}



function drawSmallMessaging(ct,u,font,font2) {
    if (smallAlpha.a>0) {
        ct.globalAlpha = smallAlpha.a;


        // BOTTOM TEXT //
        ct.textAlign = 'center';
        ct.font = "400 " + bodyType + "px " + font;
        var space = 10*u;
        if (device==='mobile') {
            space = 5*u;
        }
        spacedText(ct,"RICK WAKEMAN",dx,fullY - (45*u),space);
        ct.font = "400 oblique " + bodyType + "px " + font;
        ct.fillText("'Piano Portraits'",dx, fullY - (20*u));


        // PLAY / PAUSE //
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


        // HAMBURGER //
        if (menuOver && menuLine<24) {
            menuLine += 1;
        }
        if (!menuOver && menuLine>16) {
            menuLine -= 1;
        }
        drawHamburger(ct,fullX - (35*u), fullY - (30*u), 25*u, menuLine*u, 2*u);


        // SHARE //
        drawShare(ct,u,font2);
    }
}


function drawDragMessage(ct,u,font) {
    if (dragAlpha.a>0) {
        ct.globalAlpha = dragAlpha.a;
        var fontSize = dataType;

        ct.font = "400 " + fontSize + "px " + font;
        ct.textAlign = 'center';
        ct.fillText("DRAG TO PAINT",dx, dy + (fontSize * 0.4));

        var rad = (ct.measureText("DRAG TO PAINT").width/2) + 10*u;

        var w = 5*u;
        var s = 16*u;
        color.stroke(ct,textCol);
        ct.lineWidth = 2*u;

        ct.beginPath();
        ct.arc(dx,dy,rad,0,TAU);
        ct.stroke();
    }
}

function drawShare(ct,u,font) {
    var fontSize = dataType;
    var cx = (60*u);
    var cy = (fullY - (25*u));

    if (device=='mobile') {
        cx = (30*u);
        cy = (fullY - (30*u));
    }
    else {
        ct.textAlign = 'left';
        ct.font = "400 " + fontSize + "px " + font;
        ct.fillText("SHARE",(20*u), fullY - (22*u));
    }

    var s = (5*u);
    ct.lineWidth = 2*u;

    ct.beginPath();
    ct.moveTo(cx - s,cy);
    ct.lineTo(cx + s,cy);
    ct.moveTo(cx,cy - s);
    ct.lineTo(cx,cy + s);
    ct.stroke();

    if (shareOver && shareLine<16) {
        shareLine += 2;
    }
    if (!shareOver && shareLine>0) {
        shareLine -= 2;
    }
    ct.fillRect(cx - ((shareLine/2)*u), cy + (10*u), shareLine*u, 2*u);

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
    ctx.fillStyle = "rgba("+col.R+","+col.G+","+col.B+","+tombola.rangeFloat(0.01,0.135)+")";
    ctx.fillRect(0,0,fullX,fullY);
    setTimeout(function(){fadeOut(ctx,col)},90);
}



function spacedText(ctx,string,x,y,spacing) {

    var chars = string.length;
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
    ct.fillRect(x - (w*0.45), y - (h/2), w*0.25, h);
    ct.fillRect(x + (w*0.2), y - (h/2), w*0.25, h);
}

function drawHamburger(ct,x,y,w,h,t) {
    ct.fillRect(x - (w/2), y - (h/2), w, t);
    ct.fillRect(x - (w/2), y - (t/2), w, t);
    ct.fillRect(x - (w/2), y + (h/2) - t, w, t);
}


function drawBuffer(ct,x,y,s,t) {

    var rt = t;
    var dt = t*2;


    bufferCount++;

    if (bufferCount === 5) {
        bufferNo++;
        if (bufferNo>7) {
            bufferNo = 0;
        }
        bufferCount = 0;
    }

    t = rt;
    if (bufferNo === 0) t = dt;
    ct.fillRect(x - (s/2) - (t/2), y - (t/2), t, t);
    t = rt;
    if (bufferNo === 1) t = dt;
    ct.fillRect(x - (s/3) - (t/2), y - (s/3) - (t/2), t, t);
    t = rt;
    if (bufferNo === 2) t = dt;
    ct.fillRect(x - (t/2), y - (s/2) - (t/2), t, t);
    t = rt;
    if (bufferNo === 3) t = dt;
    ct.fillRect(x + (s/3) - (t/2), y - (s/3) - (t/2), t, t);
    t = rt;
    if (bufferNo === 4) t = dt;
    ct.fillRect(x + (s/2) - (t/2), y - (t/2), t, t);
    t = rt;
    if (bufferNo === 5) t = dt;
    ct.fillRect(x + (s/3) - (t/2), y + (s/3) - (t/2), t, t);
    t = rt;
    if (bufferNo === 6) t = dt;
    ct.fillRect(x - (t/2), y + (s/2) - (t/2), t, t);
    t = rt;
    if (bufferNo === 7) t = dt;
    ct.fillRect(x - (s/3) - (t/2), y + (s/3) - (t/2), t, t);
}

//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


