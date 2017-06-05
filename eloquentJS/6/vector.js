const Vector = function(x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.plus = function(vect) {
  return new Vector(this.x+vect.x, this.y+vect.y); 
};

Vector.prototype.minus = function(vect) {
  return new Vector(this.x-vect.x, this.y-vect.y); 
};

Object.defineProperty(Vector.prototype, 'length', {
  get: function() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
});

console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log(new Vector(3, 4).length);

