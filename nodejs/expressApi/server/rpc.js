const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

const users = {};
let idx = 0;

const user = {
  list: (params, callback) => {
    const list = Object.keys(users).map(key => users[key]);

    callback(list);
  },
  create: (params, callback) => {
    if (!params.name || !params.score)
    {
      callback(null, {
        error: 'WRONG_PARAMS',
        message: 'Wrong parameters in the query'
      });

      return false;
    }

    let score = parseInt(params.score);

    idx += 1;

    users[idx] = {
      id: idx,
      name: params.name,
      score
    };

    callback(users[idx]);
  },
  get: (params, callback) => {
    const item = users[params.id];

    if (item)
      callback(item);
    else
      callback(null, {
        error: 'USER_NOT_FOUND',
        message: `User with id=${params.id} not found`
      });
  },
  update: (params, callback) => {
    const item = users[params.id];

    item.score = parseInt(params.score);
    item.name = params.name;

    callback(item);
  },
  delete: (params, callback) => {
    const item = users[params.id];

    if (item)
    {
      delete users[params.id];

      callback(item);
    }
    else
      callback(null, {
        error: 'USER_NOT_FOUND',
        message: `User with id=${params.id} not found`
      });
  }
};

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(function errorHandler(err, req, res, next) {
  res
    .status(500)
    .render('error', { 
      error: err
    });
});

app.listen(PORT).on('listening', () => {
  console.log(`Start HTTP on port ${PORT}`);
});

app.post('/rpc', ({ body }, response) => {
  const method = user[body.method];
  
  method(body.params, (result, error) => {
    if (error)
    {
      response
        .status(400)
        .json(error);
    }
    else
      response.json({
        jsonrpc: 2.0,
        result
      });
  });
});