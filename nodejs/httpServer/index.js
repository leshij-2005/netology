const http = require('http');
const querystring = require('querystring');

const request = (path, data = {}, method = 'POST') => {
  data = querystring.stringify(data);

  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path,
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = http.request(options);

  req.write(data);

  req.on('response', response => {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      console.log(data);
    });
  });

  req.end();
};

//
// regist
//

request('/regist', {
  name: 'book',
  count: 1
});

//
// add
//

request('/add', {
  id: 1,
  count: 1
});

//
// remove
//

request('/remove', {
  id: 1,
  count: 1
});

//
// list
//

request('/list', {}, 'GET');