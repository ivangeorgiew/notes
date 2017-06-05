const ancestry = JSON.parse(require("./ancestry.js"));

const avg = function(arr){
  return (arr.reduce(function(a, b){return a+b;}) / arr.length).toFixed(1);
};

const byName = {};
ancestry.forEach(function(person){
  byName[person.name] = person;
});

const differences = ancestry.filter(function(person){
  return byName[person.mother] != null;
}).map(function(person){
  return person.born - byName[person.mother].born;
});

console.log(differences);
console.log(avg(differences));

