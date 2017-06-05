/* one of the unique features of JS is
   that you can create objects without the 
   use of classes */
var obj = {
  name: 'Gesha'
}; /* creates an instance of Object
      without the notation */




/* with delete prop you remove the value AND the key */
var obj = {
  name: 'Bla'
};
obj.name = undefined;
Object.keys(obj) === ['name']

delete obj.name
Object.keys(obj) === []



/* Creating props that can or cannot be modified */
var obj = {}
Object.defineProperty(obj, 'canBeDeleted', {
  value: 123,
  configurable: true
});

Object.defineProperty(obj, 'cannotBeDeleted', {
  value: 123,
  configurable: false
});

delete obj.canBeDeleted === true /* can be deleted*/
delete obj.cannotBeDeleted === false /* can't be deleted */
delete obj.toString === true /* says true, but can't delete
                                inherited props or non-existing ones */




/* the bracket operator coerces its interior to string */
var obj = { '6': 'bar' };
obj[3+3] /* key is '6' */




/* you can convert every type to object 
   instanceof applies to all of the equalities below */
Object(undefined) === {}
Object(null) === {}
Object({}) === {}
Object(funnction (){}) === new Function()
Object([]) === new Array()
Object(34) === new Number(34)
Object('hey') === new String('hey')
Object(true) === new Boolean(true)




/* this is an implicit parameter 
   of functions and methods */
function abc() { return this };
abc() === window

var obj = { sup: abc };
obj.sup() === obj;




/* call, apply and bind methods */
var jane = {
  name: 'Jane',
  sayHelloTo: function (otherName) {
    'use strict';
    console.log(this.name + ' says hello to ' + otherName);
  }
}

jane.sayHelloTo('Tarzan') ===

  jane.sayHelloTo.call(jane, 'Tarzan') ===

  jane.sayHelloTo.apply(jane, ['Tarzan']) ===

  jane.sayHelloTo.bind(jane)('Tarzan') ===

  jane.sayHelloTo.bind(jane, 'Tarzan')()




/* spead operator(...) and apply are equivalent in some cases */
var arr = [13, 7, 30];
Math.max(...arr) === Math.max.apply(null, arr);

/* but you cant simply substitute the ... with apply
   in constructors, you have to use a more complicated way */ 
new Date(...[2011, 11, 24]);

new (Function.prototype.bind.apply(Date, [null, 2011, 11, 24]));

var args = [2011, 11, 24];
new (Function.prototype.bind.apply(Date, [null].concat(args)));




/* if we extract a method as a seperate function and
   the method uses 'this', the funcitons is going to break */
var counter = {
  count: 0,
  inc: function() { this.count++ }
};

var inc = counter.inc;
inc();
counter.count === 0 /* didn't work cuz when method inc
                       got taken out from the counter its this points 
                       to window/global object */
global.count === NaN /* global.count was undefined, hence
                        global.count = undefined + 1 => NaN */

/* how to properly extract methods */
var inc = counter.inc.bind(counter);
inc();
counter.count === 1 /* it worked */

/* callbacks and extracted methods */
function callIt(callback) {
  callback();
}
callIt(counter.inc.bind(counter));
counter.count === 2 /* works and is 2 cuz it was 
                       incremented once already before that */




/* Functions inside methods shadow this */
var obj = {
  name: 'Jane',
  friends: ['Tarzan', 'Cheeta'],
  loop: function() {
    'use strict';
    this.friends.forEach(
      function(friend) {
        console.log(this.name+' knows '+friend);
      }.bind(this) /* if it wasn't for .bind(this),
                      this would have pointed to the function's this
                      and not the method's */
    );
  }
};

obj.loop(); /* console.logs all the friends and
               works cuz we binded .loop's this to 
               the anon function inside it */




/* every object has prototype (it can still be null)
   and you can set it by [[Prototype]] but that is an 
   internal setting and you have to use __proto__ instead */
var protoObj = {
  describe: function () {
    return 'name: ' + this.name;
  }
};
var obj = {
  __proto__: protoObj,
  name: 'obj'
};
obj.describe();
/* this way however is very slow and inefficient
   it is highly advised to use Object.create() instead */
var obj = Object.create(protoObj, {
  name: {value: 'obj', writable: true }
});
// or obj.name = 'obj';
obj.describe();




/* to get the prototype of object
   (example from prev protoObj and obj)*/
var protoObj = {
  describe: function () {
    return 'name: ' + this.name;
  }
};
var obj = Object.create(protoObj);
obj.name = 'john';

Object.getPrototypeOf(obj) === protoObj
// the reverse is done with
Object.prototype.isPrototypeOf.call(protoObj, obj) === true

/* to change, add or delete inherited props you can do it
   like so */
Object.getPrototypeOf(obj).shout = function() {
  return this.name;
};
obj.hasOwnProperty(shout) === false
obj.shout() === 'john'

delete Object.getPrototypeOf(obj).shout;
protoObj.hasOwnProperty(shout) == false




/* the difference between those methods */
Object.getOwnPropertyNames(obj) /* returns ALL props */
Object.keys(obj) /* returns ENUMERABLE props ONLY */




/* if you want to iterate over the enumerable props */
for( var prop in obj)
  console.log(prop);




/* if you want to iterate voer ALL props */
function getAllPropNames(obj) {
  if(obj) {
    return [].concat(
      Object.getOwnPropertyNames(obj),
      getAllPropNames(Object.getPrototypeOf(obj))
    );
  }
  return [];
}




/* Enumerability in props only affects:
   for-in loop, Object.keys(obj), JSON.stringify(obj) */
var proto = Object.defineProperty({}, {
  protoEnumProp: { value: 1, enumerable: true },
  protoNonEnumProp: { value: 2, enumerable: false }
});
var obj = Object.create(proto, {
  objEnumProp: { value: 1, enumerable: true },
  objNonEnumProp: { value: 2, enumerable: false }
});

/* Object enum own props length */
Object.keys(obj).length
/* Object all own props length */
Object.getOwnPropertyNames(obj).length




/* Ways to loop over object props */
//non-inherited enumerable
Object.keys(obj).forEach(function(key) {
  console.log(key);
});

//non-inherited enum and non-enum
Object.getOwnPropertyNames(obj).forEach(function(key) {
  console.log(key);
});

//inherited and non-inherited enum props
for(var key in obj) console.log(key);

/* absolutely every prop with the getAllPropNames
   function defined earlier */
getAllPropNames(obj)
  .forEach(function(key) {console.log(key)});




/* Accessors (getters and setters) are used
   for assigning and setting more complicated values
   (ex values requiring other values ) */
var obj = {
  firstName: 'Jimmy',
  lastName: 'Smith',
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  set fullName(name) {
    this.firstName = name.split(' ')[0];
    this.lastName = name.split(' ')[1];
  }
};

/* We can do the same with Object.defineProperty
var obj = {
  firstName: 'Jimmy',
  lastName: 'Smith',
};
Object.defineProperty(obj, 'fullName', {
  get: function() { return this.firstName + ' ' + this.lastName; },
  set: function(name) { 
    this.fistName = name.split(' ')[0];
    this.lastName = name.split(' ')[1];
  }
}); */

obj.fistName === 'Jimmy'
obj.lastName === 'Smith'
obj.fullName === 'Jimmy Smith' // using get
obj.fullName = 'Scot Wilkins' // using set
obj.firstName === 'Scot' // is changed
obj.fullName === 'Scot Wilkins' // is changed

/* getters and setters are inherited from prototypes */




/* All of property's state (both data and metadata) is stored
 * in property attributes 
 * [[Value]], [[Get]], [[Set]], [[Writable]],
 * [[Enumerable]], [[Configuragle]]
 *
 * They all point to undefined or false
 * Here is an example of setting all the attributes: 
 */
var obj = {}; 
/* we must create a new instance otherwise
 * we would have assigned times directly to
 * Object.prototype
 */
var obj = Object.defineProperties(obj, {
  times: {
    value: 123,
    writable: false,
    enumerable: true,
    configurable: false
  }
});

/* we can do exactly the same with Object.create
 * this time we chose to use get and set 
 * instead of val and writable attr
 */
var obj = Object.create(Object.prototype, {
  whatAge: {
    enumerable: true,
    configurable: false,
    get: function() { return 'My age is: ' + (this.age || 0); },
    set: function(val) {
      console.log('Setting age to', val);
      this.age = val;
    }
  }
});




// lists the above configurations from prop 'times'
Object.getOwnPropertyDescriptor(obj, 'age');




/* Descriptive way to clone an object 
 * of my own making
 */
function copyObject(orig) {
  return Object.create(Object.getPrototypeOf(orig),
    Object.getOwnPropertyNames(orig).reduce((soFar, key) => (
    Object.assign({}, soFar, {[key]: 
      Object.getOwnPropertyDescriptor(orig, key)
    })
  ), {}));
}




/* You can prevent the adding of new props to
 * an object with:
 */
Object.preventExtensions(obj);
obj.newProp = 234;//doesn't work

Object.isExtensible(obj);




/* Sealing an object does the same preventing
 * extensions does and doesn't allow for attributes
 * to be changed
 */
Object.seal(obj);

Object.isSealed(obj);




/* The third options of protecting an object is
 * freezing it which disallows ANY further modifications
 * but is shallow(if the object has other objects as props
 * they can still be changed)
 */
Object.freeze(obj);

Object.isFrozen(obj);




/* Deep freeze */
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach(function(key) {
    if(obj[key] !== null
      && typeof obj[key] === 'object' || typeof obj[key] === 'function')
      deepFreeze(obj[key]);
  });
  return Object.freeze(obj);
}




/* Constructors are used for creating objects */
function Person(name) {
  this.name = name || 'John';
}
Person.prototype.describe = function () {
  return 'Person named: '+this.name;
};
var jane = new Person('jane');
jane.describe() === 'Person named: jane'
Object.prototype.isPrototypeOf.call(Person.prototype, jane) === true
/* Technically a constructor is just a function
 * the specifis is what the keyword "new" does:
 *  created new object, whose prototype is Person.prototype
 *  the data is set up using "this"
 */




/* We can find out the constructor of an object
 * like this:
 */
function Car() {
  this.tires = 4;
}
var toyota = new Car();
/* inherits from Function.prototype.constructor */
toyota.constructor === [Function: Car]'




/* You should only add props to the constructor's
 * prototype property, cuz otherwise you will lose props
 * like constructor, length, name and so on
 */
Constructor.prototype.name = 'Jack';
//Don't do Constructor.prototype = { name: 'Jack' };




/* null and Object.prototype don't have prototypes */
Object.getPrototypeOf(Object.create(null)) === null
Object.getPrototypeOf(Object.prototype) === null

Object.prototype.__proto__ === null




/* If you forget to add the "new" keyword when
 * using constructors, "this" will refer to the global Object
 */
function Sloppy(name) {
  this.name = name || '';
}
var c = Sloppy('green');
c === undefined
global.name === 'green'




//This is valid code
function Expression(str) {
  if (...) {
    return new Addition(..);
  } else if (...) {
    return new Multiplication(...);
  } else {
    throw new ExpressionException(...);
  }
}
var expr = new Expression(someStr);




/* When creating an instance of a constructor, 
 * an environment is created as well, that holds
 * the constructor values
 */
function StringBuilder() {
  var buffer = [];/* saved in the environment and
                     can be accessed every time by
                     the methods (clojure) */
  this.add = function(str) {
    buffer.push(str);
  };
  this.toString = function() {
    return buffer.join('');
  }
}
var sb = new StringBuilder();
sb.add('Hello ');
sb.add('World!');
sb.toString() === 'Hello World!'




/* Inheritance between constructors */
function Super(a, b) {
  this.a = a;
  this.b = b;
}
function Sub(a, b, c, d) {
  Super.call(this, a, b); /* we don't use new because that would
                             create a fresh superinstance */
  this.c = c;
  this.d = d;
}

// setting the prototype
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

var subInstance = new Sub(1, 2, 3, 4);

Super.prototype.isPrototypeOf(subInstance) === true
Sub.prototype.isPrototypeOf(subInstance) === true

Sub.prototype.methodB = function(x, y) {
  //using one of super constructor's methods
  return this.c + " " + Super.prototype.methodB.call(this, x, y);
}




/* Converting object to string and number is done
 * respectively with: */
Object.prototype.toString(obj);//converts to string
Object.prototype.valueOf(obj);//converts to number
//there is no conversion to boolean, an object is always true




/* You can call other object's methods on a different 
 * object like so (this are the so called generic methods): */
var obj = { age: 2 };
Person.prototype.incAge.call(obj, 5);
obj.age === 7;

var arr = [2, 0];
[].push.apply(arr, [32, 43]);
arr === [2, 0, 32, 43]

[].map.call('abc', x => x.toUpperCase()) === [ 'A', 'B', 'C'];

var obj = {};
Array.prototype.push.call(obj, 'sup');
obj === { 0: 'sup', length: 1 };




/* There are some objects that feel like an array, but aren't.
 * arguments object, document.getElementsByTagName(), strings
 * are examples of such objects */
function args() { return arguments; };

var argsObject = args('a', 32);

argsObject instanceof Array === false
argsObject instanceof Object === true

'abc'[1] === 'b'
document.getElementsByTagName('h3').length === 3

Array.prototype.push.call('abc', 'sup')/* doesnt work, cuz string's
                                          prop length is non-writable */

Array.prototype.push.call(argsObject, 'sup')//works
function logArgs() {
  return Array.prototype.forEach.call(arguments, function(el, i) {
    console.log(i+'. '+el);
  });
}




/* Avoid using inherited props cuz they can be modified,
 * instead us the originator methods */
var obj = {name: 'Tarzan'};
obj.hasOwnProperty = 'sup';

obj.hasOwnProperty('name') === false;//don't use this
Object.prototype.hasOwnProperty.call(obj, 'name') === true
