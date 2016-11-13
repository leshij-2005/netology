(function(){
  var socket = io();
  var username = '';

  function addUser(name){
    var $user = $('<div/>', {
      class: 'users__item',
      text: name
    });

    $user.data('name', name);

    $('.users').append($user);
  }

  function addMessage(data){
    var $item = $('<div/>', {
      class: 'chat-history__item'
    });

    var $user = $('<div/>', {
      class: 'chat-history__item-user',
      text: data.username + ':'
    });

    var $text = $('<div/>', {
      class: 'chat-history__item-text',
      text: data.message
    });

    $item.append($user);
    $item.append($text);

    $('.chat-history').append($item);
  }

  $('#name').keyup(function(event){
    var name = $(this).val();

    if (name && event.which === 13)
    {
      socket.emit('add user', name);
      $(this).val('');
    }
  });

  $('#message').keyup(function(event){
    var message = $(this).val();

    if (message && event.which === 13)
    {
      socket.emit('new message', message);
      $(this).val('');

      addMessage({
        username: username,
        message: message
      });
    }
  });

  socket.on('login', function (data) {
    $('.enter').hide();

    username = data.username;

    addUser(data.username);
  });

  socket.on('new message', function (data) {
    addMessage(data);
  });

  socket.on('user joined', function (data) {
    addUser(data.username);
  });

  socket.on('user left', function (data) {
    $('.user__item[data-name="' + data.username + '"]').remove();
  });
})();