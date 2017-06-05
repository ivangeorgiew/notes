/* In JS when you create var, regardless of the lexical
 * scope, it is bound at the global object.
 * In order to create block-level variables we can use let
 */
function bla() {
  if(5 === 234)
    var sup = '';
  else
    return sup;/* returns undefined
                  cuz sup is created with hoisting */
}

function bla() {
  if(5 === 234){
    let vsup = '';
    return vsup
  }
  else
    return vsup;/* vsup is not defined */
}




/* var in loops creates problems sometimes,
 * which can be fixed with let */
var funcs = [];

for(var i = 0; i < 10; i++) {
  funcs.push(function() { console.log(i); });/* but i is hoisted to the
                                                global object and = 10 */
}
/* solution with IIFE */
for(var i = 0; i < 10; i++) {
  funcs.push((function(i) {console.log(i);})(i));
}
/* solution with let */
for(/*here*/let i = 0; i < 10, i++) {
  funcs.push(function() { console.log(i); });
}
