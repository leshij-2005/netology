class Bus {
  constructor() {
    this._state = 'undefined';
    this._maxCount = 2;
    this._tax = 20;
    this._taxForPensioner = 15;
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
    const availablePassengers = passengers.filter(item => item.money >= this._tax);
  
    availablePassengers.forEach(passenger => {
      let amount = passenger.type === 'pensioner' ? this._taxForPensioner : this._tax;
      
      passenger.pay(amount);
    });
    
    this._passengers.push(...availablePassengers);
    
    if (this._passengers.length < this._maxCount) {
      this._setState('not_full');
    } else {
      this._setState('full');
    }
  }
}

module.exports = Bus;