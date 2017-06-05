const R = require('ramda');

const compose = (f, g) => {
  return (x) => {
    return f(g(x));
  };
};

const toUpper = (x) => {
  return x.toUpperCase();
};

const exclaim = (x) => {
  return x + '!';
};

const shout = compose(exclaim, toUpper);

shout('flappy bird');
//-> FLAPPY BIRD!

const head = (x) => {
  return x[0];
};

const reverse = R.reduce((acc, x) => {
  return [x].concat(acc);
}, []);



//the Associativity property applies to Composition
compose(f, compose(g, h)) === compose(compose(f, g), h);

var lo
