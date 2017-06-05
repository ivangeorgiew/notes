/* There are some added shorthands */
function createPerson(name) {
  return {
    name, /* instead of name: name */
    getName() { /* instead of getName: function() { */
      console.log(this.name)
    },
    [12*45]: 'this is 12*45' /* instead of 540: 'this is 12*45' */
  };
}




/* New method Object.is() which substitutes the use of === */
+0 === -0 // true
Object.is(+0, -0)// false

NaN === NaN // false
Object.is(NaN, NaN)// true

//otherwise works just like ====
Object.is(5, "5")// false
Object.is(5, 5)// true




/* Object.assign({}, {name: 'sup})
 * Object.setPrototypeOf(obj, proto) */




/* Use of 'super' inside methods (it can be only used
 * in method notation */
const human = {
  greet() {
    return 'Hello' + this.name;
  }
};

const friend = {
  name: 'Stephen',
  greet() {
    /* return Object.getPrototypeOf(this).greet.call(this) + ', hi'; */
    return super.greet() + ', hi';// new way
  }
};
Object.setPrototypeOf(friend, human);
