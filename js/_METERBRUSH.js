

function MeterBrush() {
    this.p = [];
}
var proto = MeterBrush.prototype;


proto.setup = function() {

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

proto.burst = function(position,vector,mode,size) {
    var v = new Vector((vector.x + tombola.rangeFloat(-1,1)), (vector.y + tombola.rangeFloat(-1,1)));
    var p;
    if (mode === 0) {
        v = new Vector(0,1);
        p = position.clone();
    } else {
        var r = 11;
        p = new Point(position.x + tombola.rangeFloat(-r*units,r*units),position.y + tombola.rangeFloat(-r*units,r*units));
    }
    this.p.push(new MeterP(p,v,size,mode,this));
};




function MeterP(position,vector,size,mode,parent) {
    this.position = position;
    this.vector = vector;
    this.size = size;
    this.mode = mode;
    this.parent = parent;
    this.life = tombola.range(40,60);
    var r = meter*15;
    if (mode===1) {
        r = meter;
    }
    this.rad = r;
}
proto = MeterP.prototype;


proto.kill = function() {
    var index = this.parent.p.indexOf(this);
    if (index > -1) {
        this.parent.p.splice(index, 1);
    }
};

proto.update = function() {
    this.life--;
    if (this.life<1) {
        this.kill();
        return;
    }

    this.position.x += (this.vector.x * this.size);
    this.position.y += (this.vector.y * this.size);
    if (this.mode === 0) {
        this.rad *= 0.95;
    } else {
        this.rad *= 1.03;
    }

};

proto.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x,this.position.y,this.rad,0,TAU);
    ctx.closePath();
    ctx.fill();
};