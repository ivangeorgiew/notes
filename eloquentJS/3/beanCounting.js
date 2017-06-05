const countBs = function(str) {
  //case first char = B
  if(str.charAt(0) === 'B')
    return 1 + countBs(str.slice(1)); 

  //case first char != B
  if(str.length > 0)
    return 0 + countBs(str.slice(1));

  //case str has no more chars
  return 0;
};

console.log(countBs('BBCBasfB'));

const countChar = function(str, letter) {
  //case first char = letter
  if(str.charAt(0) === letter)
    return 1 + countChar(str.slice(1), letter); 

  //case first char != letter
  if(str.length > 0)
    return 0 + countChar(str.slice(1), letter);

  //case str has no more chars
  return 0;
};

console.log(countChar('kakkerlak', 'a'));
