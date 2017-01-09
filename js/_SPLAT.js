function Splat() {
}
var proto = Splat.prototype;


proto.setup = function() {

};


proto.burst = function(position,vector) {

    var c = tombola.item(paints);
    if (tombola.percent(70)) {
        c = colorBlend(paints[0],paints[1],tombola.range(10,90));
    }
    if (tombola.percent(25)) {
        c = colorBlend(c,lightCol,tombola.range(10,85));
    }

    var n = tombola.range(1,6);
    for (var i=0; i<n; i++) {
        var v = new Vector((vector.x + tombola.rangeFloat(-3,3)), (vector.y + tombola.rangeFloat(-3,3)));
        var m = tombola.range(2,16);
        var x = position.x + (v.x * m);
        var y = position.y + (v.y * m);
        var s = tombola.rangeFloat(0.5,2);
        if (tombola.percent(5)) {
            s = tombola.rangeFloat(2,6);
        }
        this.draw(x,y,s,c);
    }
};

proto.draw = function(x,y,s,col) {
    color.fill(ctx[1],col);
    ctx[1].beginPath();
    ctx[1].arc(x,y,s,0,TAU);
    ctx[1].closePath();
    ctx[1].fill();
};