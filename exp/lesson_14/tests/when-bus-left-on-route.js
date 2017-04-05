const assert = require('chai').assert;
const BusBuilder = require('./dsl/bus-builder');
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
});

