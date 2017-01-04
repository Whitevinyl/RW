
function Strokes() {
    this.p = [];
}
var proto = Strokes.prototype;


proto.setup = function() {

};


proto.burst = function(position,vector,size) {
    var n = tombola.range(4,10);
    var r = 6*units;
    var v = new Vector((vector.x + tombola.rangeFloat(-1,1)), (vector.y + tombola.rangeFloat(-1,1)));

    for (var i=0; i<n; i++) {
        var v2 = new Vector(v.x + tombola.rangeFloat(-0.15,0.15), v.y + tombola.rangeFloat(-0.15,0.15));
        v2.normalise();
        var p = new Point(position.x + tombola.rangeFloat(-r,r), position.y + tombola.rangeFloat(-r,r));

        this.p.push( new Brush(p,v2,size,this) );
    }
};


proto.update = function() {
    var l = this.p.length-1;
    for (var i=l; i>=0; i--) {
        this.p[i].update();
    }
};


proto.draw = function() {
    var l = this.p.length-1;
    for (var i=l; i>=0; i--) {
        this.p[i].draw();
    }
};




function Brush(position,vector,size,parent) {
    this.position = position;
    this.start = this.position.clone();
    this.vector = vector;
    this.size = size;
    this.parent = parent;
    this.life = tombola.range(10,50);
    this.scale = tombola.rangeFloat(0.2,2);
}
proto = Brush.prototype;


proto.update = function() {
    this.life--;
    if (this.life<1) {
        this.kill();
        return;
    }
    var m = this.size;
    this.start = this.position.clone();
    this.position.x += (this.vector.x * m);
    this.position.y += (this.vector.y * m);
};


proto.draw = function() {
    var sx = this.start.x;
    var sy = this.start.y;
    var x = this.position.x;
    var y = this.position.y;
    var s = this.scale*units;
    var hs = s/2;
    //ctx[1].fillRect(x-hs,y-hs,2*s,2*s);
    var ct = ctx[1];
    ct.lineWidth = s;


    ct.beginPath();
    /*ct.arc(x,y,s,0,TAU);
    ct.closePath();
    ct.fill();*/

    ct.moveTo(sx,sy);
    ct.lineTo(x,y);
    ct.stroke();
};


proto.kill = function() {
    var index = this.parent.p.indexOf(this);
    if (index > -1) {
        this.parent.p.splice(index, 1);
    }
};