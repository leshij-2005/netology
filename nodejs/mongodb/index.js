const { MongoClient } = require('mongodb');
 
const URL = 'mongodb://localhost:27017/netology';

MongoClient.connect(URL, (error, db) => {
  if (error)
    console.error('Невозможно подключиться к БД. Ошибка:', error);
  else
  {
    const collection = db.collection('lessons');

    const lessons = [
      {name: 'Изучаем основы серверного программирования на JavaScript', lecturer: 'Дмитрий Фитискин'},
      {name: 'События EventEmmiter', lecturer: 'Daeren Torn'},
      {name: 'Создаем клиенты и сервера используя модуль', lecturer: 'Марк Томило'}
    ];

    collection.insert(lessons, (error, result) => {
      if (error)
        console.error('Неудалось внести данные в коллекцию. Ошибка:', error);
      else
      {
        console.log(result);

        collection.remove();

        db.close();
      }
    });
  }
});