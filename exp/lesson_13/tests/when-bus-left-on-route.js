const assert = require('chai').assert;
const Bus = require('../src/bus');

suite('when bus left on the route', function(){
  test('bus is ready to receive passengers', function(){
    const bus = new Bus();
    
    bus.setState('ready');
    
    assert.equal(bus.state, 'ready');
  });
});

