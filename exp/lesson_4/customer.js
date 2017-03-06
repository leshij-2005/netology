"use strict";

class Customer {
  constructor(data) {
    this._data = data;
  }
  
  get name() {
    return this._data.name;
  }
  
  get rentals() {
    return this._data.rentals;
  }
}

module.exports = Customer;