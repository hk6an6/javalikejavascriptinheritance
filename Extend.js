function extend(BaseClass, SubClass) {
    var newClassDefinition,
        i;
    for (i in BaseClass.prototype) {
        SubClass.prototype[i] = BaseClass.prototype[i];
    }
    SubClass.prototype.uber = BaseClass.prototype;
    newClassDefinition = function () {
        var ancestor = SubClass.prototype.uber,
            inheritanceChain = [];
        while (ancestor) {
            inheritanceChain.push(ancestor.constructor);
            ancestor = ancestor.uber;
        }
        while (inheritanceChain.length) {
            inheritanceChain[inheritanceChain.length - 1].apply(this, arguments);
            inheritanceChain = inheritanceChain.slice(0, inheritanceChain.length - 1);
        }
        SubClass.apply(this, arguments);
    }
    newClassDefinition.prototype = SubClass.prototype;
    return newClassDefinition;
}
module.exports = extend;
////////////////////////////
////////////////////////////
////////////////////////////
///sample code
////////////////////////////
////////////////////////////
////////////////////////////
function Shape() {
    Log.Message('Shape Constructor ran');
};

function TwoDShape() {
    Log.Message('TwoDShape Constructor ran');
};
TwoDShape = extend(Shape, TwoDShape);

function ThreeDShape() {
    Log.Message('ThreeDShape Constructor ran');
};
ThreeDShape = extend(TwoDShape, ThreeDShape);
var a3DShape = new ThreeDShape();
//prints: "Shape Constructor ran... TwoDShape Constructor ran.... ThreeDShape Constructor ran"
//and also initializes all instance members just like they were meant by the superclass implementation
//a3DShape has access to every member-function/method in both Shape and TwoDShape and may override methods and gain access to the superclass definition in spite of the overrides. And it will also feature properties for any member variable be it an object or an array:
TwoDShape.prototype.toString = function () {
    return TwoDShape.prototype.uber.toString.call(this) + " " + this.name;
};
ThreeDShape.prototype.toString = function () {
    return ThreeDShape.prototype.uber.toString.call(this) + " " + this.name;
};