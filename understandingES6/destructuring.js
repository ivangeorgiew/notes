/* Destructuring objects */
const obj = {
  a: 'value',
  b: 'sup'
};

const a = obj.a,
      b = obj.b;
//is equvalent to
const { a, b } = obj;

//when a specified prop doesn't exist in
//the object, the value will be undefined, but we
//can assign a default value for such cases
const { a, b, c = 'hello' } = obj;

//if you want to assign to different name
const { a: newName } = obj;
newName === obj.a




/* Destructuring arrays */
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;
const [, , third] = colors;

// we can also clone an array with the rest operator
const [...clone] = colors;




/* Swapping variables in ES6 */
let a = 1,
    b = 2;
[ a, b ] = [ b, a];
a === 2 && b === 1 // true




/* You can also pass a destructured object or array
 * as a parameter */

function foo({ a }) { return a };
foo(obj);// returns 43
