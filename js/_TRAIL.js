function Trail() {
}
var proto = Trail.prototype;


proto.setup = function() {

};

proto.burst = function(position,vector) {
    this.draw(position.x,position.y,position.x + vector.x, position.y + vector.y);
};

proto.draw = function(x,y,x1,y1) {
    color.stroke(ctx[1],lightCol);
    ctx[1].lineWidth = units;
    ctx[1].beginPath();
    ctx[1].moveTo(x1,y1);
    ctx[1].lineTo(x,y);
    ctx[1].stroke();
};