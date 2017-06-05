const makeField = function(vert, hor) {
  const makeLine = function(size, a, b) {
    if(size === 1)
      return a;
    if(size % 2 === 1)
      return (a + makeLine(size - 1, a, b));
    return (b + makeLine(size - 1, a, b));
  };

  //If its the last line stop the recurrsion
  if(vert === 1)
    return makeLine(hor,'#', 'A');

  //Makes an odd line
  if(vert % 2 === 1)
    return (makeLine(hor, '#', 'A') + '\n' + makeField(vert - 1, hor));

  //Makes an even line
  return (makeLine(hor, 'A', '#') + '\n' + makeField(vert - 1, hor)); 
};

console.log(makeField(4,8));
