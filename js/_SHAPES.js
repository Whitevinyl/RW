

function Shapes() {
    this.p = [];
}
var proto = Shapes.prototype;


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

proto.burst = function(position,vector,size) {
    var points = [];
    var vectors = [];
    var speeds = [];

    for (var i=0; i<2; i++) {
        points.push(position.clone());
        var va = angleFromVector(vector) + (degToRad(tombola.range(-5,5))*i);
        var v = vectorFromAngle(va);
        vectors.push(v);
        speeds.push(tombola.rangeFloat(size,size*3));
    }

    this.p.push(new ShapeP(position.clone(),speeds,points,vectors,this));
};




function ShapeP(position,speeds,points,vectors,parent) {
    this.position = position;
    this.speeds = speeds;
    this.points = points;
    this.vectors = vectors;
    this.parent = parent;
    this.life = tombola.range(10,30);
}
proto = ShapeP.prototype;


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
    var l = this.points.length;
    for (var j=0; j<l; j++) {
        this.points[j].x += (this.vectors[j].x * this.speeds[j]);
        this.points[j].y += (this.vectors[j].y * this.speeds[j]);
    }

};

proto.draw = function(ctx) {
    var l = this.points.length;
    ctx.beginPath();
    ctx.moveTo(this.position.x,this.position.y);

    for (var j=0; j<l; j++) {
        var p = this.points[j];
        ctx.lineTo(p.x,p.y);
    }

    ctx.closePath();
    ctx.fill();
};