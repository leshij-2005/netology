const ChatApp = require('./module/chat');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let waitAfterOnMessage = message => console.log('Готовлюсь к ответу!');

let vkChatOnClose = () => console.log('Чат вконтакте закрылся :(');

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000 );


webinarChat.on('message', waitAfterOnMessage);

vkChat.setMaxListeners(2);

vkChat.on('message', waitAfterOnMessage);

vkChat.on('close', vkChatOnClose);

vkChat.close();

setTimeout(() => {
  webinarChat.removeListener('message', chatOnMessage);
}, 30000);