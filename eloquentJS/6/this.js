const Rabbit = function(type){
  this.type = type;
  this.speak = function(text){
    console.log(`The ${this.type} rabbit says ${text}`);
  };
};

var whiteRabbit = new Rabbit('white');
var brownRabbit = new Rabbit('brown');

whiteRabbit.speak('mamaaaaaah');
brownRabbit.speak('i just killed a maaaaan');

brownRabbit.speak.call(whiteRabbit, 'bruh!');

