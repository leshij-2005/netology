const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

const store = {};
let idx = 0;

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.listen(PORT).on('listening', () => {
  console.log(`Start HTTP on port ${PORT}`);
});

app.post('/regist', ({ body: params }, response) => {
  let count = parseInt(params.count);

  idx += 1;

  store[idx] = {
    id: idx,
    count: count,
    name: params.name
  }

  response.json(store[idx]);
});

app.post('/add', ({ body: params }, response) => {
  let count = parseInt(params.count);

  const item = store[params.id];

  item.count += count;

  response.json(item);
});

app.post('/remove', ({ body: params }, response) => {
  let count = parseInt(params.count);

  const item = store[params.id];

  item.count -= count;

  if(item.count <= 0)
    delete store[params.id];

  response.json(item);
});

app.get('/list', ({ body: params }, response) => {
  const list = Object.keys(store).map(key => store[key]);

  response.json(list);
});