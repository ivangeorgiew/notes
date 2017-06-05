const MultiplicatorUnitFailure = function() {};

const primitiveMultiply = function(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
};

const reliableMultiply = function(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch(e) {
    return reliableMultiply(a, b);
  }
};

console.log(reliableMultiply(8, 8));
