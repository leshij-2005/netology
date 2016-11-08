const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

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

app.get('/', (request, response) => {
  response.send('Hello Express.js');
});

app.get('/hello', (request, response) => {
  response.send('Hello stranger!');
});

app.get('/hello/:name', ({ params }, response) => {
  response.send(`Hello, ${params.name}!`);
});

app.all('/sub/*$/', ({ protocol, hostname, url }, response) => {
  response.send(`You requested URI: ${protocol + '://' + hostname + url}`);
});

app.use('/post', ({ headers }, response, next) => {
  if (!headers.key)
    response.sendStatus(401);
  else
    next();
});

app.post('/post', ({ body }, response) => {
  if (Object.keys(body).length != 0)
    response.json(body);
  else
    response.sendStatus(404);
});