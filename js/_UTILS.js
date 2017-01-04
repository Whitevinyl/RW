
//-------------------------------------------------------------------------------------------
//  FUNCTIONS
//-------------------------------------------------------------------------------------------



// IS CURSOR WITHIN GIVEN BOUNDARIES //
function hudCheck(x,y,w,h) {
    var mx = mouseX;
    var my = mouseY;
    return (mx>x && mx<(x+w) && my>y && my<(y+h));
}



// LOCK A VALUE WITHIN GIVEN RANGE //
function valueInRange(value,floor,ceiling) {
    if (value < floor) {
        value = floor;
    }
    if (value> ceiling) {
        value = ceiling;
    }
    return value;
}



// LERP TWEEN / EASE //
function lerp(current,destination,speed) {
    return current + (((destination-current)/100) * speed);
}



// IS VAL A NEAR TO VAL B //
function near(a,b,factor) {
    return Math.round(a/factor) == Math.round(b/factor);
}


function decimaRound(n,places) {
    var p = Math.pow(10,places);
    return Math.round(n * p) / p;
}

//-------------------------------------------------------------------------------------------
//  OBJECTS
//-------------------------------------------------------------------------------------------


function Point( x, y ) {
    this.x = x || 0;
    this.y = y || 0;
}
Point.prototype.clone = function() {
    return new Point(this.x,this.y);
};

function Point3D( x, y, z ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

function Vector( x, y ) {
    this.x = x || 0;
    this.y = y || 0;
}
Vector.prototype.normalise = function() {
    var m = 1/Math.max(this.x,this.y);
    this.x *= m;
    this.y *= m;
};

function Size( w, h ) {
    this.w = w || 0;
    this.h = h || 0;
}


function Alpha(a) {
    this.A = a;
}