const assert = require('chai').assert;
const Bus = require('../src/bus');
const Passenger = require('../src/passenger');

suite('when bus left on the route', function(){
  let bus = {};
  
  test('when bus receive two passenger then bus is full', function() {
    const bus = new BusBuilder()
      .receive(new Passenger(20))
      .receive(new Passenger(20))
      .go();
    
    assert.equal(bus.state, 'full');
  });
  
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
});

