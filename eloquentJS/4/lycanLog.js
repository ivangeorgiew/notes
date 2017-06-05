const journal = require('./journal.js');

const addEntry = (events, isSquirrel) => {
  journal.push({
    events: events,
    squirrel: isSquirrel
  });
};

const correlation = (arr) => {
  const a = arr[0], b = arr[1], c = arr[2], d = arr[3];
  return ((a*d - b*c) / Math.sqrt((a+b)*(c+d)*(a+c)*(b+d))).toFixed(3);
};

const hasEvent = (entry, event) => entry.events.indexOf(event) !== -1;

const tableFor = (journal, event) => {
  let table = [0, 0, 0, 0];

  for(let i = 0; i < journal.length; i++){
    let index = 0;
    if(hasEvent(journal[i], event))
      index++;
    if(journal[i].squirrel)
      index += 2;
    table[index]++;
  }

  return table;
};

const gatherCorrelations = (journal) => {
  let phis = {};

  journal.forEach((entry) => {
    entry.events.forEach((event) => {
      if(!(event in phis))
        phis[event] = correlation(tableFor(journal, event));
    });
  });

  return phis;
}

const createEventPhiTable = function() {
  const phis = gatherCorrelations(journal);
  let eventPhi = [];

  for(let event in phis){
    let phi = phis[event];
    if(!(event in eventPhi) && phi > 0.1 || phi < -0.1){
      eventPhi.push({
        event: event,
        phi: phi
      });
    }
  }

  eventPhi.sort((a, b) => b.phi - a.phi);
  return eventPhi;
};

const printInfo = function() {
  const eventPhi = createEventPhiTable();
  const fAndS = +eventPhi[0].phi + +Math.abs(eventPhi[eventPhi.length-1].phi);

  if(fAndS <= 1 && fAndS >= 0.9)
    console.log(`Say NO to ${eventPhi[0].event} and say YES to ${eventPhi[eventPhi.length - 1].event}!`);
  else
    console.log("Unfortunatly there are more than 2 events that effect your condition");
};

printInfo();
