const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const schema = new Schema({
  title: String,
  description: String,
  user_id: 'ObjectId',
  active: { type: Boolean, default: true }
});

schema.statics.findById = function(id, cb) {
  return this.aggregate([{
    $match: { _id: new ObjectId(id) }
  }, { 
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: '_id',
      as: 'user'
    }
  }]).exec((error, result) => {
    if (error) {
      console.error('Неудалось установить данные из коллекции. Ошибка:', error);
    }
    else {
      const item = result[0];

      item.user = item.user[0].name;

      cb(item);
    }
  });
}

const Task = mongoose.model('Task', schema);

app.get('/', (request, response) => {
  Task.aggregate([{
    $match: { active: true }
  }, { 
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: '_id',
      as: 'user'
    }
  }])
  .exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      result.map(item =>{
        item.user = item.user[0].name;

        return item;
      });

      response.json(result);
    }
  });
});

app.get('/:id', ({ params }, response) => {
  Task.findById(params.id, (result) => {
    response.json(result);
  });
});

app.post('/', ({ body }, response) => {
  Task.create(body, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные из коллекции. Ошибка:', error);
    }
    else {
      Task.findById(result._id, (result) => {
        response.json([result]);
      });
    }
  });
});

app.put('/', ({ body }, response) => {
  Task.update({ _id: body.id }, { $set: body }, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные из коллекции. Ошибка:', error);
    }
    else {
      Task.findById(body.id, (result) => {
        response.json(result);
      });
    }
  });
});

app.delete('/:id', ({ params }, response) => {
  Task.remove({ _id: params.id }, (error, result) => {
    if (error) {
      console.error('Неудалось удалить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.post('/search', ({ body }, response) => {
  const regex = new RegExp(body.title, 'g');

  Task.aggregate([{
    $match: {
      title: {$regex: regex }, 
      active: true 
    }
  }, { 
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: '_id',
      as: 'user'
    }
  }])
  .exec((error, result) => {
    if (error) {
      console.error('Неудалось установить данные из коллекции. Ошибка:', error);
    }
    else {
      result.map(item =>{
        item.user = item.user[0].name;

        return item;
      });

      response.json(result);
    }
  });
});

module.exports = app;