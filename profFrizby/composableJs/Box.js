const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

//const moneyToFloat = str =>
//  parseFloat(str.replace(/\$/g, ''))

const moneyToFloat = str =>
  Box(str)
  .map(str => str.replace(/\$/g, ''))
  .map(r => parseFloat(r))

//const percentToFloat = str => {
//  const replace = str.replace(/\%/g, '')
//  const number = parseFloat(replace);
//  return number * 0.01
//}
    
const percentToFloat = str =>
  Box(str.replace(/\%/g, ''))
  .map(n => parseFloat(n))
  .map(n => n * 0.01)

//const applyDiscout = (price, discount) => {
//  const cost = moneyToFloat(price)
//  const savings = percentToFloat(discount)
//  return cost - cost * savings
//}

const applyDiscout = (price, discount) => 
  moneyToFloat(price)
  .fold(n => 
    percentToFloat(discount)
    .fold(s => n - n * s)
  )
  



console.log(applyDiscout('$5.00', '20%'))
  
