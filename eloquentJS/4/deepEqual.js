const deepEqual = (a, b) => {
  if(a === null && b === null)
    return false;
  
  if(typeof a === 'object' && typeof b === 'object'){
    for(let prop in a){
      if(prop in b){
        if(typeof a[prop] === 'object' && typeof b[prop] === 'object')
          return deepEqual(a[prop], b[prop]);

        else if(a[prop] !== b[prop]) return false;
      }
      else return false;
    }
    return true;
  }

  return a === b;
};


const obj = Object.freeze({here: {is: 'an'}, object: 2});
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: {is: 'an'}, object: 2}));
console.log(deepEqual(obj, {here: {is: null}, object: 2}));
