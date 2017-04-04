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
    bus.receive([new Passenger(20)]);
    
    assert.equal(bus.state, 'not_full');
  });
  
  test('when bus receive two passenger then bus is full', function() {
    bus.receive([new Passenger(20), new Passenger(20)]);
    
    assert.equal(bus.state, 'full');
  });
  
  test('when bus receive passenger and passenger have`t money then bus not receive passenger', function() {
    bus.receive([new Passenger()]);
    
    assert.equal(bus.passengers.length, 0);
  });
  
  test('when bus receive passenger is pensioner then tax equal = 15', function(){
    const passenger = new Passenger(20, 'pensioner');
    
    bus.receive([passenger]);
  
    assert.equal(passenger.money, 20 - 15);
  });
});

