/* Why use the class syntax?
 * 
 * code in classes runs automatically in strict mode,
 * all methods are non-enumarable,
 * all methods lack [[Construct]], so you can't call them with new,
 * it's not possible to overwrite the class name with a class method inside
 */
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

let person = new Person('Chris');
Object.getOwnPropertyNames(person) === [ 'name' ]

//equivalent in ES5
let Person = (function() {
  "use strict";

  const Person = function(name) {
    if(typeof new.target === 'undefined')
      throw new Error('You must use "new"');

    this.name = name;
  };

  Person.defineProperty(Person.prototype, 'sayName', {
    value: function() {
      if(typeof new.target !== 'undefined')
        throw new Error('Dont use "new" for methods');
    },
    enumerable: false,// getOwnPropertyNames doesn't show it
    writable: true,
    configurable: true
  });

  return Person;
});




/* Like functions, there are class expressions */
const Person = class {
  constructor(name) {
    this.name = name; 
  }
  
  sayName() {
    console.log(this.name);
  }
};
let person = new Person('John');

/* or */

let person = new class {
  constructor(name) {
    this.name = name; 
  }
  
  sayName() {
    console.log(this.name);
  }
}('John');;




/* Accessors in classes */
class HtmlElement {
  constructor(el) {
    this.el = el;
  }

  get html() {
    return this.el.innerHTML;
  }

  set html(val) {
    this.element.innerHTML = val;
  }
}

const descr = Object.getOwnPropertyDescriptor(HtmlElement.prototype, 'html');
'get' in descr === true
'set' in descr === true
descr.enumerable === false




/* Creating static methods(methods in ClassName, not ClassName.prototype) */
class Bla {
  constructor(el) {}

  //Bla.shout
  static shout() {
    return 'HEY!';
  }
}
let bubl = new Bla();

Bla.shout()// 'HEY!'
bubl.shout()// not a function





class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }
}

class Square extends Rectangle {
  /* no need for that cuz we don't assign new props 
  constructor(length) {
    // same as Rectangle.call(this, length, length)
    super(length, length);
  }
  */
}


let square = new Square(3, 3);

console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true




/* Classes can extend other functions and expressions as well */
class MyArray extends Array {}
class MyFunc extends (function() { return {} }) {}
