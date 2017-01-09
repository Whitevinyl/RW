

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

    var c = tombola.item(paints);
    if (tombola.percent(70)) {
        c = colorBlend(paints[0],paints[1],tombola.range(10,90));
    }
    if (tombola.percent(25)) {
        c = colorBlend(c,lightCol,tombola.range(10,85));
    }

    //var v = new Vector((vector.x + tombola.rangeFloat(-1,1)), (vector.y + tombola.rangeFloat(-1,1)));
    var v = vector;
    var p;
    if (mode === 0) {
        v = new Vector(0,1);
        p = position.clone();
    }
    if (mode === 1) {
        var r = 11;
        p = new Point(position.x + tombola.rangeFloat(-r*units,r*units),position.y + tombola.rangeFloat(-r*units,r*units));
    }
    if (mode === 2) {
        v.normalise();
        p = position.clone();
    }
    this.p.push(new MeterP(p,v,size,mode,this,c));
};




function MeterP(position,vector,size,mode,parent,color) {
    this.position = position;
    this.vector = vector;
    this.size = size;
    this.mode = mode;
    this.parent = parent;
    this.color = color;
    var r;
    if (mode===0) {
        r = meter*15;
        this.life = tombola.range(30,70);
    }
    if (mode===1) {
        r = meter*2;
        this.size = 0.5;
        this.life = tombola.range(20,50);
    }
    if (mode===2) {
        r = meter*10;
        this.size = 0.1;
        this.life = tombola.range(10,40);
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
    }
    if (this.mode === 1){
        this.rad *= 1.02;
    }
    if (this.mode === 2) {
        this.rad *= 0.999;
    }

};

proto.draw = function(ctx) {
    color.fill(ctx,this.color);
    ctx.beginPath();
    ctx.arc(this.position.x,this.position.y,this.rad,0,TAU);
    ctx.closePath();
    ctx.fill();
};