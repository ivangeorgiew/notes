/* Symbols are a new primitive type in JS 
 * their main purpose is creating private props for objects.
 * They don't have literals, so must be created with Symbol() */
const fName = Symbol();
const person = {};

person[fName] = 'Nick';
person[fName] === 'Nick'

// new Symbol doesn't work cuz Symbol isn't a constructor




/* You can but description, 
 * but note that this is not the name of 
 * the symbol itself */
const bla = Symbol('desc'); 

Object.getOwnPropertySymbols(this) === []

this[bla] = 'hey';

Object.getOwnPropertySymbols(this) === [ Symbol(desc) ]




/* An example use */
const fName = Symbol('first name')
const lName = Symbol('last name')
const person = { [fName]: 'Nick' }

Object.defineProperties(person, fName, { writable: false })

Object.defineProperties(person, {
  [lName]: { value: 'Karadjov', writable: false }
})

person[fName] === 'Nick'  
person[lName] === 'Karadjov'

Object.getOwnPropertySymbols(person) === [ Symbol(first name), Symbol(last name) ]

Object.getOwnPropertyNames(person) === [] // THIS IS THE POINT




/* If you want to create shared symbols use Symbol.for('stringId') */
const a = Symbol('a');
const a1 = Symbol('a');
const b = Symbol.for('b');
const b1 = Symbol.for('b');

a !== a1
b === b1

Symbol.keyFor(a1) === undefined
Symbol.keyFor(b1) === 'b'
