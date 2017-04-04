const assert = require('chai').assert;
const Bus = require('../src/bus');

suite('when bus left on the route', function(){
  let bus = {};
  
  setup(function() {
    bus = new Bus();
  
    bus.setState('ready');
  });
  
  test('bus is ready to receive passengers', function(){
    assert.equal(bus.state, 'ready');
  });
  
  test('bus receive one passenger', function() {
    bus.receive([new Passenger()]);
    
    assert.equal(bus.passengers.length, 1);
  });
  
  class Passenger {
    
  }
});

