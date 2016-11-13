const http = require('http');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

const store = {};
let idx = 0;

const routes = {
  post: {
    '/regist': (params, response) => {
      let count = parseInt(params.count);

      idx += 1;

      store[idx] = {
        id: idx,
        count: count,
        name: params.name
      }

      response.write(JSON.stringify(store[idx]));
    },
    '/add': (params, response) => {
      let count = parseInt(params.count);

      const item = store[params.id];

      item.count += count;

      response.write(JSON.stringify(item));
    },
    '/remove': (params, response) => {
      let count = parseInt(params.count);

      const item = store[params.id];

      item.count -= count;

      if(item.count <= 0)
        delete store[params.id];

      response.write(JSON.stringify(item));
    }
  },
  get: {
    '/list': (params, response) => {
      const list = Object.keys(store).map(key => store[key]);

      response.write(JSON.stringify(list));
    }
  }
}

const server = http.createServer((request, response) => {
  const { method, url } = request;
  let body = [];

  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = querystring.parse(Buffer.concat(body).toString());

    const func = routes[method.toLowerCase()][url];

    if (func)
    {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      func(body, response);

      response.end();
    }
    else
      response.writeHead(404, 'Not Found');
  });
});

server.listen(PORT).on('listening', () => {
  console.log(`Start HTTP on port ${PORT}`);
});