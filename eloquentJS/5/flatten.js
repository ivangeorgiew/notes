const arr = [[[1],[2,3]],[4,5],[6]];

const flatten = function(arr){
  return arr.reduce(function(pre, next){
    if(Array.isArray(next))
      return pre.concat(flatten(next));
    else
      return pre.concat(next);
  }, []);
};

console.log(flatten(arr));

Array.prototype.flatten = function(){
  return this.reduce(function(pre, next){
    if(Array.isArray(next))
      return pre.concat(next.flatten());
    else
      return pre.concat(next);
  }, []);
};

console.log(arr.flatten());
