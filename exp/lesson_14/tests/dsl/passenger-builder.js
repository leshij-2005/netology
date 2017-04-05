const Passenger = require('../../src/passenger');

class PassengerBuilder {
  constructor() {
    this._money = 0;
    this._type = 'default';
  }
  
  withMoney(money) {
    this._money = money;
    
    return this;
  }
  
  withNoMoney() {
    this._money = 0;
    
    return this;
  }
  
  withTypePensioner() {
    this._type = 'pensioner';
    
    return this;
  }
  
  create() {
    return new Passenger(this._money, this._type);
  }
}

module.exports = PassengerBuilder;