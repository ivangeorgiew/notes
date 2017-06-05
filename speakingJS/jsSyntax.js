// in order to evaluate a statement which starts
// with { (ex: objects) you need to put it in ()
eval('{foo: 23}');// -> 23
eval('({foo: 23})');// -> {foo: 23}


// immediately invoking function expression === IIFE
(function () { return 'abc' }());
// spits error when:
function () { return 'abc' }();
function foo() { return 'abc' }();


// js supports any unicode, so this is valid
var майна = 'здрасти';
console.log(майна + 'Пешо');


// in order to invoke methods in a number context
// you have to use either of these options, otherwise
// js assumes its a floating-point number(ex: 1.54)
1..toString();
1 .toString();
(1).toString();
1.0.toString();
