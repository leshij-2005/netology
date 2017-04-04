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
  
  _setState(state) {
    this._state = state;
  }
  
  left() {
    this._setState('empty');
  }
  
  receive(passengers) {
    this._passengers.push(...passengers);
    
    this._setState('not_full');
  }
}

module.exports = Bus;