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
// post users
//

request('/users', {
  name: 'Alex',
  score: 1
});

request('/users', {
  name: 'Jhon',
  score: 2
});

request('/users', {
  name: 'Ben',
  score: 3
});

request('/users', {
  name: 'Alex'
});

//
// get users/:id
//

request('/users/1', {}, 'GET');

//
// put users/:id
//

request('/users/1', {
  name: 'Aleks',
  score: 2
}, 'PUT');

//
// delete users/:id
//

request('/users/1', {}, 'DELETE');
request('/users/1', {}, 'DELETE');

//
// get users
//

request('/users', {
  limit: 1,
  fields: 'name'
}, 'GET');