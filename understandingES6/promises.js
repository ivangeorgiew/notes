/* addEventListener('event', executedFunc, captureOrBubbleBool)
 *
 * Use addEventListener instead of onclick, onblur...., because:
 * you can add multiple handlers for the same event,
 * can be captured(stopped from activating other event listeners down the line),
 * it works on any DOM element (not only HTML elements) */




/* Ways to use async programming in js:
 * event listeners
 * callbacks,
 * Promises */

/* Promises specify some code to be executed later and react
 * differently whether the code was success or error. 
 * They can also be chained together. */




/* JavaScript engines have single-threded event loop (only one piece of code
 * is executed at a time), so they need to keep track of code that is meant to run(
 * it is saved in the job queue).
 * When the event loop has executed the current code, it executes the next one from
 * the job queue. The process goes from first to last. */




/* Events work ok for simple interactions, but chaining multiple, gets complicated.
 * You also have to make sure all the event handlers are added, before the first event
 * occurs(button can be clicked before onclick is assigned for example) */
let button = document.querySelector('button');
button.addEventListener('click', function(event) { console.log(event) }, false);




/* Callbacks is able to chain multiple async events one after the other 
 * both functions add events to the job queue, that are to be executed once the current
 * event is executed */
readFile('bla.txt', function(err, content) {
  if(err)
    throw err;

  writeFile('alb.txt', function(err, content) {
    if(err)
      throw err;

    console.log('file was written');
  });
});




/* Promises are in pending state when you assign them. You can tell
 * what you want from them on successful completion and on failure with
 * .then() and .catch() */
let promise = readFile('hey.txt');

promise.then(function(content) {
  console.log('Success', content);
}, function(error) {
  console.log('Error', error);
});

/* equivalent of 
 * promise.then(null, function(err) { console.log('Error', err) }); */
promise.catch(function(err) {
  console.log('Error', err);
});




/* Using the Promise constructor */
let fs = require('fs');

function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, { encoding: 'utf8'}, function(err, content) {
      if(err)
        return reject(err);

      return resolve(content);
    });
  });
}

let promise = readFile('array.js');

// We can chain then and catch np
promise.then(function(cont) {
  console.log(cont)
}).catch(function(err){
  console.log(err)
});




/* Promises execute the function they are called with 
 * immediately and then if the promise is resolved,
 * it is added for later in the job queue */
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
})
promise.then(function(cont) { console.log('resolved') });
console.log('HI');
/* output:
 * Promise
 * HI
 * resolved */




/* Promise methods */
let promise = Promise.resolve(43);
promise.then(function(cont) { console.log(cont) });// 43

let promise = Promise.reject('Error');
promise.catch(function(err) { console.log(err) });// Error




/* Chaining promises 
 * every .then and .catch returns a promise */ 
let p1 = Promise.resolve(43);

p1.then(cont => {
  console.log('first', cont);
  return cont + 5;
}).then(cont => {
  console.log('sec', cont);
})
/* fist 43
 * sec 48 */


let p1 = new Promise(function(resolve, reject) {
  throw new Error("Explosion!");
});

p1.catch(function(error) {
  console.log(error.message);// "Explosion!"
  throw new Error("Boom!");
}).catch(function(error) {
  console.log(error.message);// "Boom!"
});




/* You can respond to multiple promises with
 * Promise.all() - it waits for all of them to finish */
let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
  resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
  resolve(44);
});
let pAll = Promise.all([p1, p2, p3]);

pAll.then(function(cont) {
  console.log(cont);// [42, 43, 44]
});

/* Promise.race() - returns the first promise that loads */
let pRace = Promise.race([p1, p2, p3]);

pRace.then(function(cont) {
  console.log(cont);// 42
});




/* Combining Promises with generator functions
 * in a practical way */
let fs = require('fs');

function run(genFunc) {
  let iter = genFunc();
  let result = iter.next();

  (function step() {
    if(!result.done) {
      let promise = Promise.resolve(result.value);/* use Promise.resolve instead
                                                     of result.value, just in case 
                                                     it's not a promise and has to
                                                     be converted to one */

      promise.then(cont => {
        result = iter.next(cont);
        step();
      }).catch(err => {
        result = iter.throw(err);
        step();
      });
    }
    else
      console.log('DONE');
  })()
}

function readFile(name) {
  return new Promise(function(resolve, reject) {
    fs.readFile(name, {encoding: 'utf8'}, function(err, cont) {
      if(err)
        reject(err);
      else
        resolve(cont);
    });
  });
}

run(function* () {
  let contents = yield readFile('array.js');
  console.log('\n \n IN GENERATOR FUNCTION \n \n');
  console.log(contents);
});
