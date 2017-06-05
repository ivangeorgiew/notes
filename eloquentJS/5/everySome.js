const every = function(arr, test){
  let isTrue = true;
  arr.forEach(function(el){  
    if(!test(el)){
      isTrue = false; 
    }
  });
  return isTrue;
};

const some = function(arr, test){
  let isTrue = false;
  arr.forEach(function(el){  
    if(test(el)){
      isTrue = true; 
    }
  });
  return isTrue;
};

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));
console.log(some([NaN, NaN, 4], isNaN));
console.log(some([2, 3, 4], isNaN));

