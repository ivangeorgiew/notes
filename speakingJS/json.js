/* Json stringify */
JSON.stringify(val, replacer?, space?);

function replacer(key, val) {
  return typeof val === 'number' ? val*2 : val;
}
JSON.stringify({ a: 15, b: [ 2, 18] }, replacer); 

/* the replacer can also be an array of all the props
 * you want to conserve */
JSON.stringify({foo: 1, bar: {foo: 1, bar: 2}}, ['bar']) 
=== '{"bar": {"bar": 2}'

JSON.stringify({a: 'abc'}, null, 2) === 
{
  "a": "abc"
}




/* If JSON.stringify() encounters an object with toJSON
 * method, it uses that method */
JSON.stringify({ toJSON: function() { return 'Cool'; }}) ===
'"Cool"'

// Date.prototype already has toJSON method
JSON.stringify(new Date()) === '"2017-05....."'




/* To parse JSON there is JSON.parse method */
JSON.parse(val, reviver?);

function reviver(key, val) {
  if(typeof val === 'string') {
    const x = Date.parse(val);
    return !isNaN(x) ? new Date(x) : val;
  }
  return val;
}
var str = '{ "name": "John", "birth": "2011-07-28T22:00:00.000Z" }';
JSON.parse(str, reviver) ===
{ name: 'John', birth: Thu, 28 Jul 2011 22:00:00 GMT }
