javalikejavascriptinheritance
=============================

A simple function that enables for java-like object inheritance in javascript!

Features:
- Superclass constructors are executed before subclass constructor code runs
- Superclass constructor parameters can be provided to subclass constructor
- Subclass constructor may use additional parameters
- Overriden superclass member functions are available via <Subclass>.prototype.uber
- Superclass instance variables are injected into subclass instances (because the superclass constructor is executed before the subclass constructor takes place)

Sample code for class inheritance
=================================
```javascript
var Extend = require('./Extend.js');
function Shape() {
    this.name = "shape";
    console.log('Shape Constructor ran');
};
Shape.prototype.toString = function(){
    console.log('<a shape>');
};
function TwoDShape() {
    this.name = "a 2D shape";
    console.log('TwoDShape Constructor ran');
};
TwoDShape = Extend(Shape, TwoDShape);
//declare instance methods only after having called Extend
TwoDShape.prototype.toString = function () {
    //tap into Shape's "toString" implementation
    return TwoDShape.prototype.uber.toString.call(this) + " " + this.name;
};
function ThreeDShape() {
    this.name = "a 3D shape";
    Log.Message('ThreeDShape Constructor ran');
};
ThreeDShape = Extend(TwoDShape, ThreeDShape);
//declare instance methods only after having called Extend
ThreeDShape.prototype.toString = function () {
    //tap into TwoDShape's "toString" implementation
    return ThreeDShape.prototype.uber.toString.call(this) + " " + this.name;
};

var a3DShape = new ThreeDShape();
//the following line prints: "Shape Constructor ran... TwoDShape Constructor ran.... ThreeDShape Constructor ran"

a3DShape.toString();
//prints: "<a shape> a 3D shape a 3D shape"


```

