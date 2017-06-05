const loopATriangle = function(i, num) { 
  const line = function(num) {
    return (num > 1) ? line(num - 1) + '#' : '#';
  };

  return (i !== num) ? line(i) + "\n" + loopATriangle(i+1, num) : line(i);
};

console.log(loopATriangle(1, 7));
