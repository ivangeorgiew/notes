const fizzBuzz = function(num) {
  if(num % 15 === 0)
    return ('FizzBuzz\n' + fizzBuzz(num - 1));

  if(num % 5 === 0)
    return ('Buzz\n' + fizzBuzz(num - 1));

  if(num % 3 === 0)
    return ('Fizz\n' + fizzBuzz(num - 1));

  if(num !== 1)
    return (num + '\n' + fizzBuzz(num - 1));

  return num; 
};

console.log(fizzBuzz(100));
