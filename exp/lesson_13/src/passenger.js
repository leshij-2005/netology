class Passenger {
  constructor(money = 0, type = 'default') {
    this._money = money;
    this._type = type;
  }
  
  get money() {
    return this._money;
  }
  
  get type() {
    return this._type;
  }
  
  pay(amount) {
    this._money -= amount;
  }
}

module.exports = Passenger;