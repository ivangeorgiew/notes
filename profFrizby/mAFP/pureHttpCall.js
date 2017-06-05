//A function to cache the results of pure functions
var memoize = function(f) {
  var cache = {};
  return function(){
    var arg = JSON.stringify(arguments);
    cache[arg] = cache[arg] || f.apply(f, arguments);
    return cache[arg];
  };
};


//A function that returns a function that returns a http call
var pureHttpCall = memoize(function(url, params) {
  return function() {
    return $.getJSON(url, params);
  };
});
