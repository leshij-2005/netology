"use strict";

const Rental = require('./rental');

class Customer {
  constructor(data) {
    this._data = data;
  }
  
  get name() {
    return this._data.name;
  }
  
  get rentals() {
    return this._data.rentals.map(rental => new Rental(rental));
  }
}

module.exports = Customer;