

function Painter() {
    this.position = null;
    this.positionDest = null;
    this.simplex = new SimplexNoise();
    this.index = 10;
    this.velocity = 0;
    this.velocityDest = 0;
    this.vector = null;
    this.dragged = false;
    this.trail = 30;
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

    // current position (for calculating vector) //
    var lx = this.position.x;
    var ly = this.position.y;

    // walk the simplex //
    this.index += this.velocity;
    if (!this.dragged) {
        this.positionDest.x = dx + (this.simplex.noise(this.index,0) * (dx*0.8));
        this.positionDest.y = dy + (this.simplex.noise(0,this.index) * (dy*0.8));
    }

    // move //
    this.position.x = lerp(this.position.x,this.positionDest.x,20);
    this.position.y = lerp(this.position.y,this.positionDest.y,20);

    // finish calculating vector //
    this.vector.x = this.position.x - lx;
    this.vector.y = this.position.y - ly;


    // set velocity //
    this.velocity = lerp(this.velocity,this.velocityDest,10);

    // slow Down  //
    this.velocityDest *= 0.94;
    this.velocityDest = valueInRange(this.velocityDest,0,30);

    /*if (audioIsPlaying) {
        this.trail--;
        if (this.trail<1) {
            this.trail = 30;
            if (this.dragged) {
                this.trail = 5;
            }
            trail.burst(this.position,this.vector);
        }
    }*/
};

proto.toMouse = function() {
    if (this.dragged) {
        this.positionDest.x = mouseX;
        this.positionDest.y = mouseY;
    }
};


proto.burst = function(size) {

    // main strokes //
    strokes.burst(this.position,this.vector,size);

    // drip //
    if (size>0.5 && tombola.percent(60)) {
        meterBrush.burst(this.position,this.vector,0,size*2);
    }

    // brush //
    if (size>0.5 && tombola.percent(40)) {
        var s = size;
        if (s>3) s = 3;
        meterBrush.burst(this.position,this.vector,1,s);
    }

    // splat //
    if (this.velocity>0.009 || (this.velocity>0.004 && tombola.percent(10))) {
        splat.burst(this.position,this.vector);
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