// to throw an exception:
throw new Error('Something bad happened');


// try-catch-finally's syntax is like so
// (you can use catch, finally or both)
try {
  throw new Error('error');
} catch(e) {
  console.log(e);
} finally {
  console.log('After error');
}
/* Error: error
   After error */   


// show error stack
function catchIt() {
  try {
    throwIt();
  } catch(e) {
    console.log(e.stack);
  }
}
function throwIt() {
  throw new Error('');
}

catchIt();/* Error
                 at throwIt (code.js:2:7)
                 at catchIt (bla.js:32:5)
                 ... */
