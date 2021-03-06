
function Strokes() {
    this.p = [];
}
var proto = Strokes.prototype;


proto.setup = function() {

};


proto.burst = function(position,vector,size) {
    var n = tombola.range(4,12);
    size = 0.6 + (size/2);
    var r = (8*size)*units;
    var r2 = (20*size)*units;


    // pick stroke color //
    var op = tombola.weightedNumber([65,20,5,5,5]);
    var c;
    switch (op) {
        case 1:
            c = lightCol;
            break;
        case 2:
            c = colorBlend(paints[0],paints[1],tombola.range(10,90));
            break;
        case 3:
            c = tombola.item(paints);
            break;
        case 4:
            c = colorBlend(colorBlend(paints[0],paints[1],tombola.range(10,90)),lightCol,tombola.range(10,90));
            break;
        case 5:
            c = darkCol;
            break;
    }

    // stroke position //
    var p1 = new Point(position.x + tombola.rangeFloat(-r2,r2), position.y + tombola.rangeFloat(-r2,r2));

    // for each line/bristle of stroke //
    for (var i=0; i<n; i++) {
        var m = 0;
        var v = vector;
        if (tombola.percent(5)) {
            v = vector.clone();
            m = 1;
        }
        var p = new Point(p1.x + tombola.rangeFloat(-r,r), p1.y + tombola.rangeFloat(-r,r));
        this.p.push( new Brush(p,v,this,c,m) );
    }
};


proto.update = function() {
    var l = this.p.length-1;
    for (var i=l; i>=0; i--) {
        this.p[i].update();
    }
};


proto.draw = function(ctx) {
    var l = this.p.length-1;
    for (var i=l; i>=0; i--) {
        this.p[i].draw(ctx);
    }
};




function Brush(position,vector,parent,color,mode) {
    this.position = position;
    this.start = this.position.clone();
    this.vector = vector;
    this.parent = parent;
    this.life = tombola.range(10,40);
    this.scale = tombola.rangeFloat(0.5,2.3);
    this.color = color;
    this.mode = mode;
}
proto = Brush.prototype;


proto.update = function() {
    this.life--;
    if (this.life<1) {
        this.kill();
        return;
    }

    // move //
    this.start = this.position.clone();
    this.position.x += this.vector.x;
    this.position.y += this.vector.y;

    // shrink //
    if (this.mode === 1) {
        this.scale *= 0.9;
    } else {
        this.scale *= 0.96;
    }

};


proto.draw = function(ctx) {

    color.stroke(ctx,this.color);
    var sx = this.start.x;
    var sy = this.start.y;
    var x = this.position.x;
    var y = this.position.y;
    ctx.lineWidth = this.scale*units;

    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.lineTo(x,y);
    ctx.stroke();
};


proto.kill = function() {
    var index = this.parent.p.indexOf(this);
    if (index > -1) {
        this.parent.p.splice(index, 1);
    }
};