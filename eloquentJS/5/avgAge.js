const ancestry = JSON.parse(require('./ancestry.js'));

const average = function(arr){
  const plus = function(a, b){ return a + b; };
  return (arr.reduce(plus) / arr.length).toFixed(2);
};

const age = function(p){ return p.died - p.born; };
const male = function(p){ return p.sex === 'm'; };
const female = function(p){ return p.sex === 'f'; };

console.log("avg male age: " + average(ancestry.filter(male).map(age)));
console.log("avg female age: " + average(ancestry.filter(female).map(age)));
