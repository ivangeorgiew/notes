const reverseArr = (arr) => {
  return (arr[1] !== undefined) ? [].concat(arr[arr.length-1], reverseArr(arr.slice(0, -1))) : arr[0];
};

console.log(reverseArr([1, 2, 3, 4, 5]));
