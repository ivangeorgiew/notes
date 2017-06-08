/* Proxies are used in place of another object(called the target) by 
 * calling new Proxy()
 * Proxies allow you to intercept Javascript internal operations using
 * traps, which are functions that respond to a specific operation. */

/* Reflect is an object that is a collection of methods that provide 
 * the default behaviour for the same internal operations proxies can
 * override. There is a Reflect method for every Proxy trap(they have the
 * same names and are passed the same arguments) */

/* Example relations:
 * Proxy trap:  Overrides the behaviour of: 
| Proxy trap | Reflect method | Internal operation |
|------------|----------------|--------------------|
| get        | Reflect.get()  | Read prop value    |
|------------|----------------|--------------------|
| has        | Reflect.has()  | 'in' operator      |
|------------|----------------|--------------------|
*/

/* Proxies' props just point to the target object
 * so they are both always updated */
let target = {};
let proxy = new Proxy(target, {});

proxy.name = "proxy";
console.log(proxy.name);// "proxy"
console.log(target.name);// "proxy"

target.name = "target";
console.log(proxy.name);// "target"
console.log(target.name);// "target"




/* Using proxies without traps has no sense,
 * so lets now pass traps as well */
let target = {};
let handler = { 
  set(target, key, value, receiver) {
    //ignore existing props and if new prop val is not
    //a number throw an error
    if(!target.hasOwnProperty(key) && isNaN(value))
      throw new TypeError('Property must be a number');

    //else add the property
    return Reflect.set(target, key, value, receiver);
  },

  get(target, key, receiver) {
    //throw error when there is no such prop
    //instead of the default undefined
    if(target[key] === undefined)
      throw new Error('No such property')

    //else
    return Reflect.get(target, key, receiver);
  }
};

let proxy = new Proxy(target, handler);

proxy.bla = 'sup'// TypeError: Property must be a number 
proxy.bla // Error: No such prop 




/* This is the gist of using Proxy and Reflect
 * for all the methods you can go to MDN Reflect and look there.
 * There is no point in going through all of them here */
