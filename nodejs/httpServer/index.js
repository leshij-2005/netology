const http = require('http');
const querystring = require('querystring');

const data = querystring.stringify({
  name: 'book',
  count: 1
});

const options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/regist',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(data)
  }
};

const request = http.request(options);

request.write(data);

request.end();