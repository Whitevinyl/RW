

function Painter() {
    this.position = null;
    this.positionDest = null;
    this.simplex = new SimplexNoise();
    this.index = 10;
    this.velocity = 0;
    this.velocityDest = 0;
    this.vector = null;
    this.dragged = false;
}
var proto = Painter.prototype;


proto.setup = function() {
    this.position = new Point(dx,dy);
    this.positionDest = this.position.clone();
    this.vector = new Vector(0,0);
};

proto.addVelocity = function(v) {
    this.velocityDest = this.velocity + v;
};

proto.walk = function() {
    this.index += this.velocity;

    var lx = this.position.x;
    var ly = this.position.y;
    if (!this.dragged) {
        this.positionDest.x = dx + (this.simplex.noise(this.index,0) * (dx*0.8));
        this.positionDest.y = dy + (this.simplex.noise(0,this.index) * (dy*0.8));
    }
    this.position.x = lerp(this.position.x,this.positionDest.x,20);
    this.position.y = lerp(this.position.y,this.positionDest.y,20);

    this.vector.x = this.position.x - lx;
    this.vector.y = this.position.y - ly;

    this.velocity = lerp(this.velocity,this.velocityDest,10);
    this.velocityDest *= 0.94;
    this.velocityDest = valueInRange(this.velocityDest,0,30);
};

proto.toMouse = function() {
    if (this.dragged) {
        this.positionDest.x = mouseX;
        this.positionDest.y = mouseY;
    }
};


proto.burst = function(size) {
    strokes.burst(this.position,this.vector,size);

    // drip //
    if (size>0.5 && tombola.percent(50)) {
        meterBrush.burst(this.position,this.vector,0,size*2);
    }

    // spatter //
    if (this.velocity>0.0032 && tombola.percent(90)) {
        meterBrush.burst(this.position, this.vector, 1, this.velocity * tombola.range(25, 40));
    }

    // brush //
    if (size>0.5 && tombola.percent(40)) {
        meterBrush.burst(this.position,this.vector,2,tombola.rangeFloat(0.8,3));
    }

    if (tombola.percent(20)) {
        streaks.burst(this.position,this.vector,tombola.range(0,1),size);
    }
};


proto.draw = function() {
    var x = this.position.x;
    var y = this.position.y;
    var s = 4*units;
    var ct = ctx[0];

    color.stroke(ct,lightCol);
    ct.lineWidth = units;
    ct.beginPath();
    ct.moveTo(x-s,y);
    ct.lineTo(x,y-s);
    ct.lineTo(x+s,y);
    ct.lineTo(x,y+s);
    ct.closePath();
    ct.stroke();
};