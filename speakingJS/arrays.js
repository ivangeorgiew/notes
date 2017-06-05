/* Arrays are maps, not tuples.
 * They can have holes */
var arr = [];
arr[0] = 23;
arr[2] = 1;
arr === [ 23, , 1 ]
arr[1] === undefined




/* Use array literals to create array,
 * not the Array constructor, cuz if it has only
 * one argument and it is a number, the constructor
 * takes it for length */
new Array(2) === [ , ,]
new Array(5.7) === error




/* The max index for arrays is 2^32 - 1.
 * Any element beyond that is thought of as an 
 * object prop and doesn't affect .length */
arr[Math.pow(2, 32)] = 'a';
arr.length === 0
arr[Math.pow(2, 32)] === 'a'




/* Using delete operator on array elements doesn't
 * change length. Use splice or slice instead */





/* legth just counts the highest index in the array
 * if you want to count the elements you have to do
 * it yourself */
/* 
Array.prototype.reduce.call([1, , 53, 21, ,],
  (soFar, i) => i ? soFar+1 : soFar, 0);
*/
var arr = [1, ,53, 21, ,];
arr.reduce((soFar, el) => el ? soFar+1 : soFar, 0);




/* Setting length to lower than it currently is,
 * deletes last elements */
var arr = [1, 2, 3, 4];
arr.length === 4
arr.length = 2;
arr === [1, 2]




/* To remove holes in arrays just use filter */
[1, , 32].filter(() => true);

/* You can create an array with 9 undefined like so */
Array.apply(null, Array(9));




/* To check if a val is an array use Array.isArray(val)
 * cuz instanceof doesn't work accross windows and frames
 */
Array.isArray(val);




/* Non-destructive methods for arrays */
var arr = ['a', 'b'];
arr.concat('c', ['d', 'e']) === ['a', 'b', 'c', 'd', 'e']
arr === ['a', 'b']

Array.prototype.concat(arr/el?, arr/el?....);
Array.prototype.slice(beg?, end?);
Array.prototype.join(seperator?);/* join converts undefined and
                                    null to empty string
                                    [undefined, null].join('')
                                    === '' 
                                  */
Array.prototype.indexOf(searchVal, startIndex?)/* first index,
                                                  if no such element
                                                  returns -1 */
Array.prototype.lastIndexOf(searchVal, startIndex?)/* last index */





/* Examination methods (non-destructive)*/
//iterates
Array.prototype.forEach(cb(el?, i?, arr?){}, thisForCb);

//if every element passes, returns true
//otherwise false
Array.prototype.every(cb(el?, i?, arr?){}, thisForCb);

//if even one of the elements passes, returns true
//otherwise false
Array.prototype.some(cb(el?, i?, arr?){}, thisForCb);

/* if you want to stop the iteration of forEach, you have to use
 * some instead */
var arr = ['abw', ''];

arr.some(function(el) {
  if(el.length === 0){
    console.log('not passed index', this.indexOf(el));
    return true;
  }
  console.log('passes', el);
}, arr);




/* Transformation methods */
//changes every element
Array.prototype.map(cb(el, index, arr), cbThis);

//removes elements which return false
Array.prototype.filter(cb(el, index, arr), cbThis);

//returns new value(can be bigger or smaller and can be any type),
//using all of the array's elements
//if no init is give soFar = arr[0], el = arr[1] ....
Array.prototype.reduce(cb(soFar, el, index, arr), initVal);




/* Don't use for-in loop for arrays, cuz it iterates
 * over indexes, not over values and it includes own and
 * inherited props */
