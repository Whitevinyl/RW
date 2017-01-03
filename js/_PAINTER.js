

function Painter() {
    this.position = null;
    this.simplex = new SimplexNoise();
    this.index = 10;
    this.velocity = 0;
    this.velocityDest = 0;
    this.vector = null;
}
var proto = Painter.prototype;


proto.setup = function() {
    this.position = new Point(dx,dy);
    this.vector = new Vector(0,0);
};

proto.addVelocity = function(v) {
    this.velocityDest = this.velocity + v;
};

proto.walk = function() {
    this.index += this.velocity;

    var lx = this.position.x;
    var ly = this.position.y;
    this.position.x = dx + (this.simplex.noise(this.index,0) * (dx*0.8));
    this.position.y = dy + (this.simplex.noise(0,this.index) * (dy*0.8));

    this.vector.x = this.position.x - lx;
    this.vector.y = this.position.y - ly;

    this.velocity = lerp(this.velocity,this.velocityDest,10);
    this.velocityDest *= 0.94;
    this.velocityDest = valueInRange(this.velocityDest,0.0001,30);
};

proto.burst = function(size) {
    strokes.burst(this.position,this.vector,size);
};


proto.draw = function() {
    var x = this.position.x - (5*units);
    var y = this.position.y - (5*units);
    ctx[0].fillRect(x,y,10*units,10*units);
};