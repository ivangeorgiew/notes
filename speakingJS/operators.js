// ToPrimitive is an internal function that you can't call.
// How it is defined is usefull however
function ToPrimitive(input, PrefferedType) {
  if(input is primitive)
    return input;

  if(PrefferedType === 'number') {
    //so it's an object
    if(input.valueOf() is primitive)
      return input.valueOf();
    //so it can't be converted to number
    if(input.toString() is primitive)
      return input.toString();
  }

  if(PrefferedType === 'string') {
    //so it's an object
    if(input.toString() is primitive)
      return input.toString();
    //so it can't be converted to string
    if(input.valueOf() is primitive)
      return input.valueOf();
  }

  //can't convert
  throw new Error();
}




// in most cases when operators are applied
// values are first tried to be converted to string
// and if unable to are converted to numbers




// typeof operator converts the value to primitive type
typeof []//-> 'object'
typeof 123//-> 'number'
typeof undefined//-> 'undefined'

//ATTENTION
typeof null//-> 'object' !!!

// Checks if x is undefined and if it even exists 
typeof x === undefined
var x;
typeof x === undefined




// instanceof checks if an object is an instance of a Constructor
[] instanceof Array // constructor of []
//-> true
[] instanceof Object // super-constructor of []
//-> true
