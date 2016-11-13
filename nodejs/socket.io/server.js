const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

app.use(express.static(__dirname));

io.on('connection', socket => {

  let addedUser = false;

  socket.on('new message', data => {
    console.log('message', data);

    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('add user', username => {
    if (addedUser) return;

    socket.username = username;
    addedUser = true;

    console.log('login', username);

    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    if (addedUser)
    {
      socket.broadcast.emit('user left', {
        username: socket.username
      });
    }
  });
});