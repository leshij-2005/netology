class Bus {
  constructor() {
    this._state = 'undefined';
    this._maxCount = 2;
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
    
    if (this._passengers.length < this._maxCount) {
      this._setState('not_full');
    } else {
      this._setState('full');
    }
  }
}

module.exports = Bus;