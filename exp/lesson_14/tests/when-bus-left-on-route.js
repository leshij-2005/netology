const assert = require('chai').assert;
const Bus = require('../src/bus');
const Passenger = require('../src/passenger');

suite('when bus left on the route', function(){
  let bus = {};
  
  setup(function() {
    bus = new Bus();
  
    bus.left();
  });
  
  test('when bus receive two passenger then bus is full', function() {
    bus.receive([new Passenger(20), new Passenger(20)]);
    
    assert.equal(bus.state, 'full');
  });
});

