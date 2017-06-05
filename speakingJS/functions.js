// functions in js have 3 roles
// "normal"
id('hello'); id.call(this, 'hello'); ...
// constructors
new Date();
// methods
obj.method();




// all functions are objects, 
// instances of Function constructor
function id(x) {
  return x;
}
id instanceof Function // constructor
id instanceof Object // super-constructor




// function expression 
var add = function(a, b) { return a + b }; 

// named function expressions can't be 
// called from outside
var repeat = function named(n, str) {
  return (n > 0) ? str + named(n-1, str) : '';
}; 
console.log(repeat(3, 'Yeah'));// YeahYeahYeah
console.log(named);//ReferenceError: named is not defined




// hoisting
func();
function func() { return 34 };

abc();//throws error, abc is only declared, not defined
var abc = function () {...};




// functions have prop name
function bla () {};
bla.name === 'bla';




// it is better to use functions declarations cuz of
// hoisting and .name prop




// functions have 3 methods for calling them
func.call(this, arg1, arg2...)
func.apply(this, [arg1, arg2...])
var newFunc = func.bind(this, arg1);
newFunc(arg2);




/*
 * arguments isn't an array
 * but it is an object
 */
function g() { return arguments.hasOwnProperty(1) };
g('a', 'b') === true




/* 
 * be careful when passing functions as arguments to
 * other functions
 */
['1', '2', '3'].map(function(x) { return x*x });//[1, 4, 9]
['1', '2', '3'].map(parseInt);// [1, NaN, NaN]
/*
 * this is cuz map every time calls parseInt(el, index, array)
 * and parseInt takes (string, radix)
 * the correct variant is the following
 */
['1', '2', '3'].map(function(x) { return parseInt(x, 10) });




//IIFE = Immediately Invoked function expression
(function bla() {return 'sup'}());
//or
(function bla() {return 'sup'})();




/* to check if a variable exists in global scope (for
   example for shims and polyfills), you can use : */
if(window.someVariable !== undefined) {}
if('someVariable' in window) {}
if(typeof someVariable !== 'undefined') {}




// Closures: functions stay connected to their birth scope
function a(x) {
  return function (y) {
    x += y; //accessed from the previous func
    return x;
  };
}
var inc = a(5);/* inc is the closure
                  it holds the var x = 5 */

inc(1);/* the variable x inside func a is saved 
          just like the cache in memoization function */
inc(1);/* x used to be 5 but after the prev inc(1) it
          became 6 and applying inc once more we make it 7 */




/* Shared variables mustn't be mutated or your
   outputs might bear unexpected results */
function f() {
  var result = [];
  for(var i = 0; i < 3; i++) {
    var func = function() { return i };
    /* func takes the var i from the outer scope
       and this is a closure, hence 'i' will point to the 
       latest instance of that variable's value */
    result.push(func);
  }
  return result;
}
console.log(f()[1]()); // output is 3 cuz the current val of i is 3

/* to make it work we have to pass the current i as 
 * default parameter with bind */
function f() {
  var result = [];
  for(var i = 0; i < 3; i++) {
    var func = function(i) { return i };
    result.push(func.bind(null, i));
  }
  return result;
}
console.log(f()[1]()); // output is 1



/* Example binding function */
function foo(stuff) {
  console.log(this.a, stuff);
  return this.a + stuff;
}

function bind(f, thisVal){
  return function() {
    return f.apply(thisVal, arguments);
  };
}

var obj = { a: 2 };
var b = bind(foo, obj)(3);// 2 3
console.log(b);//=> 5
