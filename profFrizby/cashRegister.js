//memoize function to cache already input instances
var memoize = function(f) {
  var cache = {};

  return function() {
    var arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  };
};

const sufficientFunds = memoize((i, arr) => {
  return (i < arr.length) ? arr[i][1] + sufficientFunds(i+1, arr) : 0;
});

const toMultiple = memoize((arr) => {
  if(arr[arr.length-1] === 'Insufficient Funds')
    return 'Insufficient Funds';
  else
    return arr.reduce(function (rows, key, index) { 
      return (index % 2 === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows;
    }, []).slice(0, -1);
});

const answer = memoize((i, change, cid) => {
  const denominators = [0.01, 0.05, 0.10, 0.25, 1.00, 5.00, 10.00, 20.00, 100.00];
  if(i < 0 && change > 0)
    return 'Insufficient Funds';
    
  if(i >= 0 && change !== 0){
    if(cid[i][1] <= change)
      return cid[i].concat(answer(i - 1, (change-cid[i][1]).toFixed(2), cid ));  

    else{
      if(Math.floor(change/denominators[i]) >= 1)
        return [cid[i][0], (denominators[i] * Math.floor(change/denominators[i]))].concat(answer(i - 1, (change - denominators[i] * Math.floor(change/denominators[i])).toFixed(2), cid));
      
      else 
        return [].concat(answer(i-1, change, cid));
    }
  }
});

const checkCashRegister = memoize((price, cash, cid) => {
  const funds = sufficientFunds(0, cid);
  const change = cash - price;

  if(change === funds)
    return "Closed";

  if(funds <= change)
    return 'Insufficient Funds';

  else 
    return toMultiple(answer(8, change, cid));
});


console.log(checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
