function Pip() {
    this.p1 = [];
    this.on = false;
}
var proto = Pip.prototype;


proto.setup = function() {
    this.on = true;
};

proto.update = function() {
    if (this.on) {
        var l = this.p1.length-1;
        for (var i=l; i>=0; i--) {
            this.p1[i].update();
        }
    }
};

proto.draw = function() {
    if (this.on) {
        var l = this.p1.length;
        ctx[0].lineWidth = 2;
        color.stroke(ctx[0],bgCols[1]);
        for (var i=0; i<l; i++) {
            this.p1[i].draw();
        }
    }
};

proto.burst = function(size) {
    var x = dx + (tombola.range(-250,250)*units);
    x = dx - (250*units);
    var y = dy;
    var s = -1;
    this.p1.push(new PipP(x,y,s,size));
};



function PipP(x,y,s,size) {
    this.position = new Point(x,y);
    this.speed = s;
    this.size = size;
}
proto = PipP.prototype;


proto.update = function() {

    // kill if offscreen //
    if (this.position.y<-50) {
        this.kill();
        return;
    }

    // update speed & position //
    this.position.y += (this.speed*units);
};


proto.kill = function() {
    // get my index //
    var index = pips.p1.indexOf(this);
    // remove //
    if (index > -1) {
        pips.p1.splice(index, 1);
    }
};


proto.draw = function() {
    var x = this.position.x;
    var y = this.position.y;
    var s = this.size * units;

    ctx[0].fillRect(x,y,s,s);
};

