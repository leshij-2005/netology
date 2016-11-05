const http = require('http');
const querystring = require('querystring');

const request = (path, data = {}, method = 'POST') => {
  data = JSON.stringify(data);

  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
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
// post user create
//

request('/rpc', {
  jsonrpc: 2.0, 
  method: 'create', 
  params: {
    name: 'Alex',
    score: 1
  }
});

request('/rpc', {
  jsonrpc: 2.0, 
  method: 'create', 
  params: {
    name: 'Alex'
  }
});

//
// get user
//

request('/rpc', {
  jsonrpc: 2.0, 
  method: 'get', 
  params: {
    id: 1
  }
});

//
// update user
//

request('/rpc', {
  jsonrpc: 2.0, 
  method: 'update', 
  params: {
    id: 1,
    name: 'Aleks',
    score: 2
  }
});

//
// delete user
//

request('/rpc', {
  jsonrpc: 2.0, 
  method: 'delete', 
  params: {
    id: 1
  }
});
request('/rpc', {
  jsonrpc: 2.0, 
  method: 'delete', 
  params: {
    id: 1
  }
});

//
// get users
//

request('/rpc', {
  jsonrpc: 2.0, 
  method: 'list'
});