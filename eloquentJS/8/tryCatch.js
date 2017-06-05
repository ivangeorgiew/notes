const answerQuestion = function(result) {
  if(result.toLowerCase() === 'left') return 'L';
  if(result.toLowerCase() === 'right') return 'R';
  throw new Error(result);
};

const look = function(result) {
  if(answerQuestion(result) == 'L')
    return 'a house';
  else
    return 'two bears';
}

try {
  console.log('Which way?', look('wat?'));
  console.log('Which way?', look('left'));
} catch(err) {
  console.log('shannanigans: ' + err);
}
