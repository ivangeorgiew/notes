//Object factory
const createCat = function(opts = {}) {
  const privVals = {
    priv1: 'first priv',
    privNum: 4356,
    id: '12400af0'
  };

  return {
    sound: opts.sound || 'meow',
    name: opts.name || 'Richard',
    fur: opts.fur || 'scarse',

    speak: function() {
      return `${this.name} says ${this.sound} ` +
              `and has ${this.fur} fur!`;
    },

    outputPriv: function() {
      return privVals;
    }
  };
};

//extends createCat
const createHomeCat = function(opts = {}) {
  return Object.assign(createCat(opts), {
    domesticated: opts.domesticated || 'street cat',
   
    hasOwner: function() {
      return this.domesticated === 'house cat';
    }
  });
};

//creates instances of cat and homeCat
const cate = createCat({
  sound: 'MEOWZILLA',
  fur: 'thick'
});
const houseCate = createHomeCat({
  sound: 'HOUSEMEOW',
  domesticated: 'house cat',
  name: 'Tom'
});

//testing
console.log('cate.speak() ', cate.speak());
console.log('houseCate.name ', houseCate.name);
console.log('houseCate.sound ', houseCate.sound);
console.log('houseCate.speak() ', houseCate.speak());
console.log('is houseCate domesticated ? - ', houseCate.hasOwner());
console.log('houseCate has toString prop ', houseCate.hasOwnProperty("toString"));
