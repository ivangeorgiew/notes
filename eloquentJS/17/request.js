const url = 'http://rest.learncode.academy/api/gag/friends';

const friends = {
  Anko: {
    age: 12,
    city: 'Sofia'
  },
  Patio: {
    age: 43,
    city: 'Varna'
  }
};

const ajaxGet = function(url, cb) {
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function() {
    if(req.status === 200)
      cb(req.responseText);
    else
      cb(null, new Error('Request failed: ' + req.statusText));
  };
  req.onerror = function(){
    cb(null, new Error('Network Error'));
  };
  
  req.send(null);
};

const ajaxPost = function(url, data, cb){
  const req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/json'); 

  req.onload = function() {
    if(req.status === 200)
      cb(req.responseText);
    else
      cb(null, new Error('Request failed: ' + req.statusText));
  };

  req.onerror = function(){
    cb(null, new Error('Network Error'));
  };

  req.send(JSON.stringify(data));
};

//TRY THIS OUT AT THE URL
