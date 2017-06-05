const memoize = function(f) {
  //the object must be out of the returning function
  //for the caching to work
  const cache = {};

  return function() {
    const arg = JSON.stringify(arguments);
    console.log(cache);
    cache[arg] = cache[arg] || f.apply(f, arguments);
    return cache[arg];
  };
};

//this won't cache
const bla = function(a){ return a*a; };

console.log(memoize(bla)(43));
console.log(memoize(bla)(43));
console.log(memoize(bla)(43) + '\n');

//but this will because we put
//memoize in the constant and not the expression
const abc = memoize(function(a){ return a*a; });

console.log(abc(43));
console.log(abc(43));
console.log(abc(43));

