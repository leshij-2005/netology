const assert = require('chai').assert;

suite('when bus left on the route', function(){
  test('bus is ready to receive passengers', function(){
    const bus = new Bus();
    
    bus.setState('ready');
    
    assert.equal(bus.state, 'ready');
  });
  
  class Bus {
    constructor() {
      this._state = 'undefined';
    }
    
    get state() {
      return this._state;
    }
    
    setState(state) {
      this._state = state;
    }
  }
});

