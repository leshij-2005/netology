const Bus = require('../../src/bus');

class BusBuilder {
  constructor() {
    this._passengers = [];
  }
  
  receive(passenger) {
    this._passengers.push(passenger);
    
    return this;
  }
  
  go() {
    const bus = new Bus();
    
    bus.left();
    
    bus.receive(this._passengers);
    
    return bus;
  }
}

module.exports = BusBuilder;