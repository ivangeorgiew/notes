// there are only primitive values and objects
// Primitive: numbers, booleans, strings, undefined and null
// Objects: everything else (it's done with constructors)
var obj1 = {};
var obj2 = {};
obj1 !== obj2

var prim1 = 123;
var prim2 = 123;
prim1 === prim2;




// Primitives have the following characteristics:
// The contents are compared
3 === 3
'abc' === 'abc'

// Properties CAN'T be changed, added or removed
var str = 'abc';
str.length = 1;//doesn't change
str.bla = 3;//doesn't add
delete str.bla;//doesn't remove




// Objects have the following characteristics:
// The identities are compared
{} !== {}

// Properties CAN be changed, added and removed
var arr = [];
arr.length = 54;//changes
arr.bla = 'hey';//creates
delete arr.bla;//deletes




// undefined means no value (neither primitive nor object)
// null means no object (its is used when an object is expected)




// Wrapper Objects are objects made with the constructors:
// Boolean, Number and String
var bool = new Boolean(true);
bool !== true
// as functions they can convert values
String(123) -> "123"
// it is best to avoid wrapper objects




// Primitives borrow their methods from wrappers
'abc'.charAt === String.prototype.charAt
