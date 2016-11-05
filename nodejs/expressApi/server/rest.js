const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

let users = {};
let idx = 0;

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

app.get('/users', ({ body: params }, response) => {
  let { offset = 0, limit, fields } = params;
  fields = fields ? fields.split(',') : null;

  let items = Object.keys(users).map(key => {
    let item = {};

    if (fields)
      fields.forEach(field => item[field] = users[key][field]);
    else
      item = users[key];
    
    return item;
  });

  if (limit)
    items = items.slice(offset, limit);

  response.json(items);
});

app.delete('/users', ({ body: params }, response) => {
  users = {};
  response.json(users);
});

app.post('/users', ({ body: params }, response) => {
  if (!params.name || !params.score)
  {
    response
      .status(400)
      .json({
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

  response.json(users[idx]);
});

app.get('/users/:id', ({ params }, response) => {
  const item = users[params.id];

  if (item)
    response.json(item);
  else
    response
      .status(400)
      .json({
        error: 'USER_NOT_FOUND',
        message: `User with id=${params.id} not found`
      });
});

app.put('/users/:id', ({ params, body }, response) => {
  const item = users[params.id];

  if (item)
  {
    item.score = parseInt(body.score);
    item.name = body.name;

    response.json(item);
  }
  else
    response
      .status(400)
      .json({
        error: 'USER_NOT_FOUND',
        message: `User with id=${params.id} not found`
      });
});

app.delete('/users/:id', ({ params }, response) => {
  const item = users[params.id];

  if (item)
  {

    delete users[params.id];

    response.json(item);
  }
  else
    response
      .status(400)
      .json({
        error: 'USER_NOT_FOUND',
        message: `User with id=${params.id} not found`
      });
});