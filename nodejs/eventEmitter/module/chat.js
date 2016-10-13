const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  }

  close() {
    this.emit('close');
    this.removeAllListeners('close');
    this.removeAllListeners('message');
  }
}

module.exports = ChatApp;