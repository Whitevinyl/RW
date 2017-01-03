
function Strokes() {
    this.p = [];
}
var proto = Strokes.prototype;


proto.setup = function() {

};


proto.burst = function(position,vector,size) {
    var n = tombola.range(7,11);
    var r = 5*units;
    var v = new Vector((vector.x + tombola.rangeFloat(-1,1))*size, (vector.y + tombola.rangeFloat(-1,1))*size );
    for (var i=0; i<n; i++) {
        var p = new Point(position.x + tombola.rangeFloat(-r,r), position.y + tombola.rangeFloat(-r,r));

        this.p.push( new Brush(p,v,this) );
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




function Brush(position,vector,parent) {
    this.position = position;
    this.vector = vector;
    this.parent = parent;
    this.life = tombola.range(30,60);
    this.scale = tombola.rangeFloat(0.2,1.5);
}
proto = Brush.prototype;


proto.update = function() {
    this.life--;
    if (this.life<1) {
        this.kill();
        return;
    }
    var m = tombola.rangeFloat(0.8,1.2);
    this.position.x += (this.vector.x * m);
    this.position.y += (this.vector.y * m);
};


proto.draw = function() {
    var x = this.position.x;
    var y = this.position.y;
    var s = this.scale*units;
    var hs = s/2;
    ctx[1].fillRect(x-hs,y-hs,2*s,2*s);
};


proto.kill = function() {
    var index = this.parent.p.indexOf(this);
    if (index > -1) {
        this.parent.p.splice(index, 1);
    }
};