const assert = require('chai').assert;
const BusBuilder = require('./dsl/bus-builder');
const PassengerBuilder = require('./dsl/passenger-builder');

suite('when bus left on the route', function(){
  let bus = {};
  
  test('when bus receive two passenger then bus is full', function() {
    const bus = new BusBuilder()
      .receive(new PassengerBuilder().withMoney(20).create())
      .receive(new PassengerBuilder().withMoney(20).create())
      .go();
    
    assert.equal(bus.state, 'full');
  });
  
  test('when bus receive passenger and passenger have`t money then bus not receive passenger', function() {
    const bus = new BusBuilder()
      .receive(new PassengerBuilder().withNoMoney().create())
      .go();
    
    assert.equal(bus.passengers.length, 0);
  });
});

