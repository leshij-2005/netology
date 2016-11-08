const http = require('http');
const querystring = require('querystring');

const request = (path, data, key = '') => {
  data = data ? querystring.stringify(data) : '';

  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data),
      'Key': key
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

request('/post', {
  name: 'Alex'
});

request('/post', {}, '123');