/* Generators functions are used for async programming.
 * Alternative are Web Workers, which are mechanism where you create
 * a whole separate thread of events(JS is a single-threaded language).
 * The reason Web Workers don't complicate our programs is that the two
 * threads(the JS main one and the Web Worker one) can only communicate with
 * each other through async events */

/* In normal javascript it is a mistake to write infinite loops,
 * but with generator functions its a normal thing to do */




/*Example Ajax get request with Promise and generator functions */
const url = 'http://rest.learncode.academy/api/gag/friends';

function ajaxGet(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = () => {
      if(req.status === 200)
        resolve(req.responseText);
      else
        reject(new Error(req.statusText));
    };
    req.onerror = () => reject('Network Error');
    req.send(null);
    /* Uncomment to see that the error gets caught first */
    //throw new Error('ERROOOOOOOR');
  });
}

function request(url) {
  ajaxGet(url).then(text => {
    it.next(text);
  }).catch(err => {
    console.log(err.message);
  });
}

function *main(url) {
  const result1 = yield request(url);
  const data = JSON.parse(result1);

  data.forEach(val => console.log(val));
}

const it = main(url);
it.next();
