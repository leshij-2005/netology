const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/netology';

mongoose.connect(URL);

mongoose.connection.on('error', (error) => {
  console.error('DB connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('DB connection opened');
});

module.exports = mongoose;