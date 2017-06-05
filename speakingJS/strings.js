// how to write over multiple lines
var str = 'written \
over \
multiple \
lines';
str === 'written over multiple lines'


// conversion is not reversible
String(false)
//-> 'false'
Boolean('false')
//-> true


// to convert from UTF-16 code you can use
String.fromCharCode(97, 98, 99) === 'abc'
//if you have an array
String.fromCharCode.apply(null, [97, 98, 99]) === 'abc'


// some useful methods
String.prototype.slice(bIndex, eIndex)//like the array slice

String.prototype.split(',')

String.prototype.charCodeAt(index)

String.prototype.search(regex)// returns index

String.prototype.match(regex)// returns a match object

String.prototype.replace(regex/string, replacement)
