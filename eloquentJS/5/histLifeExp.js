const ancestry = JSON.parse(require('./ancestry.js'));

ancestry.forEach(function(p){
  p.century = Math.ceil(p.died / 100); 
});

const avg = function(arr){
  return (arr.reduce(function(a,b){return a+b;})/arr.length).toFixed(1);
};

const ageInCent = {};
ancestry.forEach(function(p){
  if(p.century in ageInCent)
    ageInCent[p.century] = ageInCent[p.century].concat(p.died - p.born);
  else
    ageInCent[p.century] = [].concat(p.died - p.born);
});

for(var prop in ageInCent)
  console.log(prop + ': ' + avg(ageInCent[prop]));
