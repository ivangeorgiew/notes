/* Default values */
function bla(url, timeout = 2000, callback) {
  return true;
}

//timeout is default, cuz undefined is passed
bla('/foo', undefined, function(body) {});
//timeout is null. only undefined will ask for the default val
bla('/foo', null, function(body) {});




/* Arguments object changes when passing 
 * default arguments */
function foo(a, b='haha') {
  console.log(arguments.length);
  console.log(a === arguments[0]);
  console.log(b === arguments[1]);
  a = 34;
  b = 12;
  console.log(a === arguments[0]);
  console.log(b === arguments[1]);
}

foo('sup');
/* 1
 * true
 * false

 * false
 * false
 */




/* Rest parameters */
function foo(arg1, ...arg2){
  return arguments.length;
}
//arg2 is an array of all the arguments that are input
//after the first one
foo(0, 1, 2, 3, 4)/* arg1=0 arg2=[1, 2, 3, 4] */
//arguments.length = 5;

//error, cuz rest parameter must be last one
function foo(a, ...b, c){}

//the purpose of rest parameters is mainly to
//replace arguments object
function foo(...args) {
  console.log(args.length, arguments.length);
  console.log(args[0], arguments[0]);
  console.log(args[1], arguments[1]);
}
foo('sup', 36)/* 2, 2
                 sup, sup
                 36, 36 */




/* Spread operator
 * takes an array and lists its values */
let values = [12, 34, 5];
//Equivalent to Math.max.apply(Math, values)
console.log(Math.max(...values));//(12, 34, 5)




/* Arrow functions 
 * dont have 'this', 'super', 'arguments', new,
 * no prototype,
 * can't change 'this'
 */
var reflect = val => val;
// is equivalent to;
var reflect = function(val) { return val; };
// but mind the above mentioned differences




/* Use case for arrow functions in complex use 
 * of this variable */

//with ES5
var PageHandler = {
  id: "123456",
  init: function() {
    document.addEventListener("click", (function(event) {
      this.doSomething(event.type);
    }).bind(this), false);/* we have to bind it to PageHandler
                             otherwise the context is document */
  },
  doSomething: function(type) {
    console.log("Handling " + type  + " for " + this.id);
  }
};

//with ES6
var PageHandler = {
  id: "123456",
  init: function() {
    document.addEventListener("click",
      event => this.doSomething(event.type), false);
    /* arrow functions don't have this binding, so in that case
     * this will automatically point to PageHandler, cuz its the
     * scope above */
  },
  doSomething: function(type) {
    console.log("Handling " + type  + " for " + this.id);
  }
}




/* Tail call is a feature from ES5
 * when a function is called as the last statement
 * in another function */
function a() {
  retutn b();/* tail call */
}

/* in ES6 we can optimize these functions so
 * that the call stack doesn't exceed memory,
 * but we need to use strict mode */
"use strict";
function a() {
  retutn b();/* optimized */
}
/* in order for the tail call to be optimized,
 * it mustn't be a closure, it must be returned and
 * the Higher-Order function mustn't have more to do
 * after the call.  */

// this will be optimized
function fact(n, p = 1) {
  if(n <= 1)
    return 1 * p;
  return fact(n-1, n*p);
}
