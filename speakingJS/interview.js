// Map - loop through array elements and change every one
//
// Filter - remove elements from array
//
// Reduce - loop through array elements and give new value
// (can be of whatever type and size)
//
const people = [
  { name: 'Stoqn', age: 43, cool: true },
  { name: 'Lubo', age: 47, cool: false },
  { name: 'Les', age: 53, cool: true }
];


function areYoung(people) {
  return Array.prototype
    .filter.call(arguments[0], p => p.age < 50)
    .map(p => p.name);
  /*
  return people.reduce((soFar, p) => (p.age < 50) ?
    soFar.concat(p.name) :
    soFar
  ,[]);
  */
}
console.log(areYoung(people));


function pic(people, ...args) {
  return people.map(person => (
    args.reduce((soFar, prop) => (
      Object.assign({}, soFar, {[prop]: person[prop]})
    ), {})
  ));
}
console.log(pic(people, 'age', 'name'));
