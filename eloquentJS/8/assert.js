const assert = function(test, message) {
  if(!test)
    throw new Error(message);
};

const lastElement = function(arr) {
  assert(arr.length > 0, 'empty array');
  return arr[arr.length - 1];
}

try {
  console.log(lastElement([1, 23]));
  console.log(lastElement([]));
} catch(e) {
  console.log(e.message);
}
