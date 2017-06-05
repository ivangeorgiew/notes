const isEven = (num) => {
  if(num === 0)
    return true;

  if(num === 1)
    return false;

  //if negative make it a positive
  if(num < 0)
    return isEven(num + 2);

  //eventualy turns num to 0 or 1
  return isEven(num - 2);
};

console.log(isEven(-6));
