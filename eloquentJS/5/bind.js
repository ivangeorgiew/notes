const ancestry = JSON.parse(require("./ancestry.js"));

const theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];

const isInSet = function(set, person){
  return set.indexOf(person.name) > -1;
};

console.log(ancestry.filter(function(person){
  return isInSet(theSet, person);
}));

console.log("\nWith bind: \n", ancestry.filter(isInSet.bind(isInSet, theSet)));
