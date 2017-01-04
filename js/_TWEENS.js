

function alphaTo(obj,d,t) {
    t = t || 1;

    var cPos = {a: obj.a };

    var tween = new TWEEN.Tween(cPos);
    tween.to({ a: d  }, t*1000);
    tween.start();

    tween.onUpdate(function() {
        obj.a = this.a;
    });

    tween.easing( TWEEN.Easing.Quadratic.InOut );
}




function colourTo(col,r,g,b,a,t) {

    t = t || 1000;

    var cPos = {red: col.R, green: col.G, blue: col.B, alpha: col.A };

    var colTween = new TWEEN.Tween(cPos);
    colTween.to({ red: r, green: g, blue: b, alpha: a  }, t*1000);
    colTween.start();

    colTween.onUpdate(function() {
        col.R = this.red;
        col.G = this.green;
        col.B = this.blue;
        col.A = this.alpha;
    });

    colTween.easing( TWEEN.Easing.Quadratic.InOut );
}

function colourToColour(col,col2,t) {

    t = t || 1000;

    var cPos = {red: col.R, green: col.G, blue: col.B, alpha: col.A };

    var colTween = new TWEEN.Tween(cPos);
    colTween.to({ red: col2.R, green: col2.G, blue: col2.B, alpha: col2.A  }, t*1000);
    colTween.start();

    colTween.onUpdate(function() {
        col.R = this.red;
        col.G = this.green;
        col.B = this.blue;
        col.A = this.alpha;
    });

    colTween.easing( TWEEN.Easing.Quadratic.InOut );
}

function paletteTo(pal1,pal2,t) {

    var length = pal1.length;
    if (length > pal2.length) {
        length = pal2.length;
    }
    for (var i=0; i<length; i++) {
        colourToColour(pal1[i],pal2[i],t);
    }
}


