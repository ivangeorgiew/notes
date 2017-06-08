/* Here is how an iterator works */
function createIterator(items) {
  let i = 0;

  return {
    next: function() {
      const done = (i >= items.length);
      const value = !done ? items[i++] : undefined;

      return { value, done };
    }
  };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next());// { value: 1, done: false }
console.log(iterator.next());// { value: 2, done: false }
console.log(iterator.next());// { value: 3, done: false }

//from now on
console.log(iterator.next());// { value: undefined, done: true }




/* The above example used function createIterator for the
 * generation of iterator objects.
 * In ES6 you can use generators for the same purpose */
function* createIterator() {
  yield 1;//value is set to 1 and function stops executing
  yield 2;
  yield 3;
}

let iterator = createIterator();
console.log(iterator.next());// { value: 1, done: false }
console.log(iterator.next());// { value: 2, done: false }
console.log(iterator.next());// { value: 3, done: false }

//from now on
console.log(iterator.next());// { value: undefined, done: true }




/* yield can only be used inside the generator function */
function* abc() {
  let bla = 43;

  function hey() {
    yield 'sup';// error, cuz is nested!
  }

  yield bla;//no problems
}




/* There is no problem in using generator functions inside objects */
let obj = {
  createGenerator: function* (items) {
    for(let i = 0; i <= items.length; i++) {
      yield items[i];
    }
  },

  *es6Generator(items) {
   for(let i = 0; i <= items.length; i++) {
     yield items[i];
   } 
  }
}




/* All collections(object, array, set, map) and strings are iterables
 * so they have a default iterator object defined that is stored in the 
 * generator Symbol.iterator 
 * For example we will create a new default generator here */
let obj = { name: 'hey', age: 43 };

[...obj]/* TypeError: obj[Symbol.iterator] is not a function
           cuz objects don't have it setup as default like arrays */

//setting custom default generator
obj[Symbol.iterator] = function* (keys) {
  for(var i = 0; i < keys.length; i++) {
    yield this[keys[i]];
  }
}.bind(obj, Object.getOwnPropertyNames(obj));

[...obj]//-> [ 'hey', 43 ]

for(val of obj) {
  console.log(val);
}/* hey
    43 */




/* Arrays, sets and maps have built-in default iterator from Symbol.iterator
 * as well as methods .entries(), .values(), .keys() that return iterator  */
let arr = [false, 43, 'segw'];
let set = new Set([false, false, 'gwegwegh']);
let map = new Map([['name', 'bob'], [false, 43]]);

[...arr.entries()]// [ [0, false], [1, 43,] [2, 'segw'] ]

for(let val of set.keys()) { console.log(val) }
/* false
 * gwegwegh */

[...map.values()]// [ 'bob', 43 ]
[...map.entries()]// [ ['name', 'bob'], [false, 43] ]




/* You can use the spread operator to convert a collection 
 * to an array */
let set = new Set([{name: 'Misho'}, true, true]);
let map = new Map([[true, 42], [42, true]]);
let arr = ['hey', ...set, ...map];

console.log(arr)// [ 'hey', {name: 'Misho'}, true, [true, 42], [42, true] ]




/* Advanced use of generators(of iterators) */
function* createIterator() {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3; 
}
let iterator = createIterator();

iterator.next()// { value: 1, done: false } 
iterator.next(5)// { value: 7, done: false } 
iterator.next('hey')// { value: 'hey3', done: false } 
iterator.next()// { value: undefined, done: true } 


// Throwing errors in iterators 
iterator = createIterator();// resetting the generator

iterator.next()// { value: 1, done: false } 
iterator.next(4)// { values: 6, done: false }
iterator.throw(new Error('Boom')); /* throws error
                                      all the next yields will never be executed
                                      done is set to true */




/* Try, catch in generators */
function* createIterator() {
  let first;

  try {
    first = yield 2;
  } catch(e) {
    first = 6;
  }

  let second = yield first + 1;
  yield second + 3;
}
let it = createIterator();

it.next();// value 2
it.throw(new Error('haha'));// value 7
it.next(5);// value 8
it.next();// done




/* Using return in generator functions */
function* bla(hey) {
  yield {name: 'georgi'};
  return 'sup' + hey;
  yield 5;
}
let it = bla(' man');

it.next();// { value: {name: 'georgi'}, done: false }
it.next();// { value: 'sup man', done: true } (the return statements sets done to true)
it.next();// { value: undefined, done: true }




/* Nesting generator functions inside generator functions */
function* a() {
  yield 1;
  yield 'mum';
  return [42, 0];
}
function* b(prop) {
  yield true;
  yield prop;
}
function* combo() {
  let aResult = yield* a();
  yield* b(aResult);
  yield new Set([false, false]);
  return 'DONE';
}
let it = combo();

it.next()// {value: 1, done: false}
it.next()// {value: 'mum', done: false}
it.next()// {value: true, done: false}
it.next()// {value: [ 42, 0 ], done: false}
it.next()// {value: Set{ false }, done: false}
it.next()// {value: 'DONE', done: true}
