var context = null;

const withContext = function(newContext, f) {
  const oldContext = context;
  context = newContext;
  try {
    return f();
  } finally {
    //we want to revert context to its old value
    //even if there is an error before that
    context = oldContext;
  }
};

try {
  withContext(5, function() {
    if(context < 10)
      throw new Error('Not enough context');
  });
} catch(e) {
  console.log('Error: ' + e.message);
}

console.log('context: ', context);
