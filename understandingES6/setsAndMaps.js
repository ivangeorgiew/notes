/* Set is like an array, but doesn't create duplicates,
 * has no indices(0, 1, 2, ...) 
 *
 * Map is like an object, but the keys have no 
 * restriction to being strings. Also a map has size */




/* Sets */
let set = new Set();

set.add(5);
set.add("5");
set.add(true);
set.add(true);
set.add({name: 'hello'});

set ==== Set { 5, "5", true, {name: 'hello'} }

set.size === 4

set.has("5") === true

set.delete("5")
set.has("5") === false

set.clear()
set.size === 0;

// Array.prototype.forEach method has an equivalent
set.forEach((val, key) => console.log(val, key))/* -> 5 5
                                                      true true 
                                                      ....*/
// converting sets to arrays
const arr = [...set];




/* Maps */
//var map = new Map([['name', 'bob'], [false, 43]]);
let map = new Map();
let obj = {};
let obj1 = {};

map.set('title', 'Howdy');
map.set('year', '2016');
map.set(true, 54);
map.set(obj1, false);

console.log(map.get('title'));// 'Howdy' 
console.log(map.get('year'));// '2016' 
console.log(map.get(true));// 54
console.log(map.get(obj));// undefined (there is a difference between obj and obj1)

/* .has .delete .clear .size */

map.forEach((val, key) => console.log(val, key))/* -> 'Howdy' 'title'
                                                      '2016' 'year' 
                                                      ....*/
