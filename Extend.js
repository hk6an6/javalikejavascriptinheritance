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