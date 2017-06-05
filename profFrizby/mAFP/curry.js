var curry = require('lodash/curry');

var match = curry(function(what, str) {
  return str.match(what);
});

var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function(f, ary) {
  return ary.filter(f);
});

var map = curry(function(f, ary) {
  return ary.map(f);
});

match(/\s+/g, 'hello world');
// [ ' ' ]

match(/\s+/g)('hello world');
// [ ' ' ]

var hasSpaces = match(/\s+/g);
// function(x) { return x.match(/\s+/g) }

hasSpaces('hello world');
// [ ' ' ]

hasSpaces('spaceless');
// null

filter(hasSpaces, ['tori_spelling', 'tori amos']);
// ['tori amos']

var findSpaces = filter(hasSpaces);
// function(xs) { return xs.filter(function(x) { return x.match(/\s+/g) }) }

findSpaces(['tori_spelling', 'tori amos']);
// ['tori amos']

var noVowels = replace(/[aeiouy]/ig);
// function(replacement, x) { return x.replace(/[aeiouy]/ig, replacement) }

var censored = noVowels('*');
// function(x) { return x.replace(/[aeiouy]/ig, '*') }

censored('Chocolate Rain');
// 'Ch*c*l*t* R**n'
