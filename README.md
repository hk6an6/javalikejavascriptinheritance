javalikejavascriptinheritance
=============================

A simple function that enables for java-like object inheritance in javascript!

Features:
- Superclass constructors are executed before subclass constructor code runs
- Superclass constructor parameters can be provided to subclass constructor
- Subclass constructor may use additional parameters
- Overriden superclass member functions are available via <Subclass>.prototype.uber
- Superclass instance variables are injected into subclass instances (because the superclass constructor is executed before the subclass constructor takes place)

Getting started
===============
var Extend = require('./Extend.js');


