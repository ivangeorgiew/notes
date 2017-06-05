const range = (start, end, step) => {
  if(step > 0)
    return (start+step <= end) ? [].concat(start, range(start+step, end, step)) : start;
  else
    return (start+step >= end) ? [].concat(start, range(start+step, end, step)) : start;
}

const sum = (arr) => (arr[0] != undefined) ? arr[0] + sum(arr.slice(1)) : 0;

console.log(sum(range(5, 2, -1)));

