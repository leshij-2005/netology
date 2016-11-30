const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const mongodb = require('mongodb');
 
const URL = 'mongodb://localhost:27017/netology';
let collection;

mongodb.MongoClient.connect(URL, (error, db) => {
  if (error)
  {
    console.error('Невозможно подключиться к БД. Ошибка:', error);
  }
  else
  {
    collection = db.collection('phones');
  }
});

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
app.use(express.static(__dirname));

app.listen(PORT).on('listening', () => {
  console.log(`Start HTTP on port ${PORT}`);
});

app.get('/hello/:name', ({ params }, response) => {
  response.send(`Hello, ${params.name}!`);
});

app.get('/list', ({ params }, response) => {
  collection.find().toArray((error, result) => {
    if (error)
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    else
      response.json(result);
  });
});

app.post('/create', ({ body }, response) => {
  if (!Object.keys(body).length)
  {
    return response.sendStatus(404);
  }

  collection.insert(body, (error, result) => {
    if (error)
      console.error('Неудалось внести данные в коллекцию. Ошибка:', error);
    else
      response.json(result.ops);
  });
});

app.post('/remove', ({ body }, response) => {
  if (!Object.keys(body).length)
  {
    return response.sendStatus(404);
  }

  collection.findAndRemove({ _id: new mongodb.ObjectID(body.id) }, (error, result) => {
    if (error)
      console.error('Неудалось удалить данные из коллекции. Ошибка:', error);
    else
      response.json(result);
  });
});

app.get('/get/:id', ({ params }, response) => {
  collection.find({ _id: new mongodb.ObjectID(params.id) }).toArray((error, result) => {
    if (error)
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    else
      response.json(result[0]);
  });
});

app.post('/update', ({ body }, response) => {
  if (!Object.keys(body).length)
  {
    return response.sendStatus(404);
  }

  const id = new mongodb.ObjectID(body.id);
  delete body.id;

  collection.update({ _id: id }, body, (error, result) => {
    if (error)
      console.error('Неудалось обновить данные в коллекции. Ошибка:', error);
    else
    {
      collection.findOne({ _id: id }, (error, result) => {
        response.json(result);
      });
    }
  });
});

app.post('/search', ({ body }, response) => {
  const regex = new RegExp(body.phone, 'g');

  collection.find({ phone: { $regex: regex } }).toArray((error, result) => {
    if (error)
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    else
      response.json(result);
  });
});