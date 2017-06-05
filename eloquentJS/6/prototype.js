console.log(Object.getPrototypeOf('Mama') == String.prototype);

//this object will act similarty to a constructor;
const rabbit = {
  teeth: 'big',
  speak: function(){
    console.log(`The ${this.type} rabbit has ${this.teeth} teeth`);
  }
};

//sets the killerRabbit.prototype = rabbit;
//but if you try to set it yourself it wont work
//that is why Object.create() is used
const killerRabbit = Object.create(rabbit);
killerRabbit.type = 'killer';

console.log('prototype rabbit',  rabbit)
console.log('killer rabbit', killerRabbit, '\n');

killerRabbit.speak();
