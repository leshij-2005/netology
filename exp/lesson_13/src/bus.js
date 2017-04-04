class Bus {
  constructor() {
    this._state = 'undefined';
  }
  
  get state() {
    return this._state;
  }
  
  setState(state) {
    this._state = state;
  }
}

module.exports = Bus;