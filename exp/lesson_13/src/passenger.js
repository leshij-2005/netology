class Passenger {
  constructor(money = 0) {
    this._money = money;
  }
  
  get money() {
    return this._money;
  }
}

module.exports = Passenger;