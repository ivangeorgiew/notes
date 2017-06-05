const ajaxGet = function(url, reqHeader = 'text/html') {
  return new Promise(function(success, fail) {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Accept', reqHeader);
    req.onload = function() {
      if(req.status < 400)
        success(req.responseText);
      else
        fail(new Error(req.statusText));
    };
    req.onerror = function() { fail(new Error('Network error')) };
    req.send(null);
  });
};
