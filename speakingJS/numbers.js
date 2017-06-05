// numbers are always floating-point in js
35  === 35.0


// you can use exponents
5e2 === 5*10^2


// in order to invoke methods on numbers
// you have to use one of these ways
123..toString();
123.0.toString();
(123).toString();


// Use Number() instead of parseFloat()
parseFloat('123.45#') === NaN
Number('123.45#') === 0


// NaN is the only value not equal to itself
// if you want to see if a value is NaN you have
// to use isNaN() or check if it's equal to itself
NaN !== NaN
isNaN(NaN) === true
function checkIsNaN(val) {
  return val !== val;
}


// isFinite checks if a value 
// is neither Infinity, nor NaN
isFinite(NaN) !== false
isFinite(Infinity) !== false


// Number.isSafeInteger is an es6 feature
Number.isSafeInteger(2e52) === false 
Number.isSafeInteger(Math.pow(2, 52)) === true


// to convert a number to different base use parseInt()
parseInt('0xA', 16) === 10
parseInt('A', 16) === 10
parseInt('zz', 36) === 1295


// difference between x++ and ++x 
var x = 3;
x++ === 3;
x === 4;

var x = 3;
++x === 4;
x === 4;


// the % opperator is not modulo
function isOdd(n) {
  return n % 2 === 1;
}
isOdd(-5) === false //cuz n % 2 => -1 and -1 !== 1
// the right way is
function isOdd(n) {
  return Math.abs(n % 2) === 1;
}


// Number constructor prototype methods
Number.prototype.toFixed.call(0.003, 5)//-> 0.00300   
Number.prototype.toPrecision.call(0.003, 5)//-> 0.0030000   
Number.prototype.toExponential.call(0.003, 5)//-> 3.00000e-3
// ...and more
