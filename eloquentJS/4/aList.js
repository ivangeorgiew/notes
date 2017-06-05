const arrayToList = (arr) => {
  if(arr.length >= 1)
    return {value: arr[0], rest: arrayToList(arr.slice(1))}
  else return null;
};
console.log(arrayToList([10, 30, 20]));

const listToArray = (obj) => {
  if(obj.rest !== null)
    return [].concat(obj.value, listToArray(obj.rest));
  else return obj.value;
};
console.log(listToArray(arrayToList([10, 30, 20])));

const prepend = (el, obj) => {
  return {value: el, rest: obj}; 
};
console.log(prepend(10, prepend(20, null)));

const nth = (obj, i) => {
  if(i !== 0 && obj.rest === null)
    return undefined;
  else if(i > 0)
    return nth(obj.rest, i-1);
  else return obj.value;
};
console.log(nth(arrayToList([10, 20, 30]), 1));
