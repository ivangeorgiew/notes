//this is a higher-order function
const hof = function(f){
  return function(){
    return f.apply(f, arguments);
  };
};

const moreThanFour = function(){
  const args = Array.from(arguments);
  args.forEach(function(el){ console.log(el > 4)});
  console.log('\n');
};

hof(moreThanFour)(5, 34, 3);


//NEVER EVER USE () => {} AGAIN! THE THIS GETS FUCKED UP
//THE ABOVE EXAMPLE DOESNT WORK IF YOU USE IT

const unless = function(test, then){
  if(test) then();
};

const repeat = function(times, f){
  for(let i = 0; i < times; i++) f(i);
};

repeat(5, function(i){
  unless(i % 2 === 0 && i > 0, function(){
    console.log(i + ' is even')
  })
});
