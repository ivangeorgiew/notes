const DrawTable = {
  maxLength: function(model, prop) {
    return function _(max = prop.toString().length,  i = 0) {
      if(i < model.length) {
        const str = model[i][prop].toString();
        return (str.length > max) ?
          _(str.length, i+1) :
          _(max, i+1);
      }
      else return max;
    };
  },

  lengths: function(model) {
    let propsLength = {};
    for(const prop in model[0])
      propsLength[prop] = this.maxLength(model, prop)(); 
    return propsLength;
  },

  view: function(model) {
    const propsLength = this.lengths(model);

    let fLine = '';
    let sLine = '';
    let line = '';
    let rest = '';
    
    //first line
    for(const prop in model[0])
      fLine += prop.toString() + ' '.repeat(propsLength[prop]-prop.length) + ' | ';

    //second line
    for(const prop in model[0])
      sLine += '-'.repeat(propsLength[prop]) + ' | ';

    //rest
    for(let i=0; i < model.length; i++){
      for(const prop in model[i]){
        if(typeof(model[i][prop]) === 'number')
          line += ' '.repeat(propsLength[prop]-model[i][prop].toString().length) +
                  model[i][prop].toString() +
                  ' | ';
        else
          line += model[i][prop] + 
            ' '.repeat(propsLength[prop]-model[i][prop].toString().length) +
            ' | ';
      }
      rest += line.slice(0, -3) + '\n';
      line = '';
    }

    return `${fLine.slice(0, -3)}\n${sLine.slice(0, -3)}\n${rest}`;
  }
};

module.exports = DrawTable;
