function Streaks() {
    this.p = [];
}
var proto = Streaks.prototype;


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
    var n = tombola.range(1,3);
    for (var i=0; i<n; i++) {
        var v = new Vector((vector.x + tombola.rangeFloat(-1,1)), (vector.y + tombola.rangeFloat(-1,1)));
        this.p.push(new StreakP(position.clone(),v,size,mode,this));
    }
};




function StreakP(position,vector,size,mode,parent) {
    this.position = position;
    this.start = this.position.clone();
    this.vector = vector;
    this.size = size * tombola.rangeFloat(0.8,1.2);
    this.parent = parent;
    this.life = tombola.range(20,70);
    this.mode = mode;
}
proto = StreakP.prototype;


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

    if (this.mode === 0) {
        if (tombola.chance(1,200)) {
            this.vector.x += tombola.rangeFloat(-0.8,0.8);
            this.vector.y += tombola.rangeFloat(-0.8,0.8);
        }
    }
    if (this.mode === 1) {
        this.start = this.position.clone();
        if (tombola.chance(1,30)) {
            this.vector.x += tombola.rangeFloat(-1,1);
            this.vector.y += tombola.rangeFloat(-1,1);
        }
    }
    if (this.mode === 2) {
        this.start = this.position.clone();
        this.vector.x += tombola.rangeFloat(-0.6,0.6);
        this.vector.y += tombola.rangeFloat(-0.6,0.6);

    }
    this.vector.x = valueInRange(this.vector.x,-3,3);
    this.vector.y = valueInRange(this.vector.y,-3,3);

    this.position.x += (this.vector.x * this.size);
    this.position.y += (this.vector.y * this.size);

};

proto.draw = function(ctx) {
    var sx = this.start.x;
    var sy = this.start.y;
    var x = this.position.x;
    var y = this.position.y;
    ctx.lineWidth = 1*units;

    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.lineTo(x,y);
    ctx.stroke();
};