const express = require('express');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const schema = new Schema({
  name: String,
  email: String
});

schema.statics.findById = function(id, cb) {
  return this.find({ _id: id }).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      cb(result[0]);
    }
  });
}

const User = mongoose.model('User', schema);

app.get('/', (request, response) => {
  User.find().exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.get('/stats', (request, response) => {
  User.aggregate([
    { 
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'user_id',
        as: 'tasks'
      }
    },
    {
      $unwind: '$tasks'
    },
    {
      $match: { 'tasks.active': false }
    },
    {
      $group: { _id: '$name', count: { $sum: 1 } }
    }
  ]).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.get('/:id', ({ params }, response) => {
  User.findById(params.id, (result) => {
    response.json(result);
  });
});

app.post('/', ({ body }, response) => {
  User.create(body, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json([result]);
    }
  });
});

app.put('/', ({ body }, response) => {
  User.update({ _id: body.id }, { $set: body }, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные из коллекции. Ошибка:', error);
    }
    else {
      User.findById(body.id, (result) => {
        response.json(result);
      });
    }
  });
});

app.delete('/:id', ({ params }, response) => {
  User.remove({ _id: params.id }, (error, result) => {
    if (error) {
      console.error('Неудалось удалить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.post('/search', ({ body }, response) => {
  const regex = new RegExp(body.name, 'g');

  User.find({ name: { $regex: regex } }).exec((error, result) => {
    if (error)
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    else
      response.json(result);
  });
});

module.exports = app;