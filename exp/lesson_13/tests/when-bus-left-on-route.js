const assert = require('chai').assert;
const Bus = require('../src/bus');
const Passenger = require('../src/passenger');

suite('when bus left on the route', function(){
  let bus = {};
  
  setup(function() {
    bus = new Bus();
  
    bus.left();
  });
  
  test('bus is empty', function(){
    assert.equal(bus.state, 'empty');
  });
  
  test('when bus receive one passenger then bus not empty', function() {
    bus.receive([new Passenger()]);
    
    assert.equal(bus.state, 'not_full');
  });
  
  test('when bus receive two passenger then bus is full', function() {
    bus.receive([new Passenger(), new Passenger()]);
    
    assert.equal(bus.state, 'full');
  });
});

