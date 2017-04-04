class Bus {
  constructor() {
    this._state = 'undefined';
    this._passengers = [];
  }
  
  get state() {
    return this._state;
  }
  
  get passengers() {
    return this._passengers;
  }
  
  setState(state) {
    this._state = state;
  }
  
  receive(passengers) {
    this._passengers.push(...passengers);
  }
}

module.exports = Bus;