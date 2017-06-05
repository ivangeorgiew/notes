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

const ajaxGet = function(url) {
  return new Promise(function(success, fail) {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function() {
      if(req.status < 400)
        success(req.responseText);
      else
        fail(new Error('Request failed: ' + req.statusText));
    };
    req.onerror = function() {
      fail(new Error('Network error'));
    }
    req.send(null);
  });
};


const ajaxPost = function(url, data, reqHeader = 'application/json') {
  return new Promise(function(success, fail) {
    const req = new XMLHttpRequest();
    req.open('POST', url, true);
    
    //next line depends
    req.setRequestHeader('Content-Type', reqHeader);
    req.onload = function() {
      if(req.status < 400)
        success(req.responseText);
      else
        fail(new Error('Request failed: ' + req.statusText));
    };
    req.onerror = function() {
      fail(new Error('Network error'));
    }
    req.send(JSON.stringify(data));
  });
};

ajaxGet(url).then(function(text) {
  console.log('data: ' + text);
}, function(error) {
  console.log('Failed to fetch data: ' + error);
});

ajaxPost(url, friends).then(function(text) {
  console.log('data: ' + text);
}, function(error) {
  console.log('Failed to fetch data: ' + error);
});

//TRY THIS OUT AT THE URL
